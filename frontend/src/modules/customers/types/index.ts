export type Customer = {
  id: number | string;
  code: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  status?: "active" | "inactive" | string;
  createdAt?: string;
  updatedAt?: string;
};

export type CustomerUpsertBody = {
  code: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  status?: string;
};
