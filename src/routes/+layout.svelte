<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';
	import { cart, loadCart } from '../store/cart';
	import Header from './_components/Header.svelte';

	onMount(() => {
    loadCart()
	});
  
	// export const snapshot: Snapshot = {
	//   capture: () => cart,
	//   restore: (value) => {
	//     console.log("restore", value)
	//     let currentDate = Date.now();
	//     // let difference = currentDate - cartCreatedAt;
	//     // let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
	//     // let cartIdExpired = totalDays > 6;
	//     // if (cartId === 'undefined' || cartId === 'null' || cartIdExpired) {
	//     //   await callCreateCart();
	//     // }
	//     // await loadCart();

	//     cart = value
	//   }
	// };

	$: console.log('cart', cart);
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
