import { IResponseBody } from './general';

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

export interface IResponseRoleList extends IResponseBody<Array<IRole>> {
 totalPages: number;
 totalRow: number;
}

export interface IResponseRole extends IResponseBody<IRole> {}

export interface IResponseAddRole extends IResponseBody<IRole> {}

export interface IPayloadAddRole {
 roleName: string;
}

export interface IRoleMenu {
 id: number | string;
 menuId: string;
 menuName: string;
 url: string;
 menuHeadId: null;
 isDelete: number;
 isUpdate: number;
 isCreate: number;
 isRead: number;
 isDownload: number;
 children?: Array<IRoleMenu>;
}

export interface IRoleMenuRecursive {
 id: number | string;
 menuId: string;
 menuName: string;
 url: string;
 menuHeadId: null;
 isDelete: number;
 isUpdate: number;
 isCreate: number;
 isRead: number;
 isDownload: number;
 children?: Array<IRoleMenu>;
}

export interface IResponseRoleMenuList
 extends IResponseBody<Array<IRoleMenu>> {}

export interface IResponseAddRoleMenu extends IResponseBody<IRoleMenu> {}

export interface IMenu {
 menuId: string;
 isUpdate: number;
 isDelete: number;
 isCreate: number;
 isRead: number;
 isDownload: number;
}

export interface IPayloadAddRoleMenu {
 roleId: string;
 menus: Array<IRoleMenu>;
}

export interface IResponseMenuSideBarList
 extends IResponseBody<Array<IRoleMenuRecursive>> {}

export interface IPayloadRoleMenuList {
 roleId: string;
}
