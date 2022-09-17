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

export interface IUser {
  username: string;
  roleId: string;
}

export interface ICustomer {
  id: number;
  customerId: string;
  customerName: string;
  address: string;
  pic: string;
  phoneNumber: string;
  email: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date | null;
  updatedBy: string | null;
  isActive: number;
  quantityProduct: number;
  }
  
  export interface IInternalUser {
    id: number;
    internalUserId: string;
    username: string;
    firstName: string;
    lastName: string;
    roleId: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: null | Date;
    updatedBy: null | string;
    isActive: number;
    isSuspend: boolean;
    roleName: string;
  }

  export interface ICustomerProduct {
    id: string;
    username: string;
    startDate: Date;
    endDate: Date;
    customerProductId: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    isActive: number;
    customerName: string;
    customerId: string;
    productName: string;
    productId: string;
  }

  export type TTypeProduct = 'widget' | 'streaming' | 'api';

  export interface IProduct {
    id: number;
    productId: string;
    productName: string;
    isStaging: number;
    type: TTypeProduct;
    widgetId: string;
    topic: null | string;
    apiUrl: null | string;
    widgetName: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: null | Date;
    updatedBy: null | string;
    isActive: number;
    typeValue: string;
  }

  export interface IRole {
    id: string;
    roleId: string;
    roleName: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date | null;
    updatedBy: string | null;
    isActive: number;
  }

  export interface IWidget {
    id: number;
    widgetId: string;
    widgetName: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: null | string;
    updatedBy: null | string;
    isActive: number;
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

  export interface IPayloadAddProduct {
    productName: string,
    isStaging: boolean,
    type: TTypeProduct,
    widgetId: string,
    topic: string,
    apiUrl: string
  }

  export interface IPayloadAddInternalUser {
    username: string;
    firstName: string;
    lastName: string;
    roleId: string;
    password: string;
  }

  export interface IPayloadEditInternalUser {
    username: string;
    firstName: string;
    lastName: string;
    roleId: string;
  }

  export interface IPayloadLogin {
    username: string,
    password: string
  }

  export interface IPayloadAddWidget {
    widgetName: string;
  }
  
  export interface IPayloadAddCustomerProduct {
    productId: string;
    customerId: string;
    startDate: Date;
    endDate: Date;
    username: string;
    password: string;
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

  export interface IResponseProductList extends IResponseBody<Array<IProduct>>{
    totalPages: number;
    totalRow: number;
  }

  export interface IResponseWidgetList extends IResponseBody<Array<IWidget>>{
    totalPages: number;
    totalRow: number;
  }

  export interface IResponseCustomerProductList extends IResponseBody<Array<ICustomerProduct>>{
    totalPages: number;
    totalRow: number;
  }

  export interface IResponseInternalUserList extends IResponseBody<Array<IInternalUser>>{
    totalPages: number;
    totalRow: number;
  }
  
  export interface IResponseAddRole extends IResponseBody<IRole>{};
  export interface IResponseAddCustomer extends IResponseBody<ICustomer>{};
  export interface IResponseAddProduct extends IResponseBody<IProduct>{};
  export interface IResponseAddWidget extends IResponseBody<IWidget>{};
  export interface IResponseAddCustomerProduct extends IResponseBody<ICustomerProduct>{};
  export interface IResponseAddInternalUser extends IResponseBody<IInternalUser>{};

  export interface IPayloadGetList {
    page: number;
    limit: number;
    dir?: string;
    sort?: "asc" | "desc";
    searchField?: string;
    searchValue?: string;
  }