export type PaginationMetaLink = {
  url: string | null;
  label: string;
  active: boolean;
}

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationMetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export type Pagination = null | {
  links: PaginationLinks;
  meta: PaginationMeta;
}
