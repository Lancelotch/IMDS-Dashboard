import { IResponseBody } from "./general";

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

  export interface IResponseInternalUserList extends IResponseBody<Array<IInternalUser>>{
    totalPages: number;
    totalRow: number;
  }


  export interface IResponseAddInternalUser extends IResponseBody<IInternalUser>{};

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