import { Grid, Paper, Box } from '@mui/material';
import Cover from 'src/assets/images/cover-sign_in.jpeg';
import CssBaseline from '@mui/material/CssBaseline';
import FormSignIn from './FormSignIn';

const SignIn = () => {
  return (
    <>
      <CssBaseline />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              pt: 4,
              pr: 10,
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%'
            }}
          >
            <FormSignIn />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          sx={{
            backgroundImage: `url(${Cover})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </Grid>
    </>
  );
};

export default SignIn;
