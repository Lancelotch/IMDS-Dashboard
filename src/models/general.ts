export interface IAction {
    type: string;
    payload: any;
}

export type Order = 'asc' | 'desc';

export interface ITableAtribute<T> {
  page: number;
  sortingMethod: Order;
  columnName: keyof T;
  limit: number;
}

export interface IResponseBody<T> {
  message: string;
  status: string;
  statusCode: string;
  loading?: boolean;
  data: T;
}

export interface IPayloadGetList {
  page: number;
  limit: number;
  dir?: string;
  sort?: "asc" | "desc";
  searchField?: string;
  searchValue?: string;
}

export interface IPayloadSort<T> {
  columnName: keyof T;
  sortingMethod: 'asc' | 'desc';
}

export interface IOptionSearchField {
  label: string;
  value: string;
 }