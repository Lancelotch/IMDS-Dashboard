import { IResponseBody } from "./general";

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

  export interface IResponseRoleList extends IResponseBody<Array<IRole>>{
    totalPages: number;
    totalRow: number;
  }
  export interface IResponseAddRole extends IResponseBody<IRole>{};

  export interface IPayloadAddRole {
    roleName: string;
  }