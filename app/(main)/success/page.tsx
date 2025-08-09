"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
	// const router = useRouter();
	// const searchParams = useSearchParams();
	// const orderNumber = searchParams.get("order_number");
	// const sessionId = searchParams.get("session_id");
	// const { resetCart } = useCartStore();

	// if (!orderNumber || !sessionId) {
	// 	router.push("/cart");
	// 	return;
	// }

	// const isValidSession = getSession(sessionId);
	// if (!isValidSession) {
	// 	router.push("/cart");
	// 	return;
	// }

	// resetCart();

	return (
		<div className=' text-center p-4 py-20 space-y-2'>
			<p className=' text-7xl'>🎉</p>
			<br />
			<h3 className=' text-lg font-semibold'>Thank you for your purchase!</h3>
			<p className=' text-sm text-muted-foreground'>
				Your order number is: {"orderNumber"}
			</p>
			<br />
			<Link href={"/"} className=' mr-4'>
				<Button size={"sm"}>Go to Home</Button>
			</Link>
			<Link href={"/orders"}>
				<Button
					size={"sm"}
					className=' bg-green-700 hover:bg-green-600 text-white'
				>
					Go to Orders Page
				</Button>
			</Link>
		</div>
	);
}
