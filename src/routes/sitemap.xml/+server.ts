import type { Product } from '$lib/shop';

export const config = {
	// Daily
	isr: { expiration: 60 * 60 * 24 }
};

export async function GET() {
	const { products } = await fetch('https://dummyjson.com/products?limit=100').then(
		(r) =>
			r.json() as Promise<{
				products: Product[];
			}>
	);
	return new Response(
		`
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      ${products.map((product) =>
				`
          <url>
            <loc>https://svelte-kit-dummyjson.vercel.app/product/${product.id}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            ${
							product.thumbnail
								? `
                  <image:image>
                    <image:loc>${product.thumbnail}</image:loc>
                    <image:title>${product.title.replaceAll('&', '&amp;').trim()}</image:title>
                    <image:caption />
                  </image:image>
                 `.trim()
								: ''
						}
          </url>
        `.trim()
			)}
    </urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
