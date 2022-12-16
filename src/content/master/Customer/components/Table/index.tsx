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
 TooltipProps,
 tooltipClasses,
 Chip,
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
import { useCustomer } from 'src/services/customer/useCustomer';
import ModalForm from 'src/components/ModalForm';
import { ICustomer } from 'src/models/customer';
import { useFirstRender } from 'src/hooks/useFirstRender';
import SearchBySelectField from 'src/components/SearchBySelectField';
import { MASTER_CUSTOMER } from 'src/route';
import { useNavigate } from 'react-router';

const optionFields: Array<IOptionSearchField> = [
 {
  label: 'Customer Name',
  value: 'customerName'
 },
 {
  label: 'Address',
  value: 'address'
 },
 {
  label: 'Pic',
  value: 'pic'
 },
 {
  label: 'Phone Number',
  value: 'phoneNumber'
 },
 {
  label: 'Phone Number',
  value: 'phoneNumber'
 },
 {
  label: 'Category',
  value: 'customerCategory'
 }
];

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
 <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
 //  [`& .${tooltipClasses.arrow}`]: {
 //   color: theme.palette.common.white,
 //   border: `1px solid ${theme.palette.grey[400]}`
 //  },
 [`& .${tooltipClasses.tooltip}`]: {
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.grey[400]}`
 }
}));

const TableCustomer = () => {
 const navigate = useNavigate();
 const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
 const [field, setField] = useState<ICustomer>();
 const [search, setSearch] = useState<string>('');
 const [selectedItems, setSelectedItems] = useState<Array<ICustomer>>([]);

 const [searchField, setSearchField] = useState<IOptionSearchField>(
  optionFields[0]
 );
 const roleMenu = useAppSelector((state) => state.storeRole.roleMenu);

 const { customerList, loading } = useAppSelector(
  (state) => state.storeCustomer
 );

 const filterCustomerListActive = useMemo(() => {
  const filterDataActive = customerList.data.filter(
   (customer) => customer.isActive === 1
  );
  return { ...customerList, data: filterDataActive };
 }, [customerList]);

 const { getCustomerList, deleteCustomer, deletesCustomers,exportExel } = useCustomer();

 const handleClickEdit = function (customer: ICustomer) {
  navigate(`${MASTER_CUSTOMER}?action=edit&id=${customer.customerId}`);
 };

 const handleClickDelete = (customer: ICustomer) => {
  setField(customer);
  setOpenConfirmation(true);
 };

 const handleOkDelete = function () {
  deleteCustomer(field.customerId);
 };

 const handleChangeSearch = (value: string) => {
  setSearch(value);
 };

 const optionLimits = [10, 25, 50, 100];

 const initialTableAttribute: ITableAtribute<ICustomer> = {
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
  React.Reducer<ITableAtribute<ICustomer>, IAction>
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

 const handleChangeSelectStream = function (customer: ICustomer) {
  const selectedIndex = selectedItems.findIndex(
   (item) => item.customerId === customer.customerId
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
   setSelectedItems(filterCustomerListActive.data);
   return;
  }
  setSelectedItems([]);
 };

 const isFirstRender = useFirstRender();

 const { page, limit, sortingMethod, columnName } = stateTable;
 const handleClickSearch = () => {
  getCustomerList({
   page: page,
   limit: limit,
   sort: sortingMethod,
   dir: `customer.${columnName}`,
   searchField: `customer.${searchField.value}`,
   searchValue: search
  });
 };

 useEffect(() => {
  getCustomerList({
   page: page,
   limit: limit,
   sort: sortingMethod,
   dir: `customer.${columnName}`,
   searchField: `customer.${searchField.value}`,
   searchValue: search
  });
 }, [stateTable]);

 useEffect(() => {
  if (isFirstRender) return;
  if (!loading) setOpenConfirmation(false);
 }, [loading]);

 const isSelected = (id: string) =>
  selectedItems.findIndex((item) => item.customerId === id) !== -1;

 const theme = useTheme();

 const handleDeletes = () => {
  const customerIds = selectedItems.map((item) => item.customerId);
  deletesCustomers(customerIds).then(() => {
   setSelectedItems([]);
   getCustomerList({
    page: 1,
    limit: limit,
    sort: sortingMethod,
    dir: `customer.${columnName}`,
    searchField: `customer.${searchField.value}`,
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
         Delete selected custumers
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
        rowCount={filterCustomerListActive.data.length}
        onSelectAllClick={handleSelectAllClick}
        numSelected={selectedItems.length}
       />

       <TableBody>
        {filterCustomerListActive.data.map((customer, index) => {
         const isItemSelected = isSelected(customer.customerId);
         return (
          <TableRow key={customer.customerId}>
           <TableCell align="center" size="small" padding="none">
            <Checkbox
             color="primary"
             checked={isItemSelected}
             value={customer.customerId}
             onChange={() => handleChangeSelectStream(customer)}
            />
           </TableCell>
           <TableCell align="center">
            {stateTable.limit * (stateTable.page - 1) + index + 1}
           </TableCell>
           <TableCell align="left">{customer.customerName}</TableCell>
           <TableCell align="left">{customer.pic}</TableCell>
           <TableCell align="left">{customer.phoneNumber}</TableCell>
           <TableCell align="left">{customer.email}</TableCell>
           <TableCell align="left">{customer.customerCategory}</TableCell>
           <TableCell align="center">
            <BootstrapTooltip
             placement="top"
             title={customer.packages.map((pack) => (
              <Chip
               label={pack.packageName}
               variant="outlined"
               key={pack.packageId}
               size="small"
               sx={{
                mr: theme.spacing(0.5),
                backgroundColor: theme.palette.grey[50]
               }}
              />
             ))}
            >
             <Chip label={`${customer.packages.length} Package`} />
            </BootstrapTooltip>
           </TableCell>
           <TableCell align="center">
            <Stack direction="row" spacing={2} justifyContent="center">
             {roleMenu?.isUpdate === 1 && (
              <Tooltip title="Edit Customer" arrow>
               <IconButton
                sx={{
                 '&:hover': {
                  background: theme.colors.primary.lighter
                 },
                 color: theme.palette.primary.main
                }}
                color="inherit"
                size="small"
                onClick={() => handleClickEdit(customer)}
               >
                <EditTwoToneIcon fontSize="small" />
               </IconButton>
              </Tooltip>
             )}
             {roleMenu?.isDelete === 1 && (
              <Tooltip title="Delete Customer" arrow>
               <IconButton
                sx={{
                 '&:hover': {
                  background: theme.colors.error.lighter
                 },
                 color: theme.palette.error.main
                }}
                color="inherit"
                size="small"
                onClick={() => handleClickDelete(customer)}
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
            count={customerList.totalPages}
            shape="rounded"
            color="primary"
            size="large"
            page={stateTable.page}
            onChange={(_, page) => handleChangePagination(page)}
            disabled={customerList.loading}
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

export default TableCustomer;
