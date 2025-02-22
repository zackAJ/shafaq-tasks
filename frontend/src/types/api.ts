import type { PaginationLinks, PaginationMeta } from "./pagination"

export type PaginatedResponse<T> = {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
  status: number;
  error: undefined;
}

export type NormalResponse<T> = {
  data: T;
  status: number;
  error: undefined;
}

export type ApiResponse<T> = NormalResponse<T> | PaginatedResponse<T>

export type ApiError = {
  data: undefined;
  status: number;
  error: Error;
}

export type ApiCallOptions<T> = {
  method: "get" | "post" | "put" | "delete";
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
  withLoading?: boolean;
  onSuccess?: (data: T, status: number) => void;
  onFailure?: (e: any) => void;
  onFinally?: () => void;
};
