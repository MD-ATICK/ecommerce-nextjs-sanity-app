import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";

type Props = {
	product: Product;
	className?: string;
	setItemCount: React.Dispatch<React.SetStateAction<number>>;
};
export default function AddToCardButton({ product, setItemCount }: Props) {
	const outOfStock = product.stock === 0;
	return (
		<Button
			onClick={() => setItemCount(prev => prev + 1)}
			disabled={outOfStock}
			size={"sm"}
			className=' w-full'
		>
			Add to cart
		</Button>
	);
}
