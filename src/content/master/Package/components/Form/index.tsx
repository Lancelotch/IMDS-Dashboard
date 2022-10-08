import {
 Button,
 Checkbox,
 FormControl,
 FormControlLabel,
 FormHelperText,
 FormLabel,
 Grid,
 IconButton,
 MenuItem,
 Modal,
 OutlinedInput,
 Paper,
 Select,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 Tooltip,
 Typography,
 useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import { useAppSelector } from 'src/app/hooks';
import { FC, useEffect, useState } from 'react';
import { useFirstRender } from 'src/hooks/useFirstRender';
import { usePackage } from 'src/services/package/usePackage';
import {
 IPayloadAddPackage,
 IProductPackage,
 TTypePackage
} from 'src/models/package';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { useProduct } from 'src/services/product/useProduct';
import { filter, indexOf } from 'lodash';

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

function validationSchema() {
 return Yup.object({
  packageName: Yup.string().required(),
  packageType: Yup.string().required(),
  products: Yup.array().required()
 });
}
const types: Array<TTypePackage> = ['widget', 'streaming', 'api', 'messaging'];

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

const FormPackage: FC<Props> = ({ action, id }) => {
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const { addPackage, editPackage, getPackageById } = usePackage();
 const { getProductList } = useProduct();

 const {
  handleChange,
  handleSubmit,
  errors,
  values,
  touched,
  resetForm,
  setFieldValue
 } = useFormik<IPayloadAddPackage>({
  initialValues: {
   packageName: '',
   packageType: '',
   products: []
  },
  validationSchema: validationSchema(),
  onSubmit: async (value) => {
   const payload = {
    ...value,
    pruducts: value.products.map((product) => ({
     productId: product.productId
    }))
   };
   if (action === 'create') {
    resetForm();
    addPackage(payload);
    return;
   }
   editPackage(id, payload);
  }
 });

 const theme = useTheme();

 const isFirstRender = useFirstRender();
 const { loading, packageById } = useAppSelector((store) => store.storePackage);
 const { productList } = useAppSelector((store) => store.storeProduct);
 useEffect(() => {
  if (action === 'edit' && id) {
   getPackageById(id);
  }
 }, [action, id]);

 useEffect(() => {
  if (isFirstRender) return;
  if (action === 'edit' && packageById) {
   setFieldValue('packageName', packageById.packageName);
   setFieldValue('products', packageById.products);
   setFieldValue('packageType', packageById.packageType);
  }
 }, [packageById]);

 useEffect(() => {
  getProductList({
   page: 1,
   limit: 1000,
   searchField: `product.type`,
   searchValue: values.packageType
  });
 }, [values.packageType]);

 const handleClickDelete = function (productSelected: IProductPackage) {
  const filterProduct = values.products.filter(
   (product) => product.productId != productSelected.productId
  );
  setFieldValue('products', filterProduct);
 };

 const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

 const onOk = function () {
  handleClose();
  const filterProductByArrayId = filter(
   productList.data,
   (v) => indexOf(selectionModel, v.id) !== -1
  );
  setFieldValue('products', filterProductByArrayId);
 };

 return (
  <Box sx={{ mt: theme.spacing(2) }}>
   <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
     <Grid item lg={6}>
      <FormControl fullWidth size="medium">
       <FormLabel>Package Name</FormLabel>
       <OutlinedInput
        name="packageName"
        onChange={handleChange}
        error={errors.packageName && touched.packageName}
        value={values.packageName}
        fullWidth
        size="small"
       />
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
        {errors.packageName && touched.packageName && errors.packageName}
       </FormHelperText>
      </FormControl>
     </Grid>
     <Grid item lg={6}>
      <FormControl fullWidth size="medium">
       <FormLabel>Type</FormLabel>
       <Select
        value={values.packageType}
        onChange={(e) => {
         setFieldValue('products', []);
         handleChange(e);
        }}
        size="small"
        name="packageType"
       >
        {types.map((type) => (
         <MenuItem key={type} value={type}>
          {type}
         </MenuItem>
        ))}
       </Select>
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
        {errors.packageType && touched.packageType && errors.packageType}
       </FormHelperText>
      </FormControl>
     </Grid>
     {values.packageType && (
      <Grid item lg={12}>
       <Button onClick={handleOpen} variant="outlined">
        Add Product
       </Button>
      </Grid>
     )}

     <Grid item lg={12}>
      <TableContainer component={Paper}>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
         <TableRow>
          <TableCell>No</TableCell>
          <TableCell>Product Name</TableCell>
          <TableCell align="center">Action</TableCell>
         </TableRow>
        </TableHead>
        <TableBody>
         {values.products.map((product, idx) => (
          <TableRow
           key={product.productId}
           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
           <TableCell component="th" scope="row">
            {idx + 1}
           </TableCell>
           <TableCell align="left">{product.productName}</TableCell>
           <TableCell align="center">
            <Tooltip title="Delete Role" arrow>
             <IconButton
              sx={{
               '&:hover': {
                background: theme.colors.error.lighter
               },
               color: theme.palette.error.main
              }}
              color="inherit"
              size="small"
              onClick={() => handleClickDelete(product)}
             >
              <DeleteTwoToneIcon fontSize="small" />
             </IconButton>
            </Tooltip>
           </TableCell>
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
         { field: 'productName', headerName: 'Product Name', width: 320 },
         { field: 'type', headerName: 'Type Product', width: 320 }
        ]}
        rows={productList.data}
        onSelectionModelChange={(a) => {
         setSelectionModel(a);
        }}
        components={{
         Footer: CustomFooterComponent
        }}
        componentsProps={{
         footer: { onOk }
        }}
        hideFooterPagination
       />
      </div>
     </Box>
    </Modal>
   )}
  </Box>
 );
};

export default FormPackage;
