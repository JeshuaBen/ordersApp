import { ProductProps } from "@/utils/data/products";
import { TProductCartProps } from "../cart-store";

export const addToCart = (
  products: TProductCartProps[],
  newProduct: ProductProps
) => {
  const existentProduct = products.find(({ id }) => id === newProduct.id);

  if (existentProduct) {
    return products.map((product) =>
      product.id === existentProduct.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }

  return [...products, { ...newProduct, quantity: 1 }];
};
