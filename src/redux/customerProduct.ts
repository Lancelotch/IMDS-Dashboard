import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICustomerProduct, IResponseCustomerProductList } from 'src/models/customerProduct';

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
    reducerUpdateLoadingCustomerProduct: (state: IStore, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reducerUpdateCustomerProductList: (state: IStore, action: PayloadAction<IResponseCustomerProductList>) => {
      state.customerProductList = action.payload;
    },
    reducerUpdateAddCustomerProduct: (state: IStore, action: PayloadAction<ICustomerProduct>) => {
      state.customerProductList.data = [...state.customerProductList.data, action.payload];
    },
    reducerEditCustomerProduct: (state: IStore, action: PayloadAction<ICustomerProduct>) => {
      state.customerProductList.data = state.customerProductList.data.map(item=> {
        if(item.productId !== action.payload.productId) return item;
        return action.payload;
      });
    },
  }
});

export const {
  reducerUpdateLoadingCustomerProduct,
  reducerUpdateCustomerProductList,
  reducerUpdateAddCustomerProduct,
  reducerEditCustomerProduct
} = customerProductStore.actions;

export default customerProductStore.reducer;
