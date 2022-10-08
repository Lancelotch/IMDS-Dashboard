import { IResponseBody } from './general';

export type TTypePackage = 'widget' | 'streaming' | 'api' | 'messaging' | '';

export interface IProductPackage {
 packageId: string;
 productId: string;
 productName: string;
}
export interface IPackage {
 id: number;
 packageId: string;
 packageName: string;
 packageType: TTypePackage;
 createdAt: Date;
 createdBy: string;
 updatedAt: null | Date;
 updatedBy: null | string;
 isActive: number;
 qytProduct: number;
 products: Array<IProductPackage>;
}

export interface IPayloadAddPackage {
 packageName: string;
 packageType: TTypePackage;
 products: Array<IProductPackage>;
 //products: Array<{productId: string}>;
}

export interface IResponsePackageList extends IResponseBody<Array<IPackage>> {
 totalPages: number;
 totalRow: number;
}

export interface IResponsePackageById extends IResponseBody<IPackage> {}
export interface IResponseAddPackage extends IResponseBody<IPackage> {}
