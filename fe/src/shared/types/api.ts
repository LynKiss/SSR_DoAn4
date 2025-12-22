export type ApiResponse<T> = {
  data: T;
  meta?: any;
  error?: { message: string; details?: any } | null;
};
