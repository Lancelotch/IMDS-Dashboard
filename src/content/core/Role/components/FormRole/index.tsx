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
import { useAppDispatch } from 'src/app/hooks';
import { useState } from 'react';
import { IPayloadAddRole, IResponseAddRole } from 'src/models/general';
import httpClient from 'src/services';
import { reducerUpdateAddRole } from 'src/redux/role';

function validationSchema() {
  return Yup.object({
    roleName: Yup.string().required()
  });
}

const FormRole = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { handleChange, handleSubmit, errors, values, touched, setFieldValue } =
    useFormik<IPayloadAddRole>({
      initialValues: {
        roleName: ''
      },
      validationSchema: validationSchema(),
      onSubmit: async (value) => {
        setLoading(true);
        try {
          const response = await httpClient.post<IResponseAddRole>(
            '/role/create',
            value
          );
          if (response.status === 201) {
            dispatch(reducerUpdateAddRole(response.data.data));
          }
          setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      }
    });

  const theme = useTheme();

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
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
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
