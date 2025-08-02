import { cn } from "@/lib/utils";
import React from "react";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export default function Container({ children, className }: Props) {
	return (
		<div className={cn(" max-w-screen-xl mx-auto px-2", className)}>
			{children}
		</div>
	);
}
