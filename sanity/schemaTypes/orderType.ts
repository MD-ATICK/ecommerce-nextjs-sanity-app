import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
	name: "order",
	title: "Order",
	type: "document",
	icon: BasketIcon,
	fields: [
		defineField({
			name: "orderNumber",
			title: "Order Number",
			type: "string",
			validation: rule => rule.required(),
		}),
		defineField({
			name: "invoice",
			title: "Invoice",
			type: "object",
			fields: [
				{
					name: "id",
					type: "string",
					title: "Invoice ID",
				},
				{
					name: "number",
					type: "number",
					title: "Invoice Number",
				},
				{
					name: "hosted_invoice_url",
					title: "Hosted Invoice URL",
					type: "url",
				},
			],
		}),
		defineField({
			name: "stripeCheckoutSessionId",
			type: "string",
			title: "Stripe Checkout Session ID",
		}),
		defineField({
			name: "stripePaymentIntentId",
			type: "string",
			title: "Stripe Payment Intent ID",
		}),
		defineField({
			name: "stripeCustomerId",
			type: "string",
			title: "Stripe Customer ID",
		}),
		defineField({
			name: "stripeCustomerName",
			type: "string",
			title: "Stripe Customer Name",
		}),
		defineField({
			name: "stripeCustomerEmail",
			type: "string",
			title: "Stripe Customer Email",
		}),
		defineField({
			name: "clerkUserId",
			type: "string",
			title: "Clerk User ID",
		}),
		defineField({
			name: "products",
			title: "Products",
			type: "array",
			of: [
				defineArrayMember({
					name: "Member",
					type: "object",
					fields: [
						defineField({
							name: "quantity",
							type: "number",
							title: "Quantity",
							validation: rule => rule.required(),
						}),
						defineField({
							name: "product",
							type: "reference",
							title: "Product",
							to: [{ type: "product" }],
						}),
					],
					preview: {
						select: {
							productName: "product.name",
							quantity: "quantity",
							images: "product.images",
							price: "product.price",
							currency: "product.currency",
						},
						prepare(select) {
							return {
								title: `${select.productName}  `,
								subtitle: `$${select.price} * ${select.quantity} = $${select.price * select.quantity}`,
								media: select.images[0],
							};
						},
					},
				}),
			],
		}),
		defineField({
			name: "totalPrice",
			type: "number",
			title: "Total Price",
			validation: rule => rule.required().min(0),
		}),
		defineField({
			name: "discountedPrice",
			type: "number",
			title: "Discounted Price",
			validation: rule => rule.required().min(0),
		}),
		defineField({
			name: "currency",
			type: "string",
			title: "Currency",
			validation: rule => rule.required().min(3).max(3),
		}),
		defineField({
			name: "orderDate",
			title: "Order Date",
			type: "datetime",
			validation: rule => rule.required(),
		}),
		defineField({
			name: "orderStatus",
			title: "Order Status",
			type: "string",
			validation: rule => rule.required(),
			options: {
				list: [
					{ title: "Pending", value: "pending" },
					{ title: "Processing", value: "processing" },
					{ title: "Completed", value: "completed" },
					{ title: "Cancelled", value: "cancelled" },
				],
			},
		}),
	],
	preview: {
		select: {
			stripeCustomerName: "stripeCustomerName",
			stripePaymentIntentId: "stripePaymentIntentId",
			stripeCustomerEmail: "stripeCustomerEmail",
			totalPrice: "totalPrice",
			currency: "currency",
			stripeCustomerImage: "stripeCustomerImage",
		},
		prepare({
			stripeCustomerName,
			stripePaymentIntentId,
			stripeCustomerEmail,
			totalPrice,
			currency,
		}) {
			return {
				media: BasketIcon,
				title: `${stripeCustomerName} (${stripePaymentIntentId})`,
				subtitle: `${totalPrice} ${currency} - ${stripeCustomerEmail}`,
			};
		},
	},
});
