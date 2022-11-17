import {
 Button,
 FormControl,
 FormHelperText,
 FormLabel,
 Grid,
 IconButton,
 Modal,
 OutlinedInput,
 Paper,
 Stack,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 TextField,
 Tooltip,
 Typography,
 useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import { useAppSelector } from 'src/app/hooks';
import { FC, useEffect, useMemo, useState } from 'react';
import { useFirstRender } from 'src/hooks/useFirstRender';
import { useCustomer } from 'src/services/customer/useCustomer';
import { ICustomerPackage, IPayloadAddCustomer } from 'src/models/customer';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { filter, indexOf } from 'lodash';
import { usePackage } from 'src/services/package/usePackage';
import { DesktopDatePicker } from '@mui/lab';
import CopyToClipboard from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAlert } from 'src/hooks/useAlert';
import Confirmation from 'src/components/Confirmation';

interface Props {
 action: string;
 id?: string;
}

const style = {
 position: 'absolute' as 'absolute',
 top: '50%',
 left: '50%',
 transform: 'translate(-50%, -50%)',
 width: '50vw',
 bgcolor: 'background.paper',
 border: `1px solid rgba(224, 224, 224, 1)`,
 boxShadow: 24,
 p: 4,
 height: 400
};

export function CustomFooterComponent(props: { onOk: () => void }) {
 return (
  <Box
   sx={{
    p: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    borderTop: '1px solid rgba(224, 224, 224, 1)'
   }}
  >
   <Button variant="contained" onClick={props.onOk}>
    OK
   </Button>
  </Box>
 );
}

function validationSchema() {
 return Yup.object({
  customerName: Yup.string().required(),
  address: Yup.string(),
  pic: Yup.string(),
  phoneNumber: Yup.string(),
  email: Yup.string().email().required(),
  packages: Yup.array().required()
 });
}

const FormCustomer: FC<Props> = ({ action, id }) => {
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
 const [field, setField] = useState<ICustomerPackage>();
 const { addCustomer, editCustomer, getCustomerById, generateToken } =
  useCustomer();
 const { handleClickAlert } = useAlert();
 const { getPackageList } = usePackage();
 const packageList = useAppSelector((store) => store.storePackage.packageList);
 const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
 const {
  handleChange,
  handleSubmit,
  errors,
  values,
  touched,
  setFieldValue,
  resetForm
 } = useFormik<IPayloadAddCustomer>({
  initialValues: {
   customerName: '',
   address: '',
   email: '',
   phoneNumber: '',
   pic: '',
   packages: [],
   removedPackages: []
  },
  validationSchema: validationSchema(),
  onSubmit: async (value) => {
   console.log(value);
   if (action === 'create') {
    //resetForm();
    addCustomer(value);
    return;
   }
   editCustomer(id, value);
  }
 });

 const theme = useTheme();

 const isFirstRender = useFirstRender();
 const { loading, customerById } = useAppSelector(
  (store) => store.storeCustomer
 );

 useEffect(() => {
  if (action === 'edit' && id) {
   getCustomerById(id);
  }
 }, [action, id]);

 useEffect(() => {
  if (isFirstRender) return;
  if (action === 'edit' && customerById) {
   setFieldValue('customerName', customerById.customerName);
   setFieldValue('address', customerById.address);
   setFieldValue('email', customerById.email);
   setFieldValue('phoneNumber', customerById.phoneNumber);
   setFieldValue('pic', customerById.pic);
   setFieldValue('packages', customerById.packages);
   const packagesId = customerById.packages.map((pkg) => pkg.packageId);
   setSelectionModel(packagesId);
  }
 }, [customerById]);

 useEffect(() => {
  const packagesId = values.packages.map((pkg) => pkg.packageId);
  setSelectionModel(packagesId);
 }, [values.packages]);

 useEffect(() => {
  getPackageList({
   page: 1,
   limit: 1000
  });
 }, []);

 const handleClickDelete = function (packageSelected: ICustomerPackage) {
  if (action === 'edit') {
   setField(packageSelected);
   setOpenConfirmation(true);
   return;
  }
  const filter = values.packages.filter(
   (pkg) => pkg.packageId != packageSelected.packageId
  );
  setFieldValue('packages', filter);
 };

 const handleOkDelete = function () {
  const filter = values.packages.filter(
   (pkg) => pkg.packageId != field.packageId
  );
  setFieldValue('packages', filter);
  setFieldValue('removedPackages', [...values.removedPackages, field]);
 };

 const handleClickGenerateToken = function (customerPackageId: string) {
  generateToken({ customerPackageId });
 };

 const onOk = function () {
  handleClose();
  const filterPackageByArrayId = filter(
   packageList.data,
   (v) => indexOf(selectionModel, v.packageId) !== -1
  );

  const filterRemoveByArrayId = filter(
   customerById.packages,
   (v) =>
    indexOf(
     values.removedPackages.map((remove) => remove.packageId),
     v.packageId
    ) === -1
  );

  if (action === 'create') {
   setFieldValue('packages', filterPackageByArrayId);
   return;
  }

  setFieldValue('packages', [
   ...filterRemoveByArrayId,
   ...filterPackageByArrayId
  ]);
 };

 const filterSelectPackage = useMemo(() => {
  if (isFirstRender && action !== 'edit') return;
  return packageList
   ? packageList.data.filter(
      (pkg) =>
       indexOf(
        customerById.packages.map((p) => p.packageId),
        pkg.packageId
       ) === -1
     )
   : [];
 }, [customerById]);

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
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
        {errors.customerName && touched.customerName && errors.customerName}
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
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
        {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
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
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
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
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
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
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
        {errors.address && touched.address && errors.address}
       </FormHelperText>
      </FormControl>
     </Grid>
     <Grid item lg={12}>
      <Button onClick={handleOpen} variant="outlined">
       Add Package
      </Button>
     </Grid>

     <Grid item lg={12}>
      <TableContainer component={Paper}>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
         <TableRow>
          <TableCell align="center">Action</TableCell>
          <TableCell>Package</TableCell>
          <TableCell>Domain</TableCell>
          <TableCell align="center">Contract Begin</TableCell>
          <TableCell align="center">Contract End</TableCell>
          {action === 'edit' && (
           <>
            <TableCell align="center">Token</TableCell>
           </>
          )}
         </TableRow>
        </TableHead>
        <TableBody>
         {values.packages.map((pkg, idx) => (
          <TableRow
           key={pkg.packageId}
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
           <TableCell align="center">
            <Tooltip title="Delete Package" arrow>
             <IconButton
              sx={{
               '&:hover': {
                background: theme.colors.error.lighter
               },
               color: theme.palette.error.main
              }}
              color="inherit"
              size="small"
              onClick={() => handleClickDelete(pkg)}
             >
              <DeleteTwoToneIcon fontSize="small" />
             </IconButton>
            </Tooltip>
           </TableCell>
           <TableCell align="left">{pkg.packageName}</TableCell>
           <TableCell align="left">
            <OutlinedInput
             name={`packages[${idx}].domain`}
             onChange={handleChange}
             value={values.packages[idx].domain}
             fullWidth
             size="small"
            />
           </TableCell>
           <TableCell align="center">
            <DesktopDatePicker
             inputFormat="MM/dd/yyyy"
             value={values.packages[idx].contractBegin}
             onChange={(value) =>
              setFieldValue(`packages[${idx}].contractBegin`, value, true)
             }
             renderInput={(params) => (
              <TextField
               {...params}
               size="small"
               sx={{
                svg: { padding: '0px' }
               }}
              />
             )}
            />
           </TableCell>
           <TableCell align="center">
            <DesktopDatePicker
             inputFormat="MM/dd/yyyy"
             value={values.packages[idx].contractEnd}
             onChange={(value) =>
              setFieldValue(`packages[${idx}].contractEnd`, value, true)
             }
             renderInput={(params) => (
              <TextField
               {...params}
               size="small"
               sx={{
                svg: { padding: '0px' }
               }}
              />
             )}
            />
           </TableCell>
           {action === 'edit' && (
            <>
             <TableCell align="center">
              {pkg.token ? (
               <CopyToClipboard
                text={pkg.token}
                onCopy={() => {
                 handleClickAlert({
                  horizontal: 'center',
                  vertical: 'top',
                  message: 'Token has successfully copied!',
                  severity: 'success'
                 });
                }}
               >
                <Stack direction="row" spacing={2} alignItems="center">
                 <Box
                  sx={{
                   width: theme.spacing(20),
                   overflow: 'hidden',
                   textOverflow: 'ellipsis'
                  }}
                 >
                  {pkg.token}
                 </Box>
                 <Tooltip title="Copy Token" arrow>
                  <IconButton size="small">
                   <ContentCopyIcon />
                  </IconButton>
                 </Tooltip>
                </Stack>
               </CopyToClipboard>
              ) : (
               <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() =>
                 handleClickGenerateToken(
                  values.packages[idx].customerPackageId
                 )
                }
                disabled={loading || !values.packages[idx]?.customerPackageId}
               >
                Generate
               </Button>
              )}
             </TableCell>
            </>
           )}
          </TableRow>
         ))}
        </TableBody>
       </Table>
      </TableContainer>
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
   {open && (
    <Modal
     open={open}
     onClose={handleClose}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
    >
     <Box sx={style}>
      <Box sx={{ mb: theme.spacing(1) }}>
       <Typography variant="h4">Select Product</Typography>
      </Box>
      <div style={{ height: 300, width: '100%' }}>
       <DataGrid
        checkboxSelection
        columns={[
         { field: 'packageName', headerName: 'Package Name', width: 320 },
         {
          field: 'products',
          headerName: 'Products',
          width: 320,
          renderCell: (params) => {
           return params.value.map((role) => role.productName).join(', ');
          }
         }
        ]}
        rows={action === 'create' ? packageList.data : filterSelectPackage}
        onSelectionModelChange={(packageId) => {
         setSelectionModel(packageId);
        }}
        selectionModel={selectionModel}
        components={{
         Footer: CustomFooterComponent
        }}
        componentsProps={{
         footer: { onOk }
        }}
        hideFooterPagination
        getRowId={(row) => row.packageId}
       />
      </div>
     </Box>
    </Modal>
   )}
   <Confirmation
    onClose={() => setOpenConfirmation(false)}
    onOk={handleOkDelete}
    open={openConfirmation}
    labelButton="Delete"
    title={`Are you sure want to remove "${field?.packageName}" ?`}
    message="This might be effect your data, consider that what has been deleted cannot be recover."
   />
  </Box>
 );
};

export default FormCustomer;
