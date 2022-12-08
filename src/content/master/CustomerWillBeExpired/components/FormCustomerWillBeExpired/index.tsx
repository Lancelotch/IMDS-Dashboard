import {
 Button,
 FormControl,
 FormHelperText,
 FormLabel,
 Select,
 MenuItem,
 Grid,
 OutlinedInput,
 useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import { useAppSelector } from 'src/app/hooks';
import { useCustomerWillBeExpired } from 'src/services/customer_will_be_expired/useCustomerWillBeExpired';
import { FC, useEffect } from 'react';
import { useFirstRender } from 'src/hooks/useFirstRender';
import { IPayloadAddCustomerWillBeExpired ,TDataSource} from 'src/models/customerWillBeExpired';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';

interface Props {
 action: string;
 id?: string;
}

function validationSchema() {
 return Yup.object({
  customerName: Yup.string().required(),
  dataSource: Yup.string().required(),
 });
}


const types: Array<TDataSource> = ['data_source_mongo_1' , 'data_source_mongo_2' , 'data_source_mongo_3' , 'data_source_mongo_4'];

const FormCustomerWillBeExpired: FC<Props> = ({ action, id }) => {
 const {  getCustomerWillBeExpiredById } = useCustomerWillBeExpired();

 const {
  handleChange,
  handleSubmit,
  errors,
  values,
  touched,
  setFieldValue,
  resetForm
 } = useFormik<IPayloadAddCustomerWillBeExpired>({
  initialValues: {
   customerName: ''
  },
  validationSchema: validationSchema(),
  onSubmit: async (value) => {
   if (action === 'create') {
    resetForm();
   // addCustomerWillBeExpired(value);
    return;
   }
   //editCustomerWillBeExpired(id, value);
  }
 });

 const theme = useTheme();


 const isFirstRender = useFirstRender();
 const { loading, customerId } = useAppSelector((store) => store.storeCustomerWillBeExpired);
 useEffect(() => {
  if (action === 'edit' && id) {
   getCustomerWillBeExpiredById(id);
  }
 }, [action, id]);

 useEffect(() => {
  if (isFirstRender) return;
  if (action === 'edit' && customerId) {
   setFieldValue('customerName', customerId.customerName);
  }
 }, [customerId]);

 return (
  <Box sx={{ mt: theme.spacing(2) }}>
   <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
     <Grid item lg={12}>
      <FormControl fullWidth size="medium">
       <FormLabel>Name</FormLabel>
       <OutlinedInput
        name="customerName"
        onChange={handleChange}
        error={errors.customerName && touched.customerName}
        value={values.customerName}
        fullWidth
        size="small"
       />
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
        {errors.customerName && touched.customerName && errors.customerName}
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

export default FormCustomerWillBeExpired;
