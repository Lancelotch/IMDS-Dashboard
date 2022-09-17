import { Navigate, useRoutes } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { Alert, CssBaseline, Snackbar } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { useAppSelector } from './app/hooks';
import routes from 'src/router';
import { useAlert } from './hooks/useAlert';

function App() {
  const isAuthenticated = useAppSelector(
    (state) => state.storeUsers.isAuthenticated
  );

  const content = useRoutes(routes(isAuthenticated));
  const { handleCloseAlert } = useAlert();
  const stateAlert = useAppSelector((state) => state.storeAlert.alert);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
        <Snackbar
          anchorOrigin={{
            vertical: stateAlert.vertical,
            horizontal: stateAlert.horizontal
          }}
          open={stateAlert.open}
          onClose={handleCloseAlert}
          autoHideDuration={6000}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={stateAlert.severity}
            sx={{ width: '100%' }}
          >
            {stateAlert.message}
          </Alert>
        </Snackbar>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
