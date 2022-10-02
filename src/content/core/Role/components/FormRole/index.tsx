import {
 Button,
 FormControl,
 FormHelperText,
 FormLabel,
 Grid,
 OutlinedInput,
 useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import { useAppSelector } from 'src/app/hooks';
import { useRole } from 'src/services/role/useRole';
import { FC, useEffect } from 'react';
import { IPayloadAddRole } from 'src/models/role';
import { useFirstRender } from 'src/hooks/useFirstRender';

interface Props {
 action: string;
 id?: string;
}

function validationSchema() {
 return Yup.object({
  roleName: Yup.string().required()
 });
}

const FormRole: FC<Props> = ({ action, id }) => {
 const { addRole, editRole } = useRole();
 const isFirstRender = useFirstRender();
 const {
  handleChange,
  handleSubmit,
  errors,
  values,
  touched,
  setFieldValue,
  resetForm
 } = useFormik<IPayloadAddRole>({
  initialValues: {
   roleName: ''
  },
  validationSchema: validationSchema(),
  onSubmit: async (value) => {
   if (action === 'create') {
    resetForm();
    addRole(value);
    return;
   }
   editRole(id, value);
  }
 });

 const theme = useTheme();
 const { getRoleById } = useRole();

 const { loading, roleById } = useAppSelector((store) => store.storeRole);

 useEffect(() => {
  if (action === 'edit' && id) {
   getRoleById(id);
  }
 }, [action, id]);

 useEffect(() => {
  if (isFirstRender) return;
  if (action === 'edit' && roleById) {
   setFieldValue('roleName', roleById.roleName);
  }
 }, [roleById]);

 return (
  <Box sx={{ mt: theme.spacing(2) }}>
   <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
     <Grid item lg={12}>
      <FormControl fullWidth size="medium">
       <FormLabel>Name</FormLabel>
       <OutlinedInput
        name="roleName"
        onChange={handleChange}
        error={errors.roleName && touched.roleName}
        value={values.roleName}
        fullWidth
        size="small"
        disabled={loading}
       />
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
        {errors.roleName && touched.roleName && errors.roleName}
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

export default FormRole;
