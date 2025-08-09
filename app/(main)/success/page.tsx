import { getSession } from "@/actions/session-retrieve";
import { notFound } from "next/navigation";
import SuccessPage from "./success-page";

export default async function page({
	searchParams,
}: {
	searchParams: Promise<{ session_id: string; order_number: string }>;
}) {
	console.log("Search Params:", searchParams);
	const sessionId = (await searchParams).session_id;

	if (!sessionId) {
		notFound();
	}

	const session = await getSession(sessionId); // Server Action called on the server

	if (!session) {
		notFound();
	}

	// Assuming the order number is stored in session metadata
	const orderNumber = (await searchParams).order_number;

	// Pass the server-validated data to a client component
	return <SuccessPage orderNumber={orderNumber} />;
}
