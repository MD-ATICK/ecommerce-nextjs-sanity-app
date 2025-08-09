"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/zustand/use-cart-store";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage({ orderNumber }: { orderNumber: string }) {
	const { resetCart } = useCartStore();

	useEffect(() => {
		resetCart(); // Reset the cart only once when the component mounts
	}, [resetCart]);

	return (
		<div className=' text-center p-4 py-20 space-y-2'>
			<p className=' text-7xl'>🎉</p>
			<br />
			<h3 className=' text-lg font-semibold'>Thank you for your purchase!</h3>
			<p className=' text-sm text-muted-foreground'>
				Your order number is:{" "}
				<span className='  bg-primary/20 px-1 text-primary rounded-sm'>
					{" "}
					{orderNumber}
				</span>
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
