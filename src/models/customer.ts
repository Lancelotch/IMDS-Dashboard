import { IResponseBody } from "./general";

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

    export interface IResponseCustomerList extends IResponseBody<Array<ICustomer>>{
        totalPages: number;
        totalRow: number;
      }


  export interface IResponseAddCustomer extends IResponseBody<ICustomer>{};

  export interface IPayloadAddCustomer {
    customerName: string,
    address: string,
    pic: string,
    phoneNumber: string,
    email: string
  }
