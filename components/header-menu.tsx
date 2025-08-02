"use client";
import { headerData } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeaderMenu() {
	const pathName = usePathname();

	return (
		<div className=' hidden md:inline-flex gap-10'>
			{headerData.map(({ title, href }) => (
				<Link
					key={title}
					href={href}
					className={`  hover:text-black ${
						pathName === href ? "text-black" : "text-muted-foreground"
					}`}
				>
					{title}
				</Link>
			))}
		</div>
	);
}
