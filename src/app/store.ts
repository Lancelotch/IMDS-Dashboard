import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersStore from 'src/redux/users';
import roleStore from 'src/redux/role';
import customerStore from 'src/redux/customer';
import productStore from 'src/redux/product';
import widgetStore from 'src/redux/widget';
import customerProductStore from 'src/redux/customerProduct';
import internalUserStore from 'src/redux/internalUser';
import topicStore from 'src/redux/topic';
import alertStore from 'src/redux/alert';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  reducer: {
    storeAlert: alertStore,
    storeUsers: usersStore,
    storeRole: roleStore,
    storeCustomer: customerStore,
    storeProduct: productStore,
    storeWidget: widgetStore,
    storeCustomerProduct: customerProductStore,
    storeInternalUser: internalUserStore,
    storeTopic: topicStore,
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
