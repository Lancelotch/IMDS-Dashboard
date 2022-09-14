import { Navigate, useRoutes } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { useAppSelector } from './app/hooks';
import routes from 'src/router';

function App() {
  const isAuthenticated = useAppSelector(
    (state) => state.storeUsers.isAuthenticated
  );

  const content = useRoutes(routes(isAuthenticated));

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
