import { productsApi } from "../api/productsApi";
import { Product } from "../interfaces/product";

interface GetProductsOptions {
  filterKey?: string;
  id?: number;
}

const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};
export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  await sleep(2);
  const filterUrl = filterKey ? `category=${filterKey}` : "";
  const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`);
  return data;
};

export const getProduct = async ({ id }: GetProductsOptions) => {
  await sleep(2);
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};
export interface ProductLike {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
export const createProduct = async (product: ProductLike) => {
  await sleep(5);
  throw new Error("Error creating product");
  const { data } = await productsApi.post<Product>("/products", product);
  return data;
};
