import { api, unwrap } from "@/lib/api";

export async function deleteCustomer(id: string | number) {
  return unwrap<{ ok: boolean }>(api.delete(`/customers/${id}`));
}
