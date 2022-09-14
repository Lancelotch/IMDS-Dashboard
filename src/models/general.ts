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
  id: number,
  customerId: string,
  customerName: string,
  address: string,
  pic: string,
  phoneNumber: string,
  email: string,
  createdAt: Date,
  createdBy: string,
  updatedAt: Date | null,
  updatedBy: string | null,
  isActive: boolean,
  quantityProduct: number
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
    id: string;
    roleId: string;
    roleName: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date | null;
    updatedBy: string | null;
    isActive: boolean;
  }

  export interface IPayloadAddRole {
    roleName: string;
  }
  
  export interface IPayloadAddCustomer {
    customerName: string,
    address: string,
    pic: string,
    phoneNumber: string,
    email: string
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
    loading?: boolean;
    data: T;
  }

  export interface IResponseLogin extends IResponseBody<IUser>{
    token: string;
  }

  export interface IResponseRoleList extends IResponseBody<Array<IRole>>{
    totalPages: number;
    totalRow: number;
  }
  
  export interface IResponseCustomerList extends IResponseBody<Array<ICustomer>>{
    totalPages: number;
    totalRow: number;
  }
  
  export interface IResponseAddRole extends IResponseBody<IRole>{};
  export interface IResponseAddCustomer extends IResponseBody<ICustomer>{};

  export interface IPayloadGetList {
    page: number;
    limit: number;
    dir?: string;
    sort?: "asc" | "desc";
    searchField?: string;
    searchValue?: string;
  }