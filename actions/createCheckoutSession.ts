"use server";
import { StripeMetadata } from "@/app/(main)/cart/page";
import { stripe } from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";
import { CardItem } from "@/zustand/use-cart-store";
import Stripe from "stripe";

type props = {
	metadata: StripeMetadata;
	items: CardItem[];
};

export const createCheckoutSession = async ({ metadata, items }: props) => {
	try {
		const customer = await stripe.customers.list({
			email: metadata.customerEmail,
			limit: 1,
		});
		const customerId = customer.data[0]?.id;

		const sessionPayload: Stripe.Checkout.SessionCreateParams = {
			metadata,
			mode: "payment",
			payment_method_types: ["card"],
			invoice_creation: {
				enabled: true,
			},
			allow_promotion_codes: true,
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&order_number=${metadata.orderNumber}`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
			line_items: items.map(item => ({
				quantity: item.quantity,
				price_data: {
					currency: "USD",
					unit_amount: item.product.price! * 100,
					product_data: {
						name: item.product.name!,
						description: item.product.description,
						images:
							item.product.images && item.product.images?.length > 0
								? [urlFor(item.product.images[0]).url()]
								: undefined,
						metadata: {
							id: item.product._id,
						},
					},
				},
			})),
		};

		if (customerId) {
			sessionPayload.customer = customerId;
		} else {
			sessionPayload.customer_email = metadata.customerEmail;
		}

		const session = await stripe.checkout.sessions.create(sessionPayload);

		return session.url;
	} catch (error) {
		console.log("Error creating checkout session:", error);
		throw error;
	}
};
