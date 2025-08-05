import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { useCartStore } from "@/zustand/use-cart-store";
import { toast } from "sonner";

type Props = {
	product: Product;
	className?: string;
};
export default function AddToCardButton({ product }: Props) {
	const { addItem } = useCartStore();

	const outOfStock = product.stock === 0;
	return (
		<Button
			onClick={() => {
				addItem(product);
				toast.success("Item added to cart");
			}}
			disabled={outOfStock}
			size={"sm"}
			className=' w-full'
		>
			Add to cart
		</Button>
	);
}
