import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPackage, IResponsePackageList } from 'src/models/package';

interface IStore {
  loading?: boolean;
  packageList: IResponsePackageList;
  packageById: IPackage;
}

const initialState: IStore = {
  loading: false,
  packageList: {
      data: [],
      message: '',
      status: '',
      statusCode: '',
      totalPages: 0,
      totalRow: 0,
      loading: false
    },
    packageById: undefined
};

const PackageStore = createSlice({
  name: 'Package',
  initialState,
  reducers: {
    reducerUpdateLoadingPackage: (state: IStore, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reducerUpdatePackageList: (state: IStore, action: PayloadAction<IResponsePackageList>) => {
      state.packageList = action.payload;
    },
    reducerUpdateAddPackage: (state: IStore, action: PayloadAction<IPackage>) => {
      state.packageList.data = [...state.packageList.data, action.payload];
    },
    reducerEditPackage: (state: IStore, action: PayloadAction<IPackage>) => {
      state.packageList.data = state.packageList.data.map(item=> {
        if(item.packageId !== action.payload.packageId) return item;
        return action.payload;
      });
    },
    reducerUpdatePackageById: (state: IStore, action: PayloadAction<IPackage>) => {
      state.packageById = action.payload;
    },
  }
});

export const {
  reducerUpdateLoadingPackage,
  reducerUpdatePackageList,
  reducerUpdateAddPackage,
  reducerEditPackage,
  reducerUpdatePackageById
} = PackageStore.actions;

export default PackageStore.reducer;
