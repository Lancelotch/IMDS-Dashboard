import { IResponseBody } from "./general";

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

  export interface IResponseCustomerProductList extends IResponseBody<Array<ICustomerProduct>>{
    totalPages: number;
    totalRow: number;
  }


  export interface IResponseAddCustomerProduct extends IResponseBody<ICustomerProduct>{};

  export interface IPayloadAddCustomerProduct {
    productId: string;
    customerId: string;
    startDate: Date;
    endDate: Date;
    username: string;
    password: string;
  }