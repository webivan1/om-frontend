export type ListParamsType<T> = {
  total: number;
  items: T[];
  currentPage: number;
  perPage: number;
};