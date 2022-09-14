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
import { IPayloadAddCustomer, IResponseAddCustomer } from 'src/models/general';
import httpClient from 'src/services';
import { reducerUpdateAddCustomer } from 'src/redux/customer';

function validationSchema() {
  return Yup.object({
    customerName: Yup.string().required(),
    address: Yup.string(),
    pic: Yup.string(),
    phoneNumber: Yup.string(),
    email: Yup.string().email().required()
  });
}

const FormCustomer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { handleChange, handleSubmit, errors, values, touched } =
    useFormik<IPayloadAddCustomer>({
      initialValues: {
        customerName: '',
        address: '',
        email: '',
        phoneNumber: '',
        pic: ''
      },
      validationSchema: validationSchema(),
      onSubmit: async (value) => {
        setLoading(true);
        try {
          const response = await httpClient.post<IResponseAddCustomer>(
            '/customer/create',
            value
          );
          if (response.status === 200) {
            dispatch(reducerUpdateAddCustomer(response.data.data));
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
        <Grid container spacing={1}>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Customer Name</FormLabel>
              <OutlinedInput
                name="customerName"
                onChange={handleChange}
                error={errors.customerName && touched.customerName}
                value={values.customerName}
                fullWidth
                size="small"
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.customerName &&
                  touched.customerName &&
                  errors.customerName}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Phone Number</FormLabel>
              <OutlinedInput
                name="phoneNumber"
                onChange={handleChange}
                error={errors.phoneNumber && touched.phoneNumber}
                value={values.phoneNumber}
                fullWidth
                size="small"
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.phoneNumber &&
                  touched.phoneNumber &&
                  errors.phoneNumber}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Email</FormLabel>
              <OutlinedInput
                name="email"
                onChange={handleChange}
                error={errors.email && touched.email}
                value={values.email}
                fullWidth
                size="small"
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.email && touched.email && errors.email}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>PIC</FormLabel>
              <OutlinedInput
                name="pic"
                onChange={handleChange}
                error={errors.pic && touched.pic}
                value={values.pic}
                fullWidth
                size="small"
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.pic && touched.pic && errors.pic}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={12}>
            <FormControl fullWidth size="medium">
              <FormLabel>Address</FormLabel>
              <OutlinedInput
                name="address"
                onChange={handleChange}
                error={errors.address && touched.address}
                value={values.address}
                fullWidth
                size="small"
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.address && touched.address && errors.address}
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

export default FormCustomer;
