import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponseTopicList, ITopic } from 'src/models/topic';

interface IStore {
  loading?: boolean;
  topicList: IResponseTopicList;
  topicById: ITopic;
}

const initialState: IStore = {
  loading: false,
  topicList: {
    data: [],
    message: '',
    status: '',
    statusCode: '',
    totalPages: 0,
    totalRow: 0,
    loading: false
  },
  topicById: undefined
};

const topicStore = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    reducerUpdateLoadingTopic: (state: IStore, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reducerUpdateTopicList: (state: IStore, action: PayloadAction<IResponseTopicList>) => {
      state.topicList = action.payload;
    },
    reducerUpdateAddTopic: (state: IStore, action: PayloadAction<ITopic>) => {
      state.topicList.data = [...state.topicList.data, action.payload];
    },
    reducerEditTopic: (state: IStore, action: PayloadAction<ITopic>) => {
      state.topicList.data = state.topicList.data.map(item=> {
        if(item.topicId !== action.payload.topicId) return item;
        return action.payload;
      });
    },
    reducerUpdateTopicById: (state: IStore, action: PayloadAction<ITopic>) => {
      state.topicById = action.payload;
    },
  }
});

export const {
  reducerUpdateLoadingTopic,
    reducerUpdateTopicList,
    reducerUpdateAddTopic,
    reducerEditTopic,
    reducerUpdateTopicById
} = topicStore.actions;

export default topicStore.reducer;
