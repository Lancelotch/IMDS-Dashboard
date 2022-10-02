import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponseRoleList, IRole } from 'src/models/role';

interface IStore {
  loading?: boolean;
  roleList: IResponseRoleList;
  roleById?: IRole;
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
  roleById: undefined
};

const roleStore = createSlice({
  name: 'role',
  initialState,
  reducers: {
    reducerUpdateLoadingRole: (state: IStore, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reducerUpdateRoleList: (state: IStore, action: PayloadAction<IResponseRoleList>) => {
      state.roleList = action.payload;
    },
    reducerUpdateAddRole: (state: IStore, action: PayloadAction<IRole>) => {
      state.roleList.data = [...state.roleList.data, action.payload];
    },
    reducerEditRole: (state: IStore, action: PayloadAction<IRole>) => {
      state.roleList.data = state.roleList.data.map(item=> {
        if(item.roleId !== action.payload.roleId) return item;
        return action.payload;
      });
    },
    reducerUpdateRoleById: (state: IStore, action: PayloadAction<IRole>) => {
      state.roleById = action.payload;
    },
  }
});

export const {
  reducerUpdateLoadingRole,
    reducerUpdateRoleList,
    reducerUpdateAddRole,
    reducerEditRole,
    reducerUpdateRoleById
} = roleStore.actions;

export default roleStore.reducer;
