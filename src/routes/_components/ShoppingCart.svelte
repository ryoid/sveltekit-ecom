<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icons from '../../components/Icons.svelte';
	import { cart, checkout, loading } from '../../store/cart';

	export let isOpen: boolean;

	const dispatch = createEventDispatcher();

	// cart
	let items = []


	$: if (typeof document !== 'undefined') {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			document.addEventListener('keydown', (e) => {
				if (e.key === 'Escape') {
					dispatch('dismiss');
				}
			});
		} else {
			document.body.style.overflow = 'auto';
		}
	}
</script>

{#if isOpen}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		on:click={() => {
			console.log('click');
			dispatch('dismiss');
		}}
		class="absolute inset-0 z-50 flex max-h-screen w-full justify-end overflow-hidden bg-black/50"
	/>
	<div class="absolute inset-0 z-50 flex justify-end">
		<div class="z-50 w-full bg-white border-l shadow-xl p-6 md:w-1/2 lg:w-1/3 relative">
			<div class="mb-6 flex w-full items-center justify-between">
				<div class="text-2xl font-medium">My Cart</div>
				<button
					on:click={() => {
						dispatch('dismiss');
					}}
					class="text-sm uppercase opacity-80 hover:opacity-100">close</button
				>
			</div>
			{#if items.length === 0}
				<div class="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
					<div class="flex h-16 w-16 items-center justify-center rounded-full bg-white">
						<Icons type="cart" strokeColor="#000" />
					</div>
					<div class="mt-6 text-center text-2xl font-bold">Your cart is empty.</div>
				</div>
			{/if}
			<div class="overflow-y-auto" style="height: 80%;">
				ITEMS
			</div>
			{#if items.length !== 0}
				<button
					on:click={checkout}
					class="mt-6 flex w-full items-center justify-center bg-white p-3 text-sm font-medium uppercase text-black opacity-90 hover:opacity-100"
				>
					<span>Proceed to Checkout</span>
					{#if loading}
						<div class="lds-ring ml-4">
							<div />
							<div />
							<div />
							<div />
						</div>
					{/if}
				</button>
			{/if}
		</div>
	</div>
{/if}
