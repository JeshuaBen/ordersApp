import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";

export type TProductCartProps = ProductProps & {
  quantity: number;
};

type TStateProps = {
  products: TProductCartProps[];
  addToCart: (product: TProductCartProps) => void;
};

export const useCartStore = create<TStateProps>((set) => ({
  products: [],
  addToCart: () => {},
}));
