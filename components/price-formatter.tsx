import { cn } from "@/lib/utils";
import React from "react";

type Props = {
	amount: number | undefined;
	className?: string;
};

export default function PriceFormatter({ amount, className }: Props) {
	const formattedAmount = new Number(amount).toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	});
	return (
		<span className={cn(" font-medium", className)}>{formattedAmount}</span>
	);
}
