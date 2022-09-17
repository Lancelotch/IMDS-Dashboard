import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICustomer, IResponseCustomerList } from 'src/models/general';

interface IStore {
  loading?: boolean;
  customerList: IResponseCustomerList;
}

const initialState: IStore = {
  loading: false,
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
    reducerUpdateLoadingCustomer: (state: IStore, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reducerUpdateCustomerList: (state: IStore, action: PayloadAction<IResponseCustomerList>) => {
      state.customerList = action.payload;
    },
    reducerUpdateAddCustomer: (state: IStore, action: PayloadAction<ICustomer>) => {
      state.customerList.data = [...state.customerList.data, action.payload];
    },
    reducerEditCustomer: (state: IStore, action: PayloadAction<ICustomer>) => {
      state.customerList.data = state.customerList.data.map(item=> {
        if(item.customerId !== action.payload.customerId) return item;
        return action.payload;
      });
    },
  }
});

export const {
  reducerUpdateLoadingCustomer,
  reducerUpdateCustomerList,
  reducerUpdateAddCustomer,
  reducerEditCustomer
} = customerStore.actions;

export default customerStore.reducer;
