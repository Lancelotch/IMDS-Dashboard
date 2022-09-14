import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRole } from 'src/models/general';

interface IStore {
  roleList: Array<IRole>;
}

const initialState: IStore = {
    roleList: []
};

export const usersStore = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reducerUpdateRoleList: (state: IStore, action: PayloadAction<Array<IRole>>) => {
      state.roleList = action.payload;
    },
  }
});

export const {
    reducerUpdateRoleList,
} = usersStore.actions;

export default usersStore.reducer;
