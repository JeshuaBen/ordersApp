import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as cartInMemory from "./helpers/cart-in-memory";

export type TProductCartProps = ProductProps & {
  quantity: number;
};

type TStateProps = {
  products: TProductCartProps[];
  addToCart: (product: TProductCartProps) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create(
  persist<TStateProps>(
    (set) => ({
      products: [],
      addToCart: (product: ProductProps) =>
        set((state) => ({
          products: cartInMemory.addToCart(state.products, product),
        })),
      removeFromCart: (productId: string) =>
        set((state) => ({
          products: cartInMemory.removeFromCart(state.products, productId),
        })),
      clearCart: () => set({ products: [] }),
    }),
    {
      name: "@nlw-orders:cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
