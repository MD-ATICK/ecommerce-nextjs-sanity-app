import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { productVariant } from "@/constants";

type VariantTabsProps = {
	selectedTab: string;
	setSelectedTab: (tab: string) => void;
};
export default function VariantTabs({
	selectedTab,
	setSelectedTab,
}: VariantTabsProps) {
	return (
		<div className=' w-full flex justify-center items-center '>
			<Tabs
				value={selectedTab}
				onValueChange={setSelectedTab}
				className=' w-fit'
			>
				<TabsList>
					{productVariant.map(variant => (
						<TabsTrigger key={variant.value} value={variant.value}>
							{variant.title}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		</div>
	);
}
