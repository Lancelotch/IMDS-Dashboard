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
 Typography,
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
import { FC, useEffect, useMemo, useReducer, useState } from 'react';
import Confirmation from 'src/components/Confirmation';
import TableHeader from './Header';
import { IAction, ITableAtribute } from 'src/models/general';
import SearchIcon from '@mui/icons-material/Search';
import { useRole } from 'src/services/role/useRole';
import { useAppSelector } from 'src/app/hooks';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useInternalUser } from 'src/services/internal_user/useInternalUser';
import { useFirstRender } from 'src/hooks/useFirstRender';
import ModalForm from 'src/components/ModalForm';
import Form from '../Form';
import FormEditInternalUser from '../FormEdit';
import { IInternalUser } from 'src/models/internalUser';

const TableRole = () => {
 const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
 const [field, setField] = useState<IInternalUser>();
 const [open, setOpen] = useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const [search, setSearch] = useState<string>('');
 const isFirstRender = useFirstRender();
 const { internalUserList, loading } = useAppSelector(
  (state) => state.storeInternalUser
 );

 const filterInternalUserListActive = useMemo(() => {
  const filterDataActive = internalUserList.data.filter(
   (internalUser) => internalUser.isActive === 1
  );
  return { ...internalUserList, data: filterDataActive };
 }, [internalUserList]);

 const { getInternalUserList, deleteInternalUser } = useInternalUser();

 const handleChangeSearch = (value: string) => {
  setSearch(value);
 };
 const handleClickSearch = () => {};

 const optionLimits = [10, 25, 50, 100];

 const handleClickEdit = function (internalUser: IInternalUser) {
  handleOpen();
  setField(internalUser);
 };

 const handleClickDelete = (internalUser: IInternalUser) => {
  setField(internalUser);
  setOpenConfirmation(true);
 };

 const handleOkDelete = function () {
  deleteInternalUser(field.internalUserId);
 };

 const initialTableAttribute: ITableAtribute = {
  columnName: '',
  limit: 10,
  page: 1,
  sortingMethod: 'desc'
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
  React.Reducer<ITableAtribute, IAction>
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

 useEffect(() => {
  const { page, limit, sortingMethod } = stateTable;
  getInternalUserList({ page: page, limit: limit, sort: sortingMethod });
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
        size="small"
        onChange={(e) => handleChangeSearch(e.target.value)}
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
        {filterInternalUserListActive.data.map((internalUser, index) => (
         <TableRow key={internalUser.id}>
          <TableCell align="center">
           {stateTable.limit * (stateTable.page - 1) + index + 1}
          </TableCell>
          <TableCell align="left">{internalUser.username}</TableCell>
          <TableCell align="left">{internalUser.firstName}</TableCell>
          <TableCell align="left">{internalUser.lastName}</TableCell>
          <TableCell align="left">{internalUser.roleName}</TableCell>
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
              onClick={() => handleClickEdit(internalUser)}
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
              onClick={() => handleClickDelete(internalUser)}
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
            count={internalUserList.totalPages}
            shape="rounded"
            color="primary"
            size="large"
            page={stateTable.page}
            onChange={(_, page) => handleChangePagination(page)}
            disabled={internalUserList.loading}
           />
          </Stack>
         </TableCell>
        </TableRow>
       </TableBody>
      </Table>
     </TableContainer>
    </Box>
    {open && (
     <ModalForm title="Edit Internal User" open={open} onClose={handleClose}>
      <FormEditInternalUser onClose={handleClose} initFormValue={field} />
     </ModalForm>
    )}
    <Confirmation
     onClose={() => setOpenConfirmation(false)}
     onOk={handleOkDelete}
     open={openConfirmation}
     loading={loading}
     labelButton="Delete"
     title={`Are you sure want to remove ${field?.username} ?`}
     message="This might be effect your data, consider that what has been deleted cannot be recover."
    />
   </Card>
  </>
 );
};

export default TableRole;
