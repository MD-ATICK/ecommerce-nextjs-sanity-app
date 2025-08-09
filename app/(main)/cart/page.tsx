"use client";

import { createCheckoutSession } from "@/actions/createCheckoutSession";
import Container from "@/components/container";
import PriceView from "@/components/price-view";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import { useCartStore } from "@/zustand/use-cart-store";
import { useAuth, useUser } from "@clerk/nextjs";
import { Box, ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type StripeMetadata = {
	orderNumber: string;
	customerName: string;
	customerEmail: string;
	clerkUserId: string;
};

export default function CartPage() {
	const { isSignedIn, isLoaded } = useAuth();
	const { user } = useUser();
	const [isLoading, setIsLoading] = useState(false);

	const { items, getSubtotalPrice, getTotalPrice, deletedCart } =
		useCartStore();

	const handleCheckout = async () => {
		try {
			setIsLoading(true);
			const metadata: StripeMetadata = {
				orderNumber: crypto.randomUUID(),
				customerName: user?.fullName ?? "Unknown",
				customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
				clerkUserId: user!.id,
			};

			const checkoutUrl = await createCheckoutSession({ metadata, items });

			if (checkoutUrl) {
				window.location.href = checkoutUrl;
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const router = useRouter();
	if (isLoaded && !isSignedIn) {
		router.push("/");
		return;
	}

	if (items.length === 0) {
		return (
			<div className=' space-y-1 text-center py-20'>
				<p className=' text-7xl'>🎃</p>
				<br />
				<h3 className=' text-lg font-semibold'>Your cart is empty</h3>
				<p className=' text-sm  text-muted-foreground'>
					Add items to your cart to see them here.
				</p>
				<br />
				<Link href='/'>
					<Button size={"sm"}>Go to shop</Button>
				</Link>
			</div>
		);
	}

	return (
		<Container className=' py-10'>
			<h2 className='flex items-center gap-3 font-medium text-lg'>
				<div className=' h-8 aspect-square rounded-sm bg-green-500/20 text-green-600 p-2'>
					<ShoppingCart size={16} />
				</div>
				Shopping Cart
			</h2>
			<div className=' py-4 flex flex-col gap-4'>
				{items.length === 0 && (
					<p className=' text-muted-foreground text-sm'>No items in cart</p>
				)}
				{items.map(({ product, quantity }) => {
					return (
						<div
							key={product._id}
							className='flex border-b h-24 items-center justify-between gap-10 px-2'
						>
							<div className='flex items-center gap-2'>
								{product.images && (
									<Image
										src={urlFor(product?.images[0]).url()}
										width={50}
										height={50}
										alt={product?.name || "Product"}
										className=' h-full  aspect-square object-contain'
									/>
								)}
								<div className=' space-y-1'>
									<p className='text-sm font-medium mask-linear-to-chart-1'>
										{product.name}
									</p>
									<p className='text-xs text-muted-foreground   line-clamp-1'>
										{product.description}
									</p>
									<div className='flex items-center gap-4 text-sm text-muted-foreground font-semibold'>
										<span className='flex items-center gap-1'>
											<Box size={14} />
											{quantity} * {product.price}
										</span>
										<Trash
											size={14}
											onClick={() => deletedCart(product._id)}
											className=' hover:text-red-500 cursor-pointer duration-200'
										/>
									</div>
								</div>
							</div>
							<div className=' font-medium whitespace-nowrap '>
								$ {(product.price || 0) * quantity}
							</div>
						</div>
					);
				})}
			</div>
			<div className=' space-y-4 px-2'>
				<h3 className=' font-semibold'>Order Summary</h3>
				<div className=' flex justify-between items-center'>
					<p>Subtotal :</p>
					<PriceView
						price={getSubtotalPrice()}
						className=' text-muted-foreground text-sm'
					/>
				</div>
				<div className=' flex justify-between items-center'>
					<p>Discount :</p>
					<PriceView
						price={getSubtotalPrice() - getTotalPrice()}
						className=' text-muted-foreground text-sm'
					/>
				</div>
				<div className=' flex justify-between border-t py-2 items-center'>
					<p className=' font-semibold'>Total :</p>
					<PriceView price={getTotalPrice()} className=' font-semibold ' />
				</div>
			</div>
			<br />
			<Button
				disabled={isLoading}
				onClick={handleCheckout}
				className='w-full h-12'
			>
				{isLoading ? "Processing..." : "Proceed to checkout"}
			</Button>
		</Container>
	);
}
