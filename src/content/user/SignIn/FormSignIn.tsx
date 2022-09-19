import { useState } from 'react';
import {
 Button,
 Divider,
 FormControl,
 FormHelperText,
 FormLabel,
 Grid,
 IconButton,
 InputAdornment,
 OutlinedInput,
 Typography,
 Link
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from 'src/assets/images/icon_idx.jpeg';
import { useUsers } from 'src/services/users/useUsers';
import { IPayloadLogin } from 'src/models/userCredentials';

function validationSchema() {
 return Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required()
 });
}

const FormSignIn = () => {
 const { postUserSignin } = useUsers();
 const { handleChange, handleSubmit, errors, values, touched } =
  useFormik<IPayloadLogin>({
   initialValues: {
    username: '',
    password: ''
   },
   validationSchema: validationSchema(),
   onSubmit: (value) => {
    postUserSignin(value);
   }
  });

 const [showPassword, setShowPassword] = useState<boolean>(false);
 const handleClickShowPassword = (index) => {
  setShowPassword((prev) => !prev);
 };

 const handleMouseDownPassword = (
  event: React.MouseEvent<HTMLButtonElement>
 ) => {
  event.preventDefault();
 };

 return (
  <Box
   sx={{
    width: '536px'
   }}
  >
   <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
     <Grid item lg={12}>
      <img src={logo} alt={'Logo'} style={{ width: 30 * 8 }} />
     </Grid>
     <Grid item lg={12}>
      <Divider />
     </Grid>
     <Grid item lg={12}>
      <Typography variant="h1">Login</Typography>
     </Grid>

     <Grid item lg={12}>
      <FormControl fullWidth size="medium">
       <FormLabel>Username</FormLabel>
       <OutlinedInput
        name="username"
        onChange={handleChange}
        error={errors.username && touched.username}
        value={values.username}
       />
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
        {errors.username && touched.username && errors.username}
       </FormHelperText>
      </FormControl>
     </Grid>
     <Grid item lg={12}>
      <FormControl fullWidth size="medium">
       <FormLabel>Password</FormLabel>
       <OutlinedInput
        name="password"
        onChange={handleChange}
        error={errors.password && touched.password}
        value={values.password}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
         <InputAdornment position="end">
          <IconButton
           aria-label="toggle password visibility"
           onClick={() => handleClickShowPassword(0)}
           onMouseDown={handleMouseDownPassword}
           edge="end"
          >
           {showPassword[0] ? <VisibilityOff /> : <Visibility />}
          </IconButton>
         </InputAdornment>
        }
       />
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
        {errors.password && touched.password && errors.password}
       </FormHelperText>
      </FormControl>
     </Grid>
     <Grid item lg={12}>
      <Button
       variant="contained"
       color="primary"
       type="submit"
       size="large"
       sx={{
        mt: 2,
        px: 8
       }}
      >
       Sign In
      </Button>
     </Grid>
    </Grid>
   </form>
  </Box>
 );
};

export default FormSignIn;
