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
import { useCustomerWillBeExpired } from 'src/services/customer_will_be_expired/useCustomerWillBeExpired';
import { useAppSelector } from 'src/app/hooks';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useFirstRender } from 'src/hooks/useFirstRender';
import { ICustomerWillBeExpired } from 'src/models/customerWillBeExpired';
import SearchBySelectField from 'src/components/SearchBySelectField';
import { useNavigate } from 'react-router';
import { MASTER_CUSTOMER, MASTER_TOPIC } from 'src/route';

const optionFields: Array<IOptionSearchField> = [
 {
  label: 'Customer Name',
  value: 'customerName'
 }
];

const TableCustomerWillBeExpired = () => {
 const navigate = useNavigate();
 const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
 const [field, setField] = useState<ICustomerWillBeExpired>();
 const [search, setSearch] = useState<string>('');
 const { customerWillBeExpiredList, loading } = useAppSelector((state) => state.storeCustomerWillBeExpired);
 const [searchField, setSearchField] = useState<IOptionSearchField>(
  optionFields[0]
 );
 const roleMenu = useAppSelector((state) => state.storeRole.roleMenu);

 const filterCustomerWillBeExpiredListActive = useMemo(() => {
  const filterDataActive = customerWillBeExpiredList.data.filter(
   (customerWillBeExpired) => customerWillBeExpired.isActive === 1
  );
  return { ...customerWillBeExpiredList, data: filterDataActive };
 }, [customerWillBeExpiredList]);

 const handleClickEdit = function (customerWillBeExpired: ICustomerWillBeExpired) {
  navigate(`${MASTER_CUSTOMER}?action=edit&id=${customerWillBeExpired.customerId}`);
 };

 const handleClickDelete = (customerWillBeExpired: ICustomerWillBeExpired) => {
  setField(customerWillBeExpired);
  setOpenConfirmation(true);
 };



 const { getCustomerWillBeExpiredList } = useCustomerWillBeExpired();

 const handleChangeSearch = (value: string) => {
  setSearch(value);
 };

 const optionLimits = [10, 25, 50, 100];

 const initialTableAttribute: ITableAtribute<ICustomerWillBeExpired> = {
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
  React.Reducer<ITableAtribute<ICustomerWillBeExpired>, IAction>
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
  getCustomerWillBeExpiredList({
   page: page,
   limit: limit,
   sort: sortingMethod,
   dir: `customer.${columnName}`,
   searchField: `customer.${searchField.value}`,
   searchValue: search
  });
 };

 useEffect(() => {
  const { page, limit, sortingMethod, columnName } = stateTable;
  getCustomerWillBeExpiredList({
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
        {filterCustomerWillBeExpiredListActive.data.map((customerWillBeExpired, index) => (
         <TableRow key={customerWillBeExpired.id}>
          <TableCell align="center">
           {stateTable.limit * (stateTable.page - 1) + index + 1}
          </TableCell>
          <TableCell align="left">{customerWillBeExpired.customerName}</TableCell>
          <TableCell align="left">{customerWillBeExpired.pic}</TableCell>
          <TableCell align="left">{customerWillBeExpired.email}</TableCell>
          <TableCell align="left">{customerWillBeExpired.phoneNumber}</TableCell>
          <TableCell align="left">{customerWillBeExpired.packageName}</TableCell>
          <TableCell align="left">{customerWillBeExpired.contractBegin}</TableCell>
          <TableCell align="left">{customerWillBeExpired.contractEnd}</TableCell>
          <TableCell align="center">
           <Stack direction="row" spacing={2} justifyContent="center">
            {roleMenu?.isUpdate === 1 && (
             <Tooltip title="Go To Detail Customer" arrow>
              <IconButton
               sx={{
                '&:hover': {
                 background: theme.colors.primary.lighter
                },
                color: theme.palette.primary.main
               }}
               color="inherit"
               size="small"
               onClick={() => handleClickEdit(customerWillBeExpired)}
              >
               <EditTwoToneIcon fontSize="small" />
              </IconButton>
             </Tooltip>
            )}
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
            count={customerWillBeExpiredList.totalPages}
            shape="rounded"
            color="primary"
            size="large"
            page={stateTable.page}
            onChange={(_, page) => handleChangePagination(page)}
            disabled={customerWillBeExpiredList.loading}
           />
          </Stack>
         </TableCell>
        </TableRow>
       </TableBody>
      </Table>
     </TableContainer>
    </Box>
    
   </Card>
  </>
 );
};

export default TableCustomerWillBeExpired;
