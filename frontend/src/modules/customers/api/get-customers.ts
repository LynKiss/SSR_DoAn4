import { api, unwrap } from "@/lib/api";
import type { Customer } from "../types";

export type GetCustomersQuery = { page?: number; limit?: number; q?: string };

export async function getCustomers(query: GetCustomersQuery) {
  return unwrap<Customer[]>(api.get("/customers", { params: query }));
}
