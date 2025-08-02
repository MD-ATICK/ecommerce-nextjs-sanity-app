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
			{loading && <p>Loading...</p>}
			<section className=' p-2 grid grid-cols-1 lg:grid-cols-2 gap-10'>
				{/* Left */}
				<div className=' p-10 space-y-6'>
					{active && (
						<Image
							src={urlFor(active).url()}
							width={500}
							height={500}
							className=' w-full aspect-square object-contain'
							alt={product?.name ?? "Product Image"}
						/>
					)}
					<div className=' flex items-center gap-2'>
						{product?.images?.map((image, index) => (
							<Image
								key={index}
								src={urlFor(image).url()}
								width={100}
								height={100}
								className={cn(
									"w-20 cursor-pointer object-cover object-top hover:scale-95 duration-100 bg-foreground/20 aspect-square",
									image._key === active?._key &&
										" border rounded-sm shadow-lg border-orange-600 hover:scale-100",
								)}
								alt={product?.name ?? "Product Image"}
								onClick={() => setActive(image)}
							/>
						))}
					</div>
				</div>
			</section>
		</Container>
	);
}
