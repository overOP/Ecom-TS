import { create } from "zustand";
import type { CartItem } from "@/Types/Types";

interface CartState {
  cartItem: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

export const useCart = create<CartState>((set) => ({
  cartItem: [],
  addToCart: (item) =>
    set((state) => {
      const exists = state.cartItem.find((i) => i.id === item.id);
      if (exists) {
        return {
          cartItem: state.cartItem.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cartItem: [...state.cartItem, { ...item, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cartItem: state.cartItem.filter((item) => item.id !== id),
    })),
  increaseQuantity: (id) =>
    set((state) => ({
      cartItem: state.cartItem.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  decreaseQuantity: (id) =>
    set((state) => ({
      cartItem: state.cartItem
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    })),
}));
