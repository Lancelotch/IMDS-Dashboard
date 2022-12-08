import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponseCustomerWillBeExpiredList, ICustomerWillBeExpired } from 'src/models/customerWillBeExpired';

interface IStore {
  loading?: boolean;
  customerWillBeExpiredList: IResponseCustomerWillBeExpiredList;
  customerId: ICustomerWillBeExpired;
}

const initialState: IStore = {
  loading: false,
  customerWillBeExpiredList: {
    data: [],
    message: '',
    status: '',
    statusCode: '',
    totalPages: 0,
    totalRow: 0,
    loading: false
  },
  customerId: undefined
};

const customerWillBeExpiredStore = createSlice({
  name: 'customerWillBeExpired',
  initialState,
  reducers: {

    reducerUpdateLoadingCustomerWillBeExpired: (state: IStore, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  
    reducerUpdateCustomerWillBeExpiredList: (state: IStore, action: PayloadAction<IResponseCustomerWillBeExpiredList>) => {
      state.customerWillBeExpiredList = action.payload;
    },
   
    reducerUpdateCustomerWillBeExpiredById: (state: IStore, action: PayloadAction<ICustomerWillBeExpired>) => {
      state.customerId = action.payload;
    },
  }
});

export const {
    reducerUpdateCustomerWillBeExpiredList,
    reducerUpdateCustomerWillBeExpiredById,
    reducerUpdateLoadingCustomerWillBeExpired
} = customerWillBeExpiredStore.actions;

export default customerWillBeExpiredStore.reducer;
