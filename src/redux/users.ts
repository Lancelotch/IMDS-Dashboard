import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'src/models/userCredentials';

interface IStoreUsers {
  user: IUser;
  isAuthenticated: boolean;
}
const token = window.localStorage.getItem('token');

const initialState: IStoreUsers = {
  user: {
    username: 'unknown',
    roleId: '',
    roleName: ''
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
    reducerUpdateUserProfile: (state: IStoreUsers, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },

  }
});

export const {
  reducerUpdateAuthentication,
  reducerUpdateUserProfile
} = usersStore.actions;

export default usersStore.reducer;
