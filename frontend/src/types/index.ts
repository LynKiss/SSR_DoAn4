export type ApiError = {
  message: string;
  details?: unknown;
};

export type ApiResponse<T> = {
  data: T | null;
  meta: any | null;
  error: ApiError | null;
};

export type PaginatedMeta = {
  page: number;
  limit: number;
  total: number;
};
