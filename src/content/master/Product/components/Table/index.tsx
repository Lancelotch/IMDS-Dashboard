import {
 Button,
 Box,
 Fab,
 Paper,
 Stack,
 styled,
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
 Tooltip,
 Checkbox
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
import { useProduct } from 'src/services/product/useProduct';
import ModalForm from 'src/components/ModalForm';
import { IProduct } from 'src/models/product';
import SearchBySelectField from 'src/components/SearchBySelectField';
import { useFirstRender } from 'src/hooks/useFirstRender';
import { useNavigate } from 'react-router';
import { MASTER_PRODUCT } from 'src/route';

const optionFields: Array<IOptionSearchField> = [
 {
  label: 'Product Name',
  value: 'productName'
 },
 {
  label: 'Widget Name',
  value: 'widgetName'
 }
];

const TableProduct = () => {
 const navigate = useNavigate();
 const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
 const [field, setField] = useState<IProduct>();
 const [search, setSearch] = useState<string>('');
 const [selectedItems, setSelectedItems] = useState<Array<IProduct>>([]);
 const [searchField, setSearchField] = useState<IOptionSearchField>(
  optionFields[0]
 );

 const { productList, loading } = useAppSelector((state) => state.storeProduct);
 const roleMenu = useAppSelector((state) => state.storeRole.roleMenu);
 const filterProductListActive = useMemo(() => {
  const filterDataActive = productList.data.filter(
   (product) => product.isActive === 1
  );
  return { ...productList, data: filterDataActive };
 }, [productList]);

 const { getProductList, deleteProduct, deletesProducts,exportExel } = useProduct();

 const handleClickEdit = function (product: IProduct) {
  navigate(`${MASTER_PRODUCT}?action=edit&id=${product.productId}`);
 };

 const handleClickDelete = (product: IProduct) => {
  setField(product);
  setOpenConfirmation(true);
 };

 const handleOkDelete = function () {
  deleteProduct(field.productId);
 };

 
 const hanldeDownload = function () {
  exportExel();
 };

 const handleChangeSearch = (value: string) => {
  setSearch(value);
 };

 const optionLimits = [10, 25, 50, 100];

 const initialTableAttribute: ITableAtribute<IProduct> = {
  columnName: 'productName',
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
  React.Reducer<ITableAtribute<IProduct>, IAction>
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

 const { page, limit, sortingMethod, columnName } = stateTable;
 const isFirstRender = useFirstRender();
 const handleClickSearch = () => {
  getProductList({
   page: page,
   limit: limit,
   sort: sortingMethod,
   dir: `product.${columnName}`,
   searchField: `product.${searchField.value}`,
   searchValue: search
  });
 };

 useEffect(() => {
  getProductList({
   page: page,
   limit: limit,
   sort: sortingMethod,
   dir: `product.${columnName}`,
   searchField: `product.${searchField.value}`,
   searchValue: search
  });
 }, [stateTable]);

 useEffect(() => {
  if (isFirstRender) return;
  if (!loading) setOpenConfirmation(false);
 }, [loading]);

 const handleChangeSelectStream = function (customer: IProduct) {
  const selectedIndex = selectedItems.findIndex(
   (item) => item.productId === customer.productId
  );
  let newSelected: any[] = [];
  if (selectedIndex === -1) {
   newSelected = newSelected.concat(selectedItems, customer);
  } else if (selectedIndex === 0) {
   newSelected = newSelected.concat(selectedItems.slice(1));
  } else if (selectedIndex === selectedItems.length - 1) {
   newSelected = newSelected.concat(selectedItems.slice(0, -1));
  } else if (selectedIndex > 0) {
   newSelected = newSelected.concat(
    selectedItems.slice(0, selectedIndex),
    selectedItems.slice(selectedIndex + 1)
   );
  }
  setSelectedItems(newSelected);
 };

 const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.checked) {
   setSelectedItems(filterProductListActive.data);
   return;
  }
  setSelectedItems([]);
 };

 const isSelected = (id: string) =>
  selectedItems.findIndex((item) => item.productId === id) !== -1;

 const theme = useTheme();

 const handleDeletes = () => {
  const ids = selectedItems.map((item) => item.productId);
  deletesProducts(ids).then(() => {
   setSelectedItems([]);
   getProductList({
    page: 1,
    limit: limit,
    sort: sortingMethod,
    dir: `product.${columnName}`,
    searchField: `product.${searchField.value}`,
    searchValue: search
   });
  });
 };

 return (
  <>
   <Card>
    <CardHeader
     sx={{ position: 'relative' }}
     action={
      <Box
       sx={{
        margin: theme.spacing(1, 1, 0, 1)
       }}
      >
       {selectedItems.length > 0 ? (
        <Button
         onClick={handleDeletes}
         variant="contained"
         color="error"
         sx={{ position: 'absolute', left: 160 }}
        >
         Delete selected products
        </Button>
       ) : null}
        <Button
         onClick={exportExel}
         variant="contained"
         color="success"
         sx={{ position: 'absolute', left: 16 }}
        >
         Export To Exel
        </Button>
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
        rowCount={filterProductListActive.data.length}
        onSelectAllClick={handleSelectAllClick}
        numSelected={selectedItems.length}
       />

       <TableBody>
        {filterProductListActive.data.map((product, index) => {
         const isItemSelected = isSelected(product.productId);
         return (
          <TableRow key={product.id}>
           <TableCell align="center" size="small" padding="none">
            <Checkbox
             color="primary"
             checked={isItemSelected}
             value={product.productId}
             onChange={() => handleChangeSelectStream(product)}
            />
           </TableCell>
           <TableCell align="center">
            {stateTable.limit * (stateTable.page - 1) + index + 1}
           </TableCell>
           <TableCell align="left">{product.productName}</TableCell>
           <TableCell align="left">
            {product.isStaging === 0 ? 'false' : 'true'}
           </TableCell>
           <TableCell align="left">{product.type}</TableCell>
           <TableCell align="left">
            {product.typeValue.replaceAll(',', ', ')}
           </TableCell>
           <TableCell align="center">
            <Stack direction="row" spacing={2} justifyContent="center">
             {roleMenu?.isUpdate === 1 && (
              <Tooltip title="Edit Product" arrow>
               <IconButton
                sx={{
                 '&:hover': {
                  background: theme.colors.primary.lighter
                 },
                 color: theme.palette.primary.main
                }}
                color="inherit"
                size="small"
                onClick={() => handleClickEdit(product)}
               >
                <EditTwoToneIcon fontSize="small" />
               </IconButton>
              </Tooltip>
             )}
             {roleMenu?.isDelete === 1 && (
              <Tooltip title="Delete Product" arrow>
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
             )}
            </Stack>
           </TableCell>
          </TableRow>
         );
        })}
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
            count={productList.totalPages}
            shape="rounded"
            color="primary"
            size="large"
            page={stateTable.page}
            onChange={(_, page) => handleChangePagination(page)}
            disabled={productList.loading}
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
     title={`Are you sure want to remove ${field?.productName} ?`}
     message="This might be effect your data, consider that what has been deleted cannot be recover."
    />
   </Card>
  </>
 );
};

export default TableProduct;
