import React from "react";
import PriceFormatter from "./price-formatter";
import { cn } from "@/lib/utils";

interface Props {
	price: number | undefined;
	discount: number | undefined;
	className?: string;
}

export default function PriceView({ price, discount, className }: Props) {
	return (
		<div>
			<div className={cn(" space-x-2", className)}>
				<PriceFormatter amount={price} />
				{price && discount && (
					<PriceFormatter
						className=' text-muted-foreground line-through'
						amount={price + (price * discount) / 100}
					/>
				)}
			</div>
		</div>
	);
}
