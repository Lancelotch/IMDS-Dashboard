import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponseAddRole, IResponseRoleList, IRole } from 'src/models/general';

interface IStore {
  roleList: IResponseRoleList;
}

const initialState: IStore = {
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
    reducerUpdateLoadingRoleList: (state: IStore, action: PayloadAction<boolean>) => {
      state.roleList.loading = action.payload;
    },
    reducerUpdateRoleList: (state: IStore, action: PayloadAction<IResponseRoleList>) => {
      state.roleList = action.payload;
    },
    reducerUpdateAddRole: (state: IStore, action: PayloadAction<IRole>) => {
      state.roleList.data = [...state.roleList.data, action.payload];
    },
  }
});

export const {
  reducerUpdateLoadingRoleList,
    reducerUpdateRoleList,
    reducerUpdateAddRole
} = roleStore.actions;

export default roleStore.reducer;
