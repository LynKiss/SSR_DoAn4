import { api, unwrap } from "@/lib/api";
import type { Customer } from "../types";

export async function getCustomerById(id: string | number) {
  return unwrap<Customer>(api.get(`/customers/${id}`));
}
