export interface Product {
  id: string;
  sku: string;
  name: string;
  unit?: string;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
  standardCost?: number;
  salePrice?: number;
  safetyStock?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface CreateProductInput {
  sku: string;
  name: string;
  unit?: string;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
  standardCost?: number;
  salePrice?: number;
  safetyStock?: number;
  status?: string;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  // id is not included in the input for updates
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}
