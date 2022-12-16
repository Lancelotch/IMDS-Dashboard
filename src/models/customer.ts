import { IResponseBody } from './general';

export type TCustomerCategory = 'Anggota Bursa' | 'Data Vendor' | 'SRO';


export interface ICustomer {
 id: number;
 customerId: string;
 customerName: string;
 address: string;
 pic: string;
 phoneNumber: string;
 customerCategory: string;
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
 id?: string;
 customerId?: string;
 contractBegin: Date;
 contractEnd: Date;
 token?: string;
 packageId: string;
 packageName?: string;
 domain?: string;
 customerPackageId?: string;
 isSuspend?: number;
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
 customerCategory:string,
 packages: Array<ICustomerPackage>;
 removedPackages?: Array<ICustomerPackage>;
}

export interface IPayloadGenerateToken {
 customerPackageId: string;
}
