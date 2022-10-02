import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponseWidgetList, IWidget } from 'src/models/widget';

interface IStore {
  loading?: boolean;
  widgetList: IResponseWidgetList;
  widgetById: IWidget;
}

const initialState: IStore = {
  loading: false,
  widgetList: {
      data: [],
      message: '',
      status: '',
      statusCode: '',
      totalPages: 0,
      totalRow: 0,
      loading: false
    },
    widgetById: undefined
};

const widgetStore = createSlice({
  name: 'role',
  initialState,
  reducers: {
    reducerUpdateLoadingWidget: (state: IStore, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reducerUpdateLoadingWidgetList: (state: IStore, action: PayloadAction<boolean>) => {
      state.widgetList.loading = action.payload;
    },
    reducerUpdateWidgetList: (state: IStore, action: PayloadAction<IResponseWidgetList>) => {
      state.widgetList = action.payload;
    },
    reducerUpdateAddWidget: (state: IStore, action: PayloadAction<IWidget>) => {
      state.widgetList.data = [...state.widgetList.data, action.payload];
    },
    reducerUpdateWidgetById: (state: IStore, action: PayloadAction<IWidget>) => {
      state.widgetById = action.payload;
    },
  }
});

export const {
  reducerUpdateLoadingWidget,
  reducerUpdateLoadingWidgetList,
  reducerUpdateWidgetList,
  reducerUpdateAddWidget,
  reducerUpdateWidgetById
} = widgetStore.actions;

export default widgetStore.reducer;
