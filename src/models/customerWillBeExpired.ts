import { IResponseBody } from "./general";

export type TDataSource = 'data_source_mongo_1' | 'data_source_mongo_2' | 'data_source_mongo_3' | 'data_source_mongo_4';

export interface ICustomerWillBeExpired {
    id: number;
    customerId: string;
    customerPackageId: string;
    customerName:string,
    pic:string,
    email:string,
    phoneNumber:string,
    packageName:Date,
    contractBegin:Date,
    contractEnd: Date;
    isActive: number;
  }

  export interface IResponseCustomerWillBeExpiredList extends IResponseBody<Array<ICustomerWillBeExpired>>{
    totalPages: number;
    totalRow: number;
  }

  export interface IResponseCustomerWillBeExpiredById extends IResponseBody<ICustomerWillBeExpired>{};
  export interface IResponseAddCustomerWillBeExpired extends IResponseBody<ICustomerWillBeExpired>{};
  
  export interface IPayloadAddCustomerWillBeExpired {
    customerName: string;
  }
  