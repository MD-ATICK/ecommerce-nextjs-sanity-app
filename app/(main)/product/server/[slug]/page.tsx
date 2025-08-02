import Container from "@/components/container";
import { getProductBySlug } from "@/sanity/helpers/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const product = await getProductBySlug(slug);

	if (!product) {
		return notFound();
	}

	return (
		<Container className=' p-3 space-y-6'>
			{product.images && (
				<Image
					src={urlFor(product?.images[0]).url()}
					width={500}
					height={500}
					alt={product?.name ?? "Product Image"}
				/>
			)}
			<div className=' py-8'>
				<h3>{product?.name}</h3>
				<p className=' text-sm text-muted-foreground'>{product?.description}</p>
			</div>
		</Container>
	);
}
