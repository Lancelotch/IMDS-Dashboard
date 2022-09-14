import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersStore from 'src/redux/users';
import roleStore from 'src/redux/role';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  reducer: {
    storeUsers: usersStore,
    storeRole: roleStore
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
