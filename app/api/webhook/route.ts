import { StripeMetadata } from "@/app/(main)/cart/page";
import { stripe } from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backend-client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
	try {
		const body = await req.text();

		if (!body) {
			return NextResponse.json(
				{ error: "Missing request body" },
				{ status: 400 },
			);
		}

		const headersList = await headers();
		const sig = headersList.get("stripe-signature");

		if (!sig) {
			return NextResponse.json(
				{ error: "Missing stripe-signature" },
				{ status: 400 },
			);
		}

		const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
		if (!webhookSecret) {
			return NextResponse.json(
				{ error: "Missing webhook secret" },
				{ status: 400 },
			);
		}

		const event: Stripe.Event = stripe.webhooks.constructEvent(
			body,
			sig,
			webhookSecret,
		);

		if (!event) {
			return NextResponse.json(
				{ error: "Failed to construct event" },
				{ status: 400 },
			);
		}

		if (event.type === "checkout.session.completed") {
			const session = event.data.object;
			const invoice = session.invoice
				? await stripe.invoices.retrieve(session.invoice as string)
				: null;

			await createOrderToSanity(session, invoice);
		}

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: (error as Error).message ?? "Unknown error" },
			{ status: 400 },
		);
	}
}

async function createOrderToSanity(
	session: Stripe.Checkout.Session,
	invoice: Stripe.Invoice | null,
) {
	try {
		const { orderNumber, clerkUserId, customerEmail, customerName } =
			session.metadata as StripeMetadata;

		const listItemProducts = await stripe.checkout.sessions.listLineItems(
			session.id,
			{
				expand: ["data.price.product"],
			},
		);

		const products = listItemProducts.data.map(item => ({
			_key: crypto.randomUUID(),
			quantity: item.quantity,
			product: {
				_type: "reference",
				_ref: (item.price?.product as Stripe.Product)?.metadata?.id,
			},
		}));

		const order = await backendClient.create({
			_type: "order",
			orderNumber: orderNumber,
			invoice: {
				id: invoice?.id,
				number: invoice?.number ?? 0,
				hosted_invoice_url: invoice?.hosted_invoice_url,
			},
			stripeCheckoutSessionId: session.id,
			stripePaymentIntentId: session.payment_intent,
			stripeCustomerId: session.customer,
			stripeCustomerName: customerName,
			stripeCustomerEmail: customerEmail,
			clerkUserId,
			products,
			totalPrice:
				(session.presentment_details?.presentment_amount ??
					session.amount_subtotal ??
					0) / 100,
			currency:
				session.presentment_details?.presentment_currency ?? session.currency,
			discountedPrice: session.total_details?.amount_discount
				? session.total_details?.amount_discount / 100
				: 0,
			orderDate: new Date().toISOString(),
			orderStatus: "pending",
		});

		console.log({ order });
	} catch (error) {
		console.error("Error creating order in Sanity:", error);
		throw new Error("Failed to create order in Sanity");
	}
}
