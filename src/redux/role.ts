import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
 IMenu,
 IPayloadAddRoleMenu,
 IResponseMenuSideBarList,
 IResponseRoleList,
 IResponseRoleMenuList,
 IRole,
 IRoleMenuRecursive
} from 'src/models/role';

interface IStore {
 loading?: boolean;
 roleList: IResponseRoleList;
 roleById?: IRole;
 roleMenuList: IResponseRoleMenuList;
 roleMenuSideBarList: IResponseMenuSideBarList;
 roleMenu: IRoleMenuRecursive;
}

const initialState: IStore = {
 loading: false,
 roleList: {
  data: [],
  message: '',
  status: '',
  statusCode: '',
  totalPages: 0,
  totalRow: 0,
  loading: false
 },
 roleMenuList: {
  data: [],
  message: '',
  status: '',
  statusCode: ''
 },
 roleById: undefined,
 roleMenuSideBarList: {
  data: [],
  message: '',
  status: '',
  statusCode: ''
 },
 roleMenu: undefined
};

const roleStore = createSlice({
 name: 'role',
 initialState,
 reducers: {
  reducerUpdateLoadingRole: (state: IStore, action: PayloadAction<boolean>) => {
   state.loading = action.payload;
  },
  reducerUpdateRoleList: (
   state: IStore,
   action: PayloadAction<IResponseRoleList>
  ) => {
   state.roleList = action.payload;
  },
  reducerUpdateAddRole: (state: IStore, action: PayloadAction<IRole>) => {
   state.roleList.data = [...state.roleList.data, action.payload];
  },
  reducerEditRole: (state: IStore, action: PayloadAction<IRole>) => {
   state.roleList.data = state.roleList.data.map((item) => {
    if (item.roleId !== action.payload.roleId) return item;
    return action.payload;
   });
  },
  reducerUpdateRoleById: (state: IStore, action: PayloadAction<IRole>) => {
   state.roleById = action.payload;
  },
  reducerUpdateRoleMenuList: (
   state: IStore,
   action: PayloadAction<IResponseRoleMenuList>
  ) => {
   state.roleMenuList = action.payload;
  },
  reducerUpdateMenuSideBarList: (
   state: IStore,
   action: PayloadAction<IResponseMenuSideBarList>
  ) => {
   state.roleMenuSideBarList = action.payload;
  },
  reducerUpdateManageRoleMenu: (
   state: IStore,
   action: PayloadAction<IPayloadAddRoleMenu>
  ) => {
   state.roleMenuList.data = state.roleMenuList.data.map((role) => {
    if (role.menuId === action.payload.menus[0].menuId)
     return {
      ...role,
      ...action.payload.menus[0]
     };
    return role;
   });
  },
  reducerUpdateMenuRole: (
   state: IStore,
   action: PayloadAction<IRoleMenuRecursive>
  ) => {
   state.roleMenu = action.payload;
  }
 }
});

export const {
 reducerUpdateLoadingRole,
 reducerUpdateRoleList,
 reducerUpdateAddRole,
 reducerEditRole,
 reducerUpdateRoleById,
 reducerUpdateRoleMenuList,
 reducerUpdateMenuSideBarList,
 reducerUpdateManageRoleMenu,
 reducerUpdateMenuRole
} = roleStore.actions;

export default roleStore.reducer;
