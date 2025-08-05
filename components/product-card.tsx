import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceView from "./price-view";
import AddToCardButton from "./add-to-cart-button";
import Quantity from "./quantity";
import { useCartStore } from "@/zustand/use-cart-store";

export default function ProductCard({ product }: { product: Product }) {
	const { getItemCount } = useCartStore();
	const itemCount = getItemCount(product._id);

	const outOfStock = product.stock === 0;

	return (
		<div className=' space-y-2  relative'>
			{product.images && (
				<div className='rounded-sm overflow-hidden w-full bg-white/10 aspect-square'>
					<Link href={`/product/${product.slug?.current}`}>
						<Image
							src={urlFor(product.images[0]).url()}
							width={500}
							height={500}
							alt={product?.name || "Product"}
							className='w-full  aspect-square object-contain'
						/>
					</Link>
					{outOfStock && (
						<div className=' z-40 w-full bg-background/50 flex justify-center items-center absolute top-0 left-0 h-full'>
							<p className=' text-muted-foreground font-medium text-sm'>
								Out of stock
							</p>
						</div>
					)}
				</div>
			)}
			<div>
				<h2 className=' font-semibold  line-clamp-1'>{product.name}</h2>
				<p className=' text-muted-foreground line-clamp-1 text-sm font-medium'>
					{product.intro}
				</p>
			</div>
			<div>
				<PriceView price={product.price} discount={product.discount} />
			</div>
			{itemCount > 0 ? (
				<Quantity product={product} itemCount={itemCount} />
			) : (
				<AddToCardButton product={product} />
			)}
		</div>
	);
}
