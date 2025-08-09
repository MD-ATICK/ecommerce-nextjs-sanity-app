"use server";

import { stripe } from "@/lib/stripe";

export async function getSession(sessionId: string) {
	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		if (session) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error(error);
		return false;
	}
}
