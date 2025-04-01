import { isAxiosError } from "axios";
import type { Product } from "..";
import { productsApi } from "../api/productsApi";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:3100/products");
  const data = (await response.json()) as Product[];
  return data;
};

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  try {
    const { data } = await productsApi.get<Product[]>(
      `/products?category=${category}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const getProductById = async (id: Product["id"]): Promise<Product> => {
  try {
    const { data } = await productsApi.get<Product>(`/products/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};
