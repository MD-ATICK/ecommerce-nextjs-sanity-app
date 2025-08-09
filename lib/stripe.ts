import Stripe from "stripe";

const SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!SECRET_KEY) {
	throw new Error("Missing Stripe secret key");
}

export const stripe = new Stripe(SECRET_KEY, {
	apiVersion: "2025-07-30.basil",
});
