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

export interface ICustomer {
    customerName: string,
    address: string,
    pic: string,
    phoneNumber: string,
    email: string
  }
  
  export interface IInternalUser {
    username: string,
    firstName: string,
    lastName: string,
    roleId: string,
    password: string
  }

  export type TTypeProduct = 'widget' | 'streaming' | 'api';

  export interface IProduct {
    productName: string,
    isStaging: true,
    type: TTypeProduct,
    widgetId: string,
    topic: string,
    delay: string,
    apiUrl: string
  }

  export interface IRole {
    roleName: string
  }

  export interface IPayloadLogin {
    username: string,
    password: string
  }

  export interface IUser {
    username: string;
    roleId: string;
  }

  export interface IResponseBody<T> {
    message: string;
    status: string;
    statusCode: string;
    data: T;
  }

  export interface IResponseLogin extends IResponseBody<IUser>{
    token: string;
  }

  export interface IPayloadGetList {
    page: number;
    limit: number;
    dir?: string;
    sort?: "asc" | "desc";
    searchField?: string;
    searchValue?: string;
  }