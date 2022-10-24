import {
 Button,
 FormControl,
 FormHelperText,
 FormLabel,
 Grid,
 MenuItem,
 OutlinedInput,
 Select,
 useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import { useAppSelector } from 'src/app/hooks';
import { useRole } from 'src/services/role/useRole';
import { FC, useEffect } from 'react';
import { useInternalUser } from 'src/services/internal_user/useInternalUser';
import { useFirstRender } from 'src/hooks/useFirstRender';
import {
 IPayloadAddInternalUser,
 IPayloadChangePassword
} from 'src/models/internalUser';

interface Props {
 id?: string;
}

function validationSchema() {
 return Yup.object({
  password: Yup.string().required(),
  reTypePassword: Yup.string().oneOf(
   [Yup.ref('password'), null],
   'Passwords must match'
  )
 });
}

const FormResetPassword: FC<Props> = ({ id }) => {
 const { changePassword } = useInternalUser();
 const { loading } = useAppSelector((state) => state.storeInternalUser);

 const { handleChange, handleSubmit, errors, values, touched, resetForm } =
  useFormik<IPayloadChangePassword>({
   initialValues: {
    password: '',
    reTypePassword: ''
   },
   validationSchema: validationSchema(),
   onSubmit: async (value) => {
    changePassword(id, value);
    resetForm();
   }
  });

 const theme = useTheme();

 return (
  <Box sx={{ mt: theme.spacing(2) }}>
   <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
     <Grid item lg={12}>
      <FormControl fullWidth size="medium">
       <FormLabel>Password</FormLabel>
       <OutlinedInput
        name="password"
        onChange={handleChange}
        error={errors.password && touched.password}
        value={values.password}
        fullWidth
        size="small"
        autoComplete="new-password"
        inputProps={{
         type: 'password',
         autoComplete: 'new-password'
        }}
       />
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
        {errors.password && touched.password && errors.password}
       </FormHelperText>
      </FormControl>
     </Grid>
     <Grid item lg={12}>
      <FormControl fullWidth size="medium">
       <FormLabel>Re-Type Password</FormLabel>
       <OutlinedInput
        name="reTypePassword"
        onChange={handleChange}
        error={errors.reTypePassword && touched.reTypePassword}
        value={values.reTypePassword}
        fullWidth
        size="small"
        autoComplete="new-password"
        inputProps={{
         type: 'password',
         autoComplete: 'new-password'
        }}
       />
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
        {errors.reTypePassword &&
         touched.reTypePassword &&
         errors.reTypePassword}
       </FormHelperText>
      </FormControl>
     </Grid>
     <Grid item lg={12}>
      <Box
       sx={{
        display: 'flex',
        justifyContent: 'center'
       }}
      >
       <Button
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        sx={{
         mt: 2,
         px: 8
        }}
        disabled={loading}
       >
        Done
       </Button>
      </Box>
     </Grid>
    </Grid>
   </form>
  </Box>
 );
};

export default FormResetPassword;
