import { getProduct, getProductRecommendations } from '$lib/shop';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const prodRes = await getProduct(params.slug);
	if (prodRes.errors) {
		console.error('[getProduct] Error', prodRes.errors);
		throw new Error("Couldn't load product");
	}
	// console.log('getProduct', prodRes);
	return {
		product: {
			...prodRes.data.productByHandle,
			generatedTs: Date.now()
		},
		streamed: {
			recommmended: (async (id: string) => {
				const recRes = await getProductRecommendations(id);
				if (recRes.errors) {
					console.error('[getProductRecommendations] Error', recRes.errors);
					throw new Error("Couldn't load product recommendations");
				}
				// console.log('getProductRecommendations', recRes);
				return recRes.data.productRecommendations;
			})(prodRes.data.productByHandle.id)
		}
	};
};
