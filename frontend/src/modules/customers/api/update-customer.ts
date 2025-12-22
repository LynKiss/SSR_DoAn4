import { api, unwrap } from "@/lib/api";
import type { Customer, CustomerUpsertBody } from "../types";

export async function updateCustomer(
  id: string | number,
  body: CustomerUpsertBody
) {
  return unwrap<Customer>(api.put(`/customers/${id}`, body));
}
