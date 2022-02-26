export type Page<Type> = {
  data: Type[];
  page: number;
  pageSize: number;
  pageCount: number;
  totalItemCount: number;
};
