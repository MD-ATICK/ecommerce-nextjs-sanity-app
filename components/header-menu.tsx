"use client";
import { headerData } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeaderMenu() {
	const pathName = usePathname();

	// const [categories, setCategories] = React.useState<Category[]>([]);
	// const categoryQuery = `[_type == "category"] | order(title asc)`;

	// useEffect(() => {

	// 	const fetchCategories = async () => {
	// 		try {
	// 			const res = await client.fetch(categoryQuery);
	// 			const data = await res;
	// 			console.log(data);
	// 			setCategories(data)
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};

	// 	fetchCategories();
	// }, []);

	return (
		<div className=' hidden md:inline-flex gap-10'>
			{headerData.map(({ title, href }) => (
				<Link
					key={title}
					href={href}
					className={`  hover:text-foreground ${
						pathName === href ? "text-foreground" : "text-muted-foreground"
					}`}
				>
					{title}
				</Link>
			))}
		</div>
	);
}
