import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponseAddRole, IResponseRoleList, IRole } from 'src/models/general';

interface IStore {
  loading?: boolean;
  roleList: IResponseRoleList;
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
  }
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
  }
});

export const {
  reducerUpdateLoadingRole,
    reducerUpdateRoleList,
    reducerUpdateAddRole,
    reducerEditRole
} = roleStore.actions;

export default roleStore.reducer;
