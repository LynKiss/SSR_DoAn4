import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customersApi } from "./api/customers.api";

export function useCustomers(params: { q?: string; page: number; limit: number }) {
  return useQuery({
    queryKey: ["customers", params],
    queryFn: async () => customersApi.list(params),
  });
}

export function useCreateCustomer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: customersApi.create,
    onSuccess: async () => qc.invalidateQueries({ queryKey: ["customers"] }),
  });
}

export function useDeleteCustomer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: customersApi.remove,
    onSuccess: async () => qc.invalidateQueries({ queryKey: ["customers"] }),
  });
}
