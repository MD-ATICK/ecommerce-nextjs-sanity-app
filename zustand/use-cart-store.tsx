import { Product } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CardItem = {
	product: Product;
	quantity: number;
};

type CartState = {
	items: CardItem[];
	addItem: (product: Product) => void;
	remoteItem: (productId: string) => void;
	deletedCart: (productId: string) => void;
	resetCart: () => void;
	getTotalPrice: () => number;
	getSubtotalPrice: () => number;
	getItemCount: (productId: string) => number;
};

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			addItem: product =>
				set(state => {
					const existingItem = state.items.find(
						item => item.product._id === product._id,
					);
					if (existingItem) {
						return {
							items: state.items.map(item =>
								item.product._id === product._id
									? { ...item, quantity: item.quantity + 1 }
									: item,
							),
						};
					} else {
						return {
							items: [...state.items, { product, quantity: 1 }],
						};
					}
				}),
			remoteItem: productId =>
				set(state => {
					const findItem = state.items.find(
						item => item.product._id === productId,
					);

					if (findItem && findItem.quantity > 1) {
						return {
							items: state.items.map(item =>
								item.product._id === findItem.product._id
									? { ...item, quantity: item.quantity - 1 }
									: item,
							),
						};
					} else {
						return {
							items: state.items.filter(item => item.product._id !== productId),
						};
					}
				}),
			deletedCart: productId =>
				set(state => ({
					items: state.items.filter(item => item.product._id !== productId),
				})),
			resetCart: () => set({ items: [] }),
			getTotalPrice: () => {
				return get().items.reduce(
					(total, item) => total + (item.product.price || 0) * item.quantity,
					0,
				);
			},
			getSubtotalPrice: () => {
				return get().items.reduce((acc, crr) => {
					const price = crr.product.price || 0;
					const discountPrice = (price * (crr.product.discount ?? 0)) / 100;
					const actualPrice = price + discountPrice;
					return acc + actualPrice;
				}, 0);
			},
			getItemCount: (productId: string) => {
				return (
					get().items.find(item => item.product._id === productId)?.quantity ??
					0
				);
			},
		}),
		{ name: "cart" },
	),
);
