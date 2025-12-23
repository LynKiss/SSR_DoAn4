import { api, unwrap } from "@/lib/api";
import type { ProductsResponse, ProductQuery, CreateProductInput, UpdateProductInput } from "../types";

export const getProducts = async (query: ProductQuery = {}): Promise<{ data: ProductsResponse; meta: any | null }> => {
  return unwrap<ProductsResponse>(api.get("/products", { params: query }));
};

export const getProductById = async (id: string): Promise<{ data: unknown; meta: any | null }> => {
  return unwrap<unknown>(api.get(`/products/${id}`));
};

export const createProduct = async (input: CreateProductInput): Promise<{ data: unknown; meta: any | null }> => {
  return unwrap<unknown>(api.post("/products", input));
};

export const updateProduct = async (id: string, input: UpdateProductInput): Promise<{ data: unknown; meta: any | null }> => {
  return unwrap<unknown>(api.put(`/products/${id}`, input));
};

export const deleteProduct = async (id: string): Promise<{ data: unknown; meta: any | null }> => {
  return unwrap<unknown>(api.delete(`/products/${id}`));
};
