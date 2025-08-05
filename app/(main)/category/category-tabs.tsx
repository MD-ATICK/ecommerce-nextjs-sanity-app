import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/sanity.types";
import { client } from "@/sanity/lib/client";

type VariantTabsProps = {
	selectedTab: string;
	setSelectedTab: (tab: string) => void;
};
export default function CategoryTabs({
	selectedTab,
	setSelectedTab,
}: VariantTabsProps) {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const query = `*[_type == "category"] | order(title asc)`;

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setIsLoading(true);
				const res = await client.fetch(query);
				const data = await res;
				setCategories(data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCategories();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className=' w-full flex justify-center items-center '>
			{isLoading && <p>Loading...</p>}
			<Tabs
				value={selectedTab}
				onValueChange={setSelectedTab}
				className=' w-fit'
			>
				<TabsList>
					<TabsTrigger value={"all"}>All</TabsTrigger>
					{categories.map(variant => (
						<TabsTrigger key={variant._id} value={variant.slug?.current ?? ""}>
							{variant.title}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		</div>
	);
}
