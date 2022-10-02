import {
 Box,
 Paper,
 Stack,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableRow,
 useTheme,
 FormControl,
 InputLabel,
 Select,
 MenuItem,
 Pagination,
 Card,
 CardHeader,
 OutlinedInput,
 InputAdornment,
 IconButton,
 Tooltip
} from '@mui/material';
import { useEffect, useMemo, useReducer, useState } from 'react';
import Confirmation from 'src/components/Confirmation';
import TableHeader from './Header';
import {
 IAction,
 IOptionSearchField,
 ITableAtribute
} from 'src/models/general';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector } from 'src/app/hooks';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useCustomerProduct } from 'src/services/customer_product/useCustomerProduct';
import moment from 'moment';
import ModalForm from 'src/components/ModalForm';
import { ICustomerProduct } from 'src/models/customerProduct';
import { useFirstRender } from 'src/hooks/useFirstRender';
import SearchBySelectField from 'src/components/SearchBySelectField';
import { MASTER_CUSTOMER_PRODUCT } from 'src/route';
import { useNavigate } from 'react-router';

const optionFields: Array<IOptionSearchField> = [
 {
  label: 'Username',
  value: 'username'
 },
 {
  label: 'Customer Name',
  value: 'customerName'
 },
 {
  label: 'Product Name',
  value: 'productName'
 }
];

const TableCustomerProduct = () => {
 const navigate = useNavigate();
 const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
 const [field, setField] = useState<ICustomerProduct>();
 const [search, setSearch] = useState<string>('');
 const [searchField, setSearchField] = useState<IOptionSearchField>(
  optionFields[0]
 );

 const { customerProductList, loading } = useAppSelector(
  (state) => state.storeCustomerProduct
 );

 const filterCustomerProductListActive = useMemo(() => {
  const filterDataActive = customerProductList.data.filter(
   (customer) => customer.isActive === 1
  );
  return { ...customerProductList, data: filterDataActive };
 }, [customerProductList]);

 const { getCustomerProductList, deleteCustomerProduct } = useCustomerProduct();

 const handleClickEdit = function (customerProduct: ICustomerProduct) {
  navigate(
   `${MASTER_CUSTOMER_PRODUCT}?action=edit&id=${customerProduct.customerProductId}`
  );
 };

 const handleClickDelete = (customerProduct: ICustomerProduct) => {
  setField(customerProduct);
  setOpenConfirmation(true);
 };

 const handleOkDelete = function () {
  deleteCustomerProduct(field.customerProductId);
 };

 const handleChangeSearch = (value: string) => {
  setSearch(value);
 };

 const optionLimits = [10, 25, 50, 100];

 const initialTableAttribute: ITableAtribute<ICustomerProduct> = {
  columnName: 'customerName',
  limit: 10,
  page: 1,
  sortingMethod: 'asc'
 };

 function reducerTopTalker(state, action) {
  switch (action.type) {
   case 'page':
    return { ...state, page: action.payload.page };
   case 'sortingMethod':
    return {
     ...state,
     sortingMethod: action.payload.sortingMethod,
     columnName: action.payload.columnName
    };
   case 'limit':
    return { ...state, limit: action.payload.limit, page: 1 };
   default:
    throw new Error();
  }
 }

 const [stateTable, dispatchTable] = useReducer<
  React.Reducer<ITableAtribute<ICustomerProduct>, IAction>
 >(reducerTopTalker, initialTableAttribute);

 const handleSort = function (payloadSort) {
  dispatchTable({
   type: 'sortingMethod',
   payload: { ...payloadSort }
  });
 };

 const handleChangeLimit = function (event: any) {
  event.preventDefault();
  const limit: string = event.target.value;
  dispatchTable({
   type: 'limit',
   payload: { page: limit }
  });
 };

 const handleChangePagination = function (page: number) {
  dispatchTable({
   type: 'page',
   payload: { page: page }
  });
 };

 const isFirstRender = useFirstRender();
 const handleClickSearch = () => {
  const { page, limit, sortingMethod, columnName } = stateTable;
  getCustomerProductList({
   page: page,
   limit: limit,
   sort: sortingMethod,
   dir: `customerProduct.${columnName}`,
   searchField: `customerProduct.${searchField.value}`,
   searchValue: search
  });
 };

 useEffect(() => {
  const { page, limit, sortingMethod, columnName } = stateTable;
  getCustomerProductList({
   page: page,
   limit: limit,
   sort: sortingMethod,
   dir: `customerProduct.${columnName}`,
   searchField: `customerProduct.${searchField.value}`,
   searchValue: search
  });
 }, [stateTable]);

 useEffect(() => {
  if (isFirstRender) return;
  if (!loading) setOpenConfirmation(false);
 }, [loading]);

 const theme = useTheme();

 return (
  <>
   <Card>
    <CardHeader
     action={
      <Box sx={{ margin: theme.spacing(1, 1, 0, 1) }}>
       <OutlinedInput
        id="outlined-search"
        type="text"
        value={search}
        sx={{ width: theme.spacing(60) }}
        size="small"
        placeholder="search..."
        onChange={(e) => handleChangeSearch(e.target.value)}
        startAdornment={
         <SearchBySelectField
          options={optionFields}
          onSearchBy={(searchField: IOptionSearchField) => {
           setSearchField(searchField);
          }}
          optionSelected={searchField}
         />
        }
        endAdornment={
         <InputAdornment position="end">
          <IconButton
           aria-label="toggle password visibility"
           onClick={handleClickSearch}
           edge="end"
          >
           <SearchIcon />
          </IconButton>
         </InputAdornment>
        }
        onKeyPress={(e) => {
         if (e.key === 'Enter') {
          handleClickSearch();
         }
        }}
       />
      </Box>
     }
    />
    <Box sx={{ margin: theme.spacing(1, 2, 2, 2) }}>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="simple table">
       <TableHeader
        order={stateTable.sortingMethod}
        orderBy={stateTable.columnName}
        onRequestSort={handleSort}
       />

       <TableBody>
        {filterCustomerProductListActive.data.map((customerProduct, index) => (
         <TableRow key={customerProduct.id}>
          <TableCell align="center">
           {stateTable.limit * (stateTable.page - 1) + index + 1}
          </TableCell>
          <TableCell align="left">{customerProduct.productName}</TableCell>
          <TableCell align="left">{customerProduct.customerName}</TableCell>
          <TableCell align="left">
           {customerProduct.startDate
            ? moment(customerProduct.startDate).format('LL')
            : '-'}
          </TableCell>
          <TableCell align="left">
           {customerProduct.endDate
            ? moment(customerProduct.endDate).format('LL')
            : '-'}
          </TableCell>
          <TableCell align="left">{customerProduct.username}</TableCell>
          <TableCell align="center">
           <Stack direction="row" spacing={2} justifyContent="center">
            <Tooltip title="Edit Role" arrow>
             <IconButton
              sx={{
               '&:hover': {
                background: theme.colors.primary.lighter
               },
               color: theme.palette.primary.main
              }}
              color="inherit"
              size="small"
              onClick={() => handleClickEdit(customerProduct)}
             >
              <EditTwoToneIcon fontSize="small" />
             </IconButton>
            </Tooltip>
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
              onClick={() => handleClickDelete(customerProduct)}
             >
              <DeleteTwoToneIcon fontSize="small" />
             </IconButton>
            </Tooltip>
           </Stack>
          </TableCell>
         </TableRow>
        ))}
        <TableRow hover={false}>
         <TableCell colSpan={3}>
          <Stack
           spacing={3}
           direction="row"
           alignItems="center"
           justifyContent="flex-end"
           marginY={1}
          >
           <FormControl variant="outlined" size="small">
            <InputLabel id="select-limit-label">Limit</InputLabel>
            <Select
             labelId="select-limit-label"
             id="select-limit"
             value={stateTable.limit}
             onChange={handleChangeLimit}
             label="Limit"
            >
             {optionLimits.map((limit) => (
              <MenuItem value={limit} key={limit}>
               {limit}
              </MenuItem>
             ))}
            </Select>
           </FormControl>
           <Pagination
            count={customerProductList.totalPages}
            shape="rounded"
            color="primary"
            size="large"
            page={stateTable.page}
            onChange={(_, page) => handleChangePagination(page)}
            disabled={customerProductList.loading}
           />
          </Stack>
         </TableCell>
        </TableRow>
       </TableBody>
      </Table>
     </TableContainer>
    </Box>
    <Confirmation
     onClose={() => setOpenConfirmation(false)}
     onOk={handleOkDelete}
     open={openConfirmation}
     labelButton="Delete"
     title={`Are you sure want to remove ${field?.customerName} ?`}
     message="This might be effect your data, consider that what has been deleted cannot be recover."
    />
   </Card>
  </>
 );
};

export default TableCustomerProduct;
