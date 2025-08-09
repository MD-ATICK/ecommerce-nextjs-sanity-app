"use client";
import { Order } from "@/sanity.types";
import { getOrders } from "@/sanity/helpers/queries";
import { useUser } from "@clerk/nextjs";
import { Swords } from "lucide-react";
import React, { useState, useTransition } from "react";
import SingleOrder from "./single-order";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/container";
import Banner from "@/components/banner";

export default function OrdersPage() {
	const { user } = useUser();
	const [orders, setOrders] = useState<Order[] | null>(null);
	const [isPending, startTransition] = useTransition();

	console.log(orders);

	React.useEffect(() => {
		if (user) {
			startTransition(async () => {
				const orders = await getOrders(user.id);
				console.log(orders);
				setOrders(orders);
			});
		}
	}, [user]);

	return (
		<div>
			<Banner longTitle='Orders Page' />
			<Container className=' p-1 md:p-4'>
				<div className=' border w-full rounded-md -translate-y-10 bg-white'>
					<h3 className=' px-6 py-3 w-full border-b flex items-center gap-3 font-semibold '>
						<p className=' h-8 flex items-center justify-center aspect-square rounded-sm bg-green-500/20 text-green-500'>
							<Swords size={18} />
						</p>
						Orders
					</h3>

					{/* Table */}
					<div className=' w-full overflow-auto'>
						<table className=' text-left w-full [th,td]:px-4 [th,td]:py-2'>
							{(isPending || !orders) && (
								<>
									<OrderLoading />
									<OrderLoading />
									<OrderLoading />
									<OrderLoading />
									<OrderLoading />
								</>
							)}
							{!isPending && !!orders && (
								<>
									<thead className=' text-left'>
										<tr className='border-t h-12 text-center  text-sm lg:h-14'>
											<th>Order Number</th>
											<th>Date</th>
											<th>Clerk Id</th>
											<th>Customer</th>
											<th>Customer Email</th>
											<th>Total Price</th>
											<th>Order Status</th>
											<th>Invoice Download</th>
										</tr>
									</thead>
									{orders.map(order => (
										<SingleOrder key={order._id} order={order} />
									))}
								</>
							)}
						</table>
					</div>
				</div>
			</Container>
		</div>
	);
}

const OrderLoading = () => {
	return (
		<tr className='border-t h-12 text-sm lg:h-14  text-center hover:bg-foreground/10 font-medium text-muted-foreground px-4'>
			<td>
				<Skeleton className=' rounded-sm h-6 w-40 m-auto' />
			</td>
			<td>
				<Skeleton className=' rounded-sm h-6 w-40 m-auto' />
			</td>
			<td>
				<Skeleton className=' rounded-sm h-6 w-40 m-auto' />
			</td>
			<td>
				<Skeleton className=' rounded-sm h-6 w-40 m-auto' />
			</td>
			<td>
				<Skeleton className=' rounded-sm h-6 w-40 m-auto' />
			</td>
			<td>
				<Skeleton className=' rounded-sm h-6 w-40 m-auto' />
			</td>
			<td>
				<Skeleton className=' rounded-sm h-6 w-40 m-auto' />
			</td>
			<td>
				<Skeleton className=' rounded-sm h-6 w-40 m-auto' />
			</td>
		</tr>
	);
};
