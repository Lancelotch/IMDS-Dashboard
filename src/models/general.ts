export interface IAction {
    type: string;
    payload: any;
}

export type Order = 'asc' | 'desc';

export interface ITableAtribute {
  page: number;
  sortingMethod: Order;
  columnName: string;
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