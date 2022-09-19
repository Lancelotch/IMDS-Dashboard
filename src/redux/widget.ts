import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponseWidgetList, IWidget } from 'src/models/widget';

interface IStore {
  widgetList: IResponseWidgetList;
}

const initialState: IStore = {
  widgetList: {
      data: [],
      message: '',
      status: '',
      statusCode: '',
      totalPages: 0,
      totalRow: 0,
      loading: false
    }
};

const widgetStore = createSlice({
  name: 'role',
  initialState,
  reducers: {
    reducerUpdateLoadingWidgetList: (state: IStore, action: PayloadAction<boolean>) => {
      state.widgetList.loading = action.payload;
    },
    reducerUpdateWidgetList: (state: IStore, action: PayloadAction<IResponseWidgetList>) => {
      state.widgetList = action.payload;
    },
    reducerUpdateAddWidget: (state: IStore, action: PayloadAction<IWidget>) => {
      state.widgetList.data = [...state.widgetList.data, action.payload];
    },
  }
});

export const {
  reducerUpdateLoadingWidgetList,
  reducerUpdateWidgetList,
  reducerUpdateAddWidget
} = widgetStore.actions;

export default widgetStore.reducer;
