import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInternalUser, IResponseInternalUserList } from 'src/models/general';

interface IStore {
  loading?: boolean;
  internalUserList: IResponseInternalUserList;
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
    }
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
  }
});

export const {
  reducerUpdateLoadingInternalUser,
  reducerUpdateInternalUserList,
  reducerUpdateAddInternalUser
} = internalUserStore.actions;

export default internalUserStore.reducer;
