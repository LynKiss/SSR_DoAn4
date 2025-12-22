import { api, unwrap } from "@/lib/api";
import type { Customer, CustomerUpsertBody } from "../types";

export async function addCustomer(body: CustomerUpsertBody) {
  return unwrap<Customer>(api.post("/customers", body));
}
