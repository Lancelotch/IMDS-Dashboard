import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInternalUser, IResponseInternalUserList } from 'src/models/internalUser';

interface IStore {
  loading?: boolean;
  internalUserList: IResponseInternalUserList;
  internalUserById: IInternalUser;
}

const initialState: IStore = {
  loading: false,
  internalUserList: {
      data: [],
      message: '',
      status: '',
      statusCode: '',
      totalPages: 0,
      totalRow: 0,
      loading: false
    },
    internalUserById: undefined
};

const internalUserStore = createSlice({
  name: 'internal user',
  initialState,
  reducers: {
    reducerUpdateLoadingInternalUser: (state: IStore, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reducerUpdateInternalUserList: (state: IStore, action: PayloadAction<IResponseInternalUserList>) => {
      state.internalUserList = action.payload;
    },
    reducerUpdateAddInternalUser: (state: IStore, action: PayloadAction<IInternalUser>) => {
      state.internalUserList.data = [...state.internalUserList.data, action.payload];
    },
    reducerEditInternalUser: (state: IStore, action: PayloadAction<IInternalUser>) => {
      state.internalUserList.data = state.internalUserList.data.map(internalUser=> {
        if(internalUser.internalUserId !== action.payload.internalUserId) return internalUser;
        return action.payload;
      });
    },
    reducerUpdateInternalUserById: (state: IStore, action: PayloadAction<IInternalUser>) => {
      state.internalUserById = action.payload;
    },
  }
});

export const {
  reducerUpdateLoadingInternalUser,
  reducerUpdateInternalUserList,
  reducerUpdateAddInternalUser,
  reducerEditInternalUser,
  reducerUpdateInternalUserById
} = internalUserStore.actions;

export default internalUserStore.reducer;
