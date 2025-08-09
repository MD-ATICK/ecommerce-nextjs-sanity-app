"use client";

import { useOpenSearch } from "@/sheet/hooks/use-open-search";
import { ListOrdered, Search, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useCartStore } from "@/zustand/use-cart-store";

export default function HeaderActions() {
	const { isSignedIn } = useAuth();
	const { setOpen, open } = useOpenSearch();
	const { items } = useCartStore();
	return (
		<div className='flex items-center gap-2'>
			{/* Search */}
			<Button variant={"ghost"} size={"icon"} onClick={() => setOpen(!open)}>
				<Search />
			</Button>

			{/* Cart */}
			{isSignedIn ? (
				<>
					<Link href={"/cart"}>
						<Button variant={"ghost"} size={"icon"} className=' relative'>
							<ShoppingCart size={18} />
							<span className=' absolute top-1 -right-0 text-xs bg-primary rounded-sm h-4 text-center text-background font-medium aspect-square'>
								{items.length}
							</span>
						</Button>
					</Link>
					<Link href={"/orders"}>
						<Button variant={"ghost"} size={"icon"} className=' relative'>
							<ListOrdered size={20} />
						</Button>
					</Link>
				</>
			) : (
				<SignInButton mode='modal'>
					<Button variant={"ghost"} size={"icon"} className=' relative'>
						<ShoppingCart size={18} />
						<span className=' absolute top-1 -right-0 text-xs bg-primary rounded-sm h-4 text-center text-background font-medium aspect-square'>
							{items.length}
						</span>
					</Button>
				</SignInButton>
			)}
		</div>
	);
}
