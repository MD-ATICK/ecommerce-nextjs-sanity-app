import { Product } from "@/sanity.types";
import React from "react";
import PriceFormatter from "./price-formatter";
import { Button } from "./ui/button";

type Props = {
	product: Product;
	itemCount: number;
	setItemCount: React.Dispatch<React.SetStateAction<number>>;
};

export default function Quantity({ product, itemCount, setItemCount }: Props) {
	return (
		<div className=' text-sm '>
			<div className=' pb-2 border-b  flex justify-between items-center'>
				<p className=' text-sm font-medium text-muted-foreground'>Quantity</p>
				<div className=' flex items-center gap-2'>
					<Button
						disabled={itemCount === 1}
						onClick={() => setItemCount(prev => prev - 1)}
						variant={"outline"}
						size={"icon"}
						className=' h-7 w-7'
					>
						-
					</Button>
					<p className=' font-bold px-2'>{itemCount}</p>
					<Button
						disabled={product.stock === 0 || itemCount === product.stock}
						onClick={() => setItemCount(prev => prev + 1)}
						variant={"outline"}
						size={"icon"}
						className=' h-7 w-7'
					>
						+
					</Button>
				</div>
			</div>

			<div className=' py-1 flex justify-between items-center'>
				<p className=' text-sm font-medium'>Subtotal</p>
				<PriceFormatter
					className=' font-bold'
					amount={itemCount * (product?.price || 0)}
				/>
			</div>
		</div>
	);
}
