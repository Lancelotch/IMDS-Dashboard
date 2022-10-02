import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IResponseProductList } from 'src/models/product';

interface IStore {
  loading?: boolean;
  productList: IResponseProductList;
  productById: IProduct;
}

const initialState: IStore = {
  loading: false,
  productList: {
      data: [],
      message: '',
      status: '',
      statusCode: '',
      totalPages: 0,
      totalRow: 0,
      loading: false
    },
    productById: undefined
};

const productStore = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reducerUpdateLoadingProduct: (state: IStore, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reducerUpdateProductList: (state: IStore, action: PayloadAction<IResponseProductList>) => {
      state.productList = action.payload;
    },
    reducerUpdateAddProduct: (state: IStore, action: PayloadAction<IProduct>) => {
      state.productList.data = [...state.productList.data, action.payload];
    },
    reducerEditProduct: (state: IStore, action: PayloadAction<IProduct>) => {
      state.productList.data = state.productList.data.map(item=> {
        if(item.productId !== action.payload.productId) return item;
        return action.payload;
      });
    },
    reducerUpdateProductById: (state: IStore, action: PayloadAction<IProduct>) => {
      state.productById = action.payload;
    },
  }
});

export const {
  reducerUpdateLoadingProduct,
  reducerUpdateProductList,
  reducerUpdateAddProduct,
  reducerEditProduct,
  reducerUpdateProductById
} = productStore.actions;

export default productStore.reducer;
