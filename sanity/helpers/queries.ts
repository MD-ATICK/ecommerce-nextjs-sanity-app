import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";

export const getProductBySlug = async (slug: string) => {
	const query = defineQuery(
		`*[_type ==  "product" && slug.current == $slug ] | order(name asc) [0]`,
	);

	try {
		const response = await sanityFetch({
			query,
			params: {
				slug,
			},
		});

		return response?.data || null;
	} catch (error) {
		console.log((error as Error).message);
	}
};
