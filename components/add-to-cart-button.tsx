import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
	product: Product;
	className?: string;
	setItemCount: React.Dispatch<React.SetStateAction<number>>;
};
export default function AddToCardButton({ product, setItemCount }: Props) {
	const outOfStock = product.stock === 0;
	return (
		<Link href={`/product/server/${product.slug?.current}`} className=' w-full'>
			<Button
				onClick={() => setItemCount(prev => prev + 1)}
				disabled={outOfStock}
				size={"sm"}
				className=' w-full'
			>
				Add to cart
			</Button>
		</Link>
	);
}
