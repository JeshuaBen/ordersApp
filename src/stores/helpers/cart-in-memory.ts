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

export const removeFromCart = (
  products: TProductCartProps[],
  productIdToRemove: string
) => {
  const updatedProducts = products.map((product) =>
    product.id === productIdToRemove
      ? {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 0,
        }
      : product
  );

  return updatedProducts.filter((product) => product.quantity > 0);
};
