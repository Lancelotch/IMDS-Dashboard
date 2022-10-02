import { IResponseBody } from "./general";

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

  export interface IPayloadAddProduct {
    productName: string,
    isStaging: boolean,
    type: TTypeProduct,
    widgetId: string,
    topic: string,
    apiUrl: string
  }

  export interface IResponseProductList extends IResponseBody<Array<IProduct>>{
    totalPages: number;
    totalRow: number;
  }


  export interface IResponseProductById extends IResponseBody<IProduct>{};
  export interface IResponseAddProduct extends IResponseBody<IProduct>{};