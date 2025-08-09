import { Button } from "@/components/ui/button";
import { Order } from "@/sanity.types";
import { Download } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SingleOrder({ order }: { order: Order }) {
	const {
		_id,
		orderNumber,
		orderDate,
		stripeCustomerName,
		stripeCustomerEmail,
		totalPrice,
		orderStatus,
		invoice,
	} = order;
	return (
		<tr
			key={_id}
			className='border-t cursor-pointer h-12 text-sm lg:h-14  text-center hover:bg-foreground/10 font-medium text-muted-foreground px-4'
		>
			<td>{orderNumber}</td>
			<td>{orderDate}</td>
			<td>{stripeCustomerName}</td>
			<td>{stripeCustomerEmail}</td>
			<td>{totalPrice}</td>
			<td>
				<p className='  flex capitalize items-center justify-center w-fit mx-auto py-1 px-3 text-xs font-semibold rounded-full bg-yellow-600/20 text-yellow-600'>
					{orderStatus}
				</p>
			</td>
			<td>
				<Link href={`${invoice?.hosted_invoice_url}`} className=''>
					<Button
						size={"sm"}
						className='bg-blue-700 text-white hover:bg-blue-600 '
					>
						{" "}
						<Download size={14} /> Invoice
					</Button>
				</Link>
			</td>
		</tr>
	);
}
