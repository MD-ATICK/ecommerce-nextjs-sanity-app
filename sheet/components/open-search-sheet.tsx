import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import React, { useCallback, useEffect, useState } from "react";
import { useOpenSearch } from "../hooks/use-open-search";
import { Input } from "@/components/ui/input";
import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceView from "@/components/price-view";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function OpenSearchSheet() {
	const { open, setOpen } = useOpenSearch();
	const [search, setSearch] = useState("");
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchSearchProducts = useCallback(async () => {
		if (!search) {
			setProducts([]);
			return;
		}

		try {
			setIsLoading(true);

			const query = `*[_type == "product" && name match $search] | order(name asc)`;
			const params = { search: `${search}*` };

			const response = await client.fetch(query, params);
			setProducts(response);
		} catch (error) {
			console.log((error as Error).message);
		} finally {
			setIsLoading(false);
		}
	}, [search]);

	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			fetchSearchProducts();
		}, 300);
		return () => clearTimeout(debounceTimer);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Search</SheetTitle>
				</SheetHeader>
				<div>
					<Input
						placeholder='Search'
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
					{isLoading && (
						<div className=' p-3 space-y-2'>
							<Skeleton className=' h-20 w-full' />
							<Skeleton className=' h-20 w-full' />
							<Skeleton className=' h-20 w-full' />
							<Skeleton className=' h-20 w-full' />
						</div>
					)}
					{products && products.length > 0 && (
						<div className=' p-3 space-y-2'>
							{products.map(product => (
								<Link
									href={`/product/${product.slug?.current}`}
									key={product._id}
									onClick={() => setOpen(false)}
									className='flex h-20 items-center gap-2'
								>
									{product.images && (
										<Image
											src={urlFor(product?.images[0]).url()}
											width={50}
											height={50}
											alt={product?.name || "Product"}
											className=' h-full  aspect-square object-contain'
										/>
									)}
									<div className=' space-y-1'>
										<p className='text-sm font-medium mask-linear-to-chart-1'>
											{product.name}
										</p>
										<p className='text-xs text-muted-foreground   line-clamp-1'>
											{product.description}
										</p>
										<div className='flex items-center gap-2'>
											<PriceView
												className=' text-sm'
												price={product.price}
												discount={product.discount}
											/>
											{product?.stock && product?.stock > 0 ? (
												<div className=' border-green-500 text-green-500 bg-green-500/20 rounded-sm w-fit  px-3 py-1 font-semibold text-xs'>
													In Stock
												</div>
											) : (
												<div className=' border-red-500 text-red-500 bg-red-500/20 rounded-sm w-fit  px-3 py-1 font-semibold text-xs'>
													Out of Stock
												</div>
											)}
										</div>
									</div>
								</Link>
							))}
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
