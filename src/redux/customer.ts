import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICustomer, IResponseCustomerList } from 'src/models/general';

interface IStore {
  customerList: IResponseCustomerList;
}

const initialState: IStore = {
  customerList: {
      data: [],
      message: '',
      status: '',
      statusCode: '',
      totalPages: 0,
      totalRow: 0,
      loading: false
    }
};

const customerStore = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    reducerUpdateLoadingCustomerList: (state: IStore, action: PayloadAction<boolean>) => {
      state.customerList.loading = action.payload;
    },
    reducerUpdateCustomerList: (state: IStore, action: PayloadAction<IResponseCustomerList>) => {
      state.customerList = action.payload;
    },
    reducerUpdateAddCustomer: (state: IStore, action: PayloadAction<Array<ICustomer>>) => {
      state.customerList.data = [...state.customerList.data, ...action.payload];
    },
  }
});

export const {
  reducerUpdateLoadingCustomerList,
  reducerUpdateCustomerList,
  reducerUpdateAddCustomer
} = customerStore.actions;

export default customerStore.reducer;
