import { createCart, getCart } from '$lib/shop';
import { writable } from 'svelte/store';

export const STORAGE_KEY_CART_ID = 'cart_id';

export const loading = writable(false);
export const cart = writable<{
	id: string;
	checkoutUrl: string;
	items: any[];
} | null>(null);
export const cartQuantity = writable(0);
export const cartItems = writable<any[]>([]);
0;
export async function loadCart() {
	let cartId = JSON.parse(localStorage.getItem(STORAGE_KEY_CART_ID)!) as string | null;
	console.log('storage cartId', cartId);

	if (!cartId) {
		console.log('Init cart');
		const res = await createCart();
		if (res.errors) {
			console.log('createCart', res.errors);
			throw new Error('Error creating cart');
		}
		cartId = res.data.cartCreate.cart.id;
		localStorage.setItem(STORAGE_KEY_CART_ID, JSON.stringify(cartId));
	}
	console.log('cartId', cartId);
	const res = await getCart(cartId);
	if (res.errors) {
		console.log('getCart', res.errors);
		throw new Error('Error getting cart');
	}
	console.log('getCart', res);
	const parsed = {
		id: cartId,
		checkoutUrl: res.data.cart.checkoutUrl,
		items: res.data.cart.lines.edges
	};
	cart.set(parsed);
	return parsed;
}

export async function getCartItems() {
	// let cartId = JSON.parse(localStorage.getItem('cartId'));
	console.log('getCartItems');
	try {
		const shopifyResponse = await loadCart(cart.id);
		console.log('getCartItems', shopifyResponse);

		// let sum = 0;
		// shopifyResponse.body?.data?.cart?.lines?.edges?.forEach((d) => {
		// 	sum += d.node.quantity;
		// });
		// cartQuantity.set(sum);
		return shopifyResponse;
	} catch (error) {
		console.log(error);
	}
}

export async function callCreateCart() {
	const cartRes = await createCart();
	console.log('cartRes', cartRes.body);
	loading.set(false);
	// if (typeof window !== 'undefined') {
	//   localStorage.setItem('cartCreatedAt', Date.now());
	//   localStorage.setItem('cartId', JSON.stringify(cartRes.body?.data?.cartCreate?.cart?.id));
	//   localStorage.setItem(
	//     'cartUrl',
	//     JSON.stringify(cartRes.body?.data?.cartCreate?.cart?.checkoutUrl)
	//   );
	// }
}

export function addOneItem(item, i) {
	loading.set(true);
	console.log('addOneItem', item);
	loading.set(false);
	// addToCart({

	// })
}
export function removeOneItem(item, i) {
	loading.set(true);
	console.log('removeOneItem', item);
	loading.set(false);
	// const quantity = item.node.quantity - 1;
	// dispatch('removeProduct', {
	// 	body: {
	// 		variantId: item.node.merchandise.id,
	// 		quantity: quantity,
	// 		lineId: item.node.id
	// 	}
	// });
}
export function removeEntireItem(item, i) {
	loading.set(true);
	console.log('removeEntireItem', item);
	loading.set(false);
	// dispatch('removeProduct', {
	// 	body: {
	// 		variantId: item.node.merchandise.id,
	// 		quantity: 0,
	// 		lineId: item.node.id
	// 	}
	// });
}
export async function checkout() {
	loading.set(true);
	window.open(cart.checkoutUrl, '_blank');
	loading.set(false);
}
