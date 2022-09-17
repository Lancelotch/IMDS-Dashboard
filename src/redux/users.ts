import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'src/models/general';

interface IStoreUsers {
  user: IUser;
  isAuthenticated: boolean;
}
const token = window.localStorage.getItem('token');

const initialState: IStoreUsers = {
  user: {
    username: 'unknown',
    roleId: ''
  },
  isAuthenticated: token ? true : false
};

const usersStore = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reducerUpdateAuthentication: (state: IStoreUsers, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  }
});

export const {
  reducerUpdateAuthentication,
} = usersStore.actions;

export default usersStore.reducer;
