"use client";
import { useMobileSidebar } from "@/sheet/hooks/use-mobile-sidebar";
import { Menu } from "lucide-react";
import React from "react";

export default function MobileNav() {
	const { open, setOpen } = useMobileSidebar();

	return (
		<Menu
			onClick={() => setOpen(!open)}
			className=' md:hidden cursor-pointer'
			size={25}
		/>
	);
}
