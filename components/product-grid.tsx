"use client";
import React, { useEffect } from "react";
import VariantTabs from "./variant-tabs";
import Container from "./container";
import { productVariant } from "@/constants";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import ProductCard from "./product-card";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "./ui/skeleton";
export default function ProductGrid() {
	const [selectedTab, setSelectedTab] = React.useState(productVariant[0].value);

	const query = `*[_type ==  "product" && variant ==$variant] | order(name asc)`;
	const params = { variant: selectedTab.toLocaleLowerCase() };
	const [isLoading, setIsLoading] = React.useState(false);
	const [products, setProducts] = React.useState<Product[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log("start");
				setIsLoading(true);
				const res = await client.fetch(query, params);
				const data = await res;
				setProducts(data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTab]);

	return (
		<Container className=''>
			<VariantTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
			{isLoading && <ProductLoading />}
			{!isLoading && products.length === 0 && <p>No products found.</p>}
			<div className=' grid grid-cols-1 lg:grid-cols-4 gap-6 py-8'>
				{!isLoading &&
					products.length > 0 &&
					products.map(product => (
						<AnimatePresence key={product._id}>
							<motion.div
								layout
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<ProductCard key={product._id} product={product} />
							</motion.div>
						</AnimatePresence>
					))}
			</div>
		</Container>
	);
}

const ProductLoading = () => {
	return (
		<div className=' grid grid-cols-1 lg:grid-cols-4 gap-6 py-8'>
			{[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
				<AnimatePresence key={index}>
					<motion.div
						layout
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Skeleton className=' w-full aspect-[3/4]' />
					</motion.div>
				</AnimatePresence>
			))}
		</div>
	);
};
