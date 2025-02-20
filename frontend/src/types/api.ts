import type { PaginationLinks, PaginationMeta } from "./pagination"

export type PaginatedResponse<T> = {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export type ApiResponse<T> = {
  data: T;
  status: number;
  error: undefined;
}

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
