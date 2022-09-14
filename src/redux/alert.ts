import { AlertColor, SnackbarOrigin } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TTopNotificationColor = 'info' | 'warning' | 'danger';

interface IAlert extends SnackbarOrigin {
  open: boolean;
  message?: string;
  severity?: AlertColor;
}

export interface ITopNotification {
  open?: boolean;
  message: string;
  severity: AlertColor;
  showCloseButton: boolean;
}

interface IState {
  alert: IAlert;
  topNotification: ITopNotification;
}

const initialState: IState = {
  alert: {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
    severity: 'success'
  },
  topNotification: {
    open: false,
    message: '',
    severity: 'info',
    showCloseButton: true
  }
};

export const alert = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    reducerUpdateAlert: (state: IState, action: PayloadAction<IAlert>) => {
      state.alert = action.payload;
    },
    reducerUpdateOpenAlert: (state: IState, action: PayloadAction<boolean>) => {
      state.alert.open = action.payload;
    },
    reducerUpdateTopNotification: (
      state: IState,
      action: PayloadAction<ITopNotification>
    ) => {
      state.topNotification = action.payload;
    },
    reducerUpdateOpenTopNotification: (
      state: IState,
      action: PayloadAction<boolean>
    ) => {
      state.topNotification.open = action.payload;
    }
  }
});

export const {
  reducerUpdateAlert,
  reducerUpdateOpenAlert,
  reducerUpdateTopNotification,
  reducerUpdateOpenTopNotification
} = alert.actions;

export default alert.reducer;
