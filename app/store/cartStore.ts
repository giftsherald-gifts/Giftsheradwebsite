'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Cart } from '@/types';

interface CartState extends Cart {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateItem: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCoupon: (code: string) => void;
  removeCoupon: () => void;
  calculateTotals: () => void;
}

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  discount: 0,
  total: 0,
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      ...initialCart,

      addItem: (item: CartItem) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.productId === item.productId);
          let items: CartItem[];

          if (existingItem) {
            items = state.items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
          } else {
            items = [...state.items, item];
          }

          return { items };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateItem: (productId: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set(initialCart);
      },

      setCoupon: (code: string) => {
        set((state) => ({
          couponCode: code,
        }));
      },

      removeCoupon: () => {
        set((state) => ({
          couponCode: undefined,
          discount: 0,
        }));
      },

      calculateTotals: () => {
        set((state) => {
          const subtotal = state.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const tax = Math.round(subtotal * 0.05); // 5% GST
          const shipping = subtotal > 500 ? 0 : 50; // Free shipping above 500
          const discount = state.discount || 0;
          const total = subtotal + tax + shipping - discount;

          return {
            subtotal,
            tax,
            shipping,
            total: Math.max(0, total),
          };
        });
      },
    }),
    {
      name: 'cart-storage',
      skipHydration: true,
    }
  )
);
