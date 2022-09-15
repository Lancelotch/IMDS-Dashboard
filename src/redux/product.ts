import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  IProduct, IResponseProductList} from 'src/models/general';

interface IStore {
  productList: IResponseProductList;
}

const initialState: IStore = {
  productList: {
      data: [],
      message: '',
      status: '',
      statusCode: '',
      totalPages: 0,
      totalRow: 0,
      loading: false
    }
};

const productStore = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reducerUpdateLoadingProductList: (state: IStore, action: PayloadAction<boolean>) => {
      state.productList.loading = action.payload;
    },
    reducerUpdateProductList: (state: IStore, action: PayloadAction<IResponseProductList>) => {
      state.productList = action.payload;
    },
    reducerUpdateAddProduct: (state: IStore, action: PayloadAction<IProduct>) => {
      state.productList.data = [...state.productList.data, action.payload];
    },
  }
});

export const {
  reducerUpdateLoadingProductList,
  reducerUpdateProductList,
  reducerUpdateAddProduct
} = productStore.actions;

export default productStore.reducer;
