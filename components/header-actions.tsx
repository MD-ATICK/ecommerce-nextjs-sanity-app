"use client";

import { useOpenSearch } from "@/sheet/hooks/use-open-search";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function HeaderActions() {
	const { setOpen, open } = useOpenSearch();
	return (
		<div className='flex items-center gap-2'>
			{/* Search */}
			<Button variant={"ghost"} size={"icon"} onClick={() => setOpen(!open)}>
				<Search />
			</Button>

			{/* Cart */}
			<Link href={"/cart"}>
				<Button variant={"ghost"} size={"icon"} className=' relative'>
					<ShoppingCart size={18} />
					<span className=' absolute top-1 -right-0 text-xs bg-primary rounded-sm h-4 text-center text-background font-medium aspect-square'>
						1
					</span>
				</Button>
			</Link>
		</div>
	);
}
