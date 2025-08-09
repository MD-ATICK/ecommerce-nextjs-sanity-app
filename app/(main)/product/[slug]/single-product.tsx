"use client";
import Container from "@/components/container";
import { cn } from "@/lib/utils";
import {
	internalGroqTypeReferenceTo,
	Product,
	SanityImageCrop,
	SanityImageHotspot,
} from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PriceView from "@/components/price-view";
import AddToCardButton from "@/components/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import SingleProductRightBottom from "@/components/single-product-right-bottom";
import { Skeleton } from "@/components/ui/skeleton";

type imageType = {
	asset?: {
		_ref: string;
		_type: "reference";
		_weak?: boolean;
		[internalGroqTypeReferenceTo]?: "sanity.imageAsset";
	};
	media?: unknown;
	hotspot?: SanityImageHotspot;
	crop?: SanityImageCrop;
	_type: "image";
	_key: string;
};

export default function SingleProductPage() {
	const { slug } = useParams();
	if (!slug) notFound();

	const query = `*[_type == "product" && slug.current ==$slug ] | order(name asc) [0]`;
	const params = { slug };
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(false);
	const [active, setActive] = useState<imageType | null>(null);
	useEffect(() => {
		const fetchSingleProduct = async () => {
			try {
				setLoading(true);
				const product = await client.fetch(query, params);
				setProduct(product);
				setActive(product?.images[0]);
			} catch (error) {
				console.log((error as Error).message);
			} finally {
				setLoading(false);
			}
		};

		fetchSingleProduct();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container>
			{loading && <SingleProductLoading />}
			<section className=' py-14 grid grid-cols-1 lg:grid-cols-2 gap-10'>
				{/* Left */}
				<div className=' space-y-6'>
					<div className=' bg-foreground/10 w-4/5 mx-auto'>
						<AnimatePresence mode='wait'>
							<motion.div
								key={active?._key}
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.5 }}
								transition={{ duration: 0.2 }}
							>
								{active && (
									<Image
										src={urlFor(active).url()}
										width={500}
										height={500}
										className=' w-full aspect-square object-contain'
										alt={product?.name ?? "Product Image"}
									/>
								)}
							</motion.div>
						</AnimatePresence>
					</div>
					<div className=' flex items-center gap-2 justify-center'>
						{product?.images?.map((image, index) => (
							<Image
								key={index}
								src={urlFor(image).url()}
								width={100}
								height={100}
								className={cn(
									"w-20 cursor-pointer object-cover object-top hover:scale-95 duration-100 bg-foreground/10 aspect-square",
									image._key === active?._key &&
										"  bg-green-600/40 scale-105 shadow-lg border-gray-300 hover:scale-100",
								)}
								alt={product?.name ?? "Product Image"}
								onClick={() => setActive(image)}
							/>
						))}
					</div>
				</div>

				{/* Right */}
				<div className=' p-2 space-y-2'>
					<h2 className=' font-semibold text-2xl'>{product?.name}</h2>
					<PriceView price={product?.price} discount={product?.discount} />
					{product?.stock && product?.stock > 0 ? (
						<div className=' border-green-500 text-green-500 bg-green-500/20 rounded-sm w-fit  px-3 py-1 font-semibold text-xs'>
							In Stock
						</div>
					) : (
						<div className=' border-red-500 text-red-500 bg-red-500/20 rounded-sm w-fit  px-3 py-1 font-semibold text-xs'>
							Out of Stock
						</div>
					)}
					<p>{product?.description}</p>
					<div className=' py-3 flex items-center gap-4'>
						{product && <AddToCardButton product={product} />}
						<Button variant={"outline"} size={"icon"}>
							{" "}
							<Heart />{" "}
						</Button>
					</div>
					<SingleProductRightBottom />
				</div>
			</section>
		</Container>
	);
}

const SingleProductLoading = () => {
	return (
		<section className='py-14 grid grid-cols-1 lg:grid-cols-2 gap-10'>
			<div className=' space-y-6'>
				<Skeleton className=' w-4/5 mx-auto aspect-square' />
				<div className=' flex items-center gap-2 justify-center'>
					<Skeleton className=' h-20 aspect-square' />
					<Skeleton className=' h-20 aspect-square' />
					<Skeleton className=' h-20 aspect-square' />
				</div>
			</div>
			<div className=' p-2 space-y-3'>
				<Skeleton className=' h-10 w-full' />
				<div className='flex items-center gap-2'>
					<Skeleton className=' h-8 w-[100px]' />
					<Skeleton className=' h-8 w-[100px]' />
				</div>
				<Skeleton className=' h-8 w-[100px]' />
				<Skeleton className=' h-32 w-full' />
				<div className=' grid grid-cols-2 gap-2 py-3'>
					<Skeleton className=' h-16 w-full' />
					<Skeleton className=' h-16 w-full' />
					<Skeleton className=' h-16 w-full' />
					<Skeleton className=' h-16 w-full' />
				</div>
				<Skeleton className=' h-16 w-full' />
			</div>
		</section>
	);
};
