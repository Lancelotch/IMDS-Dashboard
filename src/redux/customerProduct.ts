import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICustomerProduct, IResponseCustomerProductList } from 'src/models/general';

interface IStore {
  loading?: boolean;
  customerProductList: IResponseCustomerProductList;
}

const initialState: IStore = {
  loading: false,
  customerProductList: {
      data: [],
      message: '',
      status: '',
      statusCode: '',
      totalPages: 0,
      totalRow: 0,
      loading: false
    }
};

const customerProductStore = createSlice({
  name: 'customerProduct',
  initialState,
  reducers: {
    reducerUpdateLoadingCustomerProductList: (state: IStore, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reducerUpdateCustomerProductList: (state: IStore, action: PayloadAction<IResponseCustomerProductList>) => {
      state.customerProductList = action.payload;
    },
    reducerUpdateAddCustomerProduct: (state: IStore, action: PayloadAction<Array<ICustomerProduct>>) => {
      state.customerProductList.data = [...state.customerProductList.data, ...action.payload];
    },
  }
});

export const {
  reducerUpdateLoadingCustomerProductList,
  reducerUpdateCustomerProductList,
  reducerUpdateAddCustomerProduct
} = customerProductStore.actions;

export default customerProductStore.reducer;
