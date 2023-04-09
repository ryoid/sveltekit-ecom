<script lang="ts">
	import type { PageData } from './$types';
	import ProductCard from './_components/ProductCard.svelte';
	export let data: PageData;
</script>

<ol class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
	{#each data.featured.products as product}
		<li>
			<ProductCard product={product} />
		</li>
	{/each}
</ol>