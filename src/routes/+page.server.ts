import { getFeaturedProducts } from '$lib/shop';
import type { PageServerLoad } from './$types';

import { ISR_BYPASS_TOKEN } from '$env/static/private';
export const config = {
	// Every 5 minute
	isr: {
		expiration: 60 * 60 * 5,
		// Random token that can be provided in the URL to bypass the cached version of the asset, by requesting the asset
		// with a __prerender_bypass=<token> cookie.
		//
		// Making a `GET` or `HEAD` request with `x-prerender-revalidate: <token>` will force the asset to be re-validated.
		bypassToken: ISR_BYPASS_TOKEN
	}
};

export const load: PageServerLoad = () => {
	return {
		featured: (async () => {
			const res = await getFeaturedProducts();
			console.log('data', res.data.products);
			return {
				products: res.data.products.edges.map((e) => e.node),
				generatedTs: Date.now()
			};
		})()
	};
};
