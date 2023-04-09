<script lang="ts">
	import { addToCart } from '$lib/shop';
	import { cart } from '../../../store/cart';
	import ProductCard from '../../_components/ProductCard.svelte';
	export const config = {
		runtime: 'edge'
	};
	import type { PageData } from './$types';
	export let data: PageData;

	let cartId: string | undefined
		cart.subscribe(value => {
			cartId = value?.id;
	})

	function handleClick() {
		if (!cartId) {
			return
		}
		console.log('add to cart', data.product.id)
		addToCart({
			cartId: cartId,
			variantId: data.product.id,
			quantity: 1
		});
	}
</script>

<div class="flex">
	<div class="sticky left-0 w-[600px]">
		<picture class="aspect-square">
			<img src={data.product.images.edges[0].node.originalSrc} alt={data.product.images.edges[0].node.altText} />
			<!-- <source
				type="image/webp"
				srcset="path/to/webp-480 480w, path/to/webp-1024 1024w, path/to/webp-1920 1920w"
			/>
			<img
				class="cool cats"
				src="path/to/jpg-1920"
				srcset="path/to/jpg-480 480w, path/to/jpg-1024 1024w, path/to/jpg-1920 1920w"
				width="1920"
				height="1080"
				loading="lazy"
				decoding="async"
				style='background: url("data:image/webp;base64,XXX") no-repeat center/cover'
				alt="Cute cat"
			/> -->
		</picture>
	</div>
	<div class="flex flex-col w-full">
		<h1>{data.product.title}</h1>
		<button on:click={handleClick}>Add to cart</button>
	</div>
</div>

<h2>Recommended</h2>
{#await data.streamed.recommmended}
	Loading...
{:then recommmended}
	<ol class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each recommmended as product}
			<li>
				<ProductCard product={product} />
			</li>
		{/each}
	</ol>
{/await}
