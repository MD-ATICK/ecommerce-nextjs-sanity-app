"use client";

import Container from "@/components/container";
import { useEffect, useState } from "react";
import CategoryTabs from "./category-tabs";
import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product-card";

export default function Category() {
	const [selectedTab, setSelectedTab] = useState("all");
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const query =
		selectedTab === "all"
			? `*[_type == "product"] | order(name asc)`
			: `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)`;

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setIsLoading(true);
				const res = await client.fetch(query, { categorySlug: selectedTab });
				const data = await res;
				setProducts(data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProducts();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTab]);

	return (
		<Container className=' py-10'>
			<CategoryTabs setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
			{isLoading && <ProductLoading />}
			{!isLoading && products.length === 0 && (
				<p className=' py-8'>No products found.</p>
			)}
			<div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8'>
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
		<div className=' grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6 py-8'>
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
