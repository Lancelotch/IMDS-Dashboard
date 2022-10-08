import { IResponseBody } from './general';

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
 qtyPackage: number;
 packages: Array<ICustomerPackage>;
}

export interface ICustomerPackage {
 customerId?: string;
 contractBegin: Date;
 contractEnd: Date;
 token?: string;
 packageId: string;
 packageName?: string;
 domain?: string;
 customerPackageId?: string;
}

export interface IResponseCustomerList extends IResponseBody<Array<ICustomer>> {
 totalPages: number;
 totalRow: number;
}

export interface IResponseCustomerById extends IResponseBody<ICustomer> {}
export interface IResponseAddCustomer extends IResponseBody<ICustomer> {}
export interface IResponseGenerateToken
 extends IResponseBody<ICustomerPackage> {}

export interface IPayloadAddCustomer {
 customerName: string;
 address: string;
 pic: string;
 phoneNumber: string;
 email: string;
 packages: Array<ICustomerPackage>;
}

export interface IPayloadGenerateToken {
 customerPackageId: string;
}
