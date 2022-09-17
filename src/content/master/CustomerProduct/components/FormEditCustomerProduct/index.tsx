import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import { useAppSelector } from 'src/app/hooks';
import { FC, useEffect, useState } from 'react';
import {
  ICustomerProduct,
  IPayloadAddCustomerProduct
} from 'src/models/general';
import { useCustomerProduct } from 'src/services/customer_product/useCustomerProduct';
import { DesktopDatePicker } from '@mui/lab';
import { useProduct } from 'src/services/product/useProduct';
import { useCustomer } from 'src/services/customer/useCustomer';
import { useFirstRender } from 'src/hooks/useFirstRender';

interface Props {
  onClose: () => void;
  initFormValue?: ICustomerProduct;
}

function validationSchema() {
  return Yup.object({
    productId: Yup.string().required(),
    customerId: Yup.string().required(),
    startDate: Yup.date().required(),
    endDate: Yup.date().required(),
    username: Yup.string().required(),
    password: Yup.string().required()
  });
}

const FormEditCustomerProduct: FC<Props> = ({ onClose, initFormValue }) => {
  const { editCustomerProduct } = useCustomerProduct();
  const { getProductList } = useProduct();
  const { getCustomerList } = useCustomer();
  const isFirstRender = useFirstRender();
  const loading = useAppSelector((state) => state.storeCustomerProduct.loading);
  const productList = useAppSelector((state) => state.storeProduct.productList);
  const customerList = useAppSelector(
    (state) => state.storeCustomer.customerList
  );
  const { handleChange, handleSubmit, errors, values, touched, setFieldValue } =
    useFormik<IPayloadAddCustomerProduct>({
      initialValues: {
        productId: initFormValue.productId,
        customerId: initFormValue.customerId,
        startDate: initFormValue.startDate,
        endDate: initFormValue.endDate,
        username: initFormValue.username,
        password: ''
      },
      validationSchema: validationSchema(),
      onSubmit: async (value) => {
        editCustomerProduct(initFormValue.customerProductId, value);
      }
    });

  const theme = useTheme();

  useEffect(() => {
    getProductList({ page: 1, limit: 1000 });
    getCustomerList({ page: 1, limit: 1000 });
  }, []);

  useEffect(() => {
    if (isFirstRender) return;
    if (!loading) onClose();
  }, [loading]);

  return (
    <Box sx={{ mt: theme.spacing(2) }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Product</FormLabel>
              <Select
                value={values.productId}
                onChange={handleChange}
                size="small"
                name="productId"
              >
                {productList.data.map((product) => (
                  <MenuItem key={product.id} value={product.productId}>
                    {product.productName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.productId && touched.productId && errors.productId}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Username</FormLabel>
              <OutlinedInput
                name="username"
                onChange={handleChange}
                error={errors.username && touched.username}
                value={values.username}
                fullWidth
                size="small"
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.username && touched.username && errors.username}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Customer</FormLabel>
              <Select
                value={values.customerId}
                onChange={handleChange}
                size="small"
                name="customerId"
              >
                {customerList.data.map((customer) => (
                  <MenuItem key={customer.id} value={customer.customerName}>
                    {customer.customerName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.customerId && touched.customerId && errors.customerId}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
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
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.password && touched.password && errors.password}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Start Date</FormLabel>
              <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={values.startDate}
                onChange={(newValue: Date | null) => {
                  setFieldValue('startDate', newValue);
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.startDate && touched.startDate && errors.startDate}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>End Date</FormLabel>
              <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={values.endDate}
                onChange={(newValue: Date | null) => {
                  setFieldValue('endDate', newValue);
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.endDate && touched.endDate && errors.endDate}
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

export default FormEditCustomerProduct;
