<script lang="ts">
	import type { ProductCard } from "$lib/shop";

  export let product: ProductCard
</script>

<a href={`/products/${product.handle}`}>
  <picture class="aspect-square w-full bg-gray-500">
    <img src={product.images.edges[0].node.originalSrc} alt={product.images.edges[0].node.altText} />
  </picture>
  <span>{product.title}</span>
</a>