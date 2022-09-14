import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IStoreUsers {
  isAuthenticated: boolean;
}
const token = window.localStorage.getItem('token');

const initialState: IStoreUsers = {
  isAuthenticated: token ? true : false
};

export const usersStore = createSlice({
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
