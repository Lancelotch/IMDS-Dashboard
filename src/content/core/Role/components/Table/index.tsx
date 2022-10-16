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
 Tooltip
} from '@mui/material';
import { useEffect, useMemo, useReducer, useState } from 'react';
import Confirmation from 'src/components/Confirmation';
import TableHeader from './Header';
import {
 IAction,
 IOptionSearchField,
 IPayloadSort,
 ITableAtribute
} from 'src/models/general';
import SearchIcon from '@mui/icons-material/Search';
import { useRole } from 'src/services/role/useRole';
import { useAppSelector } from 'src/app/hooks';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ListIcon from '@mui/icons-material/List';
import { useFirstRender } from 'src/hooks/useFirstRender';
import { IRole } from 'src/models/role';
import SearchBySelectField from 'src/components/SearchBySelectField';
import { CORE_ROLE, CORE_ROLE_MENU } from 'src/route';
import { useNavigate } from 'react-router';

const optionFields: Array<IOptionSearchField> = [
 {
  label: 'Role Name',
  value: 'roleName'
 }
];

const TableRole = () => {
 const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
 const [field, setField] = useState<IRole>();
 const navigate = useNavigate();
 const [search, setSearch] = useState<string>('');
 const [searchField, setSearchField] = useState<IOptionSearchField>(
  optionFields[0]
 );
 const { roleList, loading } = useAppSelector((state) => state.storeRole);
 const roleMenu = useAppSelector((state) => state.storeRole.roleMenu);
 const isFirstRender = useFirstRender();

 const filterRoleListActive = useMemo(() => {
  const filterDataActive = roleList.data.filter((role) => role.isActive === 1);
  return { ...roleList, data: filterDataActive };
 }, [roleList]);

 const handleClickEdit = function (role: IRole) {
  navigate(`${CORE_ROLE}?action=edit&id=${role.roleId}`);
 };

 const handleClickDelete = (role: IRole) => {
  setField(role);
  setOpenConfirmation(true);
 };

 const handleClickMenuPermission = (role: IRole) => {
  navigate(`${CORE_ROLE}?action=edit_menu_permission&id=${role.roleId}`);
 };

 const handleOkDelete = function () {
  deleteRole(field.roleId);
 };

 const { getRoleList, deleteRole } = useRole();

 const handleChangeSearch = (value: string) => {
  setSearch(value);
 };

 const optionLimits = [10, 25, 50, 100];

 const initialTableAttribute: ITableAtribute<IRole> = {
  columnName: 'roleName',
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
  React.Reducer<ITableAtribute<IRole>, IAction>
 >(reducerTopTalker, initialTableAttribute);

 const handleSort = function (payloadSort: IPayloadSort<IRole>) {
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

 const handleClickSearch = () => {
  const { page, limit, sortingMethod, columnName } = stateTable;
  getRoleList({
   page: page,
   limit: limit,
   sort: sortingMethod,
   dir: `role.${columnName}`,
   searchField: `role.${searchField.value}`,
   searchValue: search
  });
 };

 useEffect(() => {
  const { page, limit, sortingMethod, columnName } = stateTable;
  getRoleList({
   page: page,
   limit: limit,
   sort: sortingMethod,
   dir: `role.${columnName}`,
   searchField: `role.${searchField.value}`,
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
        {filterRoleListActive.data.map((role, index) => (
         <TableRow key={role.id}>
          <TableCell align="center">
           {stateTable.limit * (stateTable.page - 1) + index + 1}
          </TableCell>
          <TableCell align="left">{role.roleName}</TableCell>
          <TableCell align="center">
           <Stack direction="row" spacing={2} justifyContent="center">
            {roleMenu?.isUpdate === 1 && (
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
               onClick={() => handleClickEdit(role)}
              >
               <EditTwoToneIcon fontSize="small" />
              </IconButton>
             </Tooltip>
            )}
            {roleMenu?.isDelete === 1 && (
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
               onClick={() => handleClickDelete(role)}
              >
               <DeleteTwoToneIcon fontSize="small" />
              </IconButton>
             </Tooltip>
            )}
            {roleMenu?.isUpdate === 1 && (
             <Tooltip title="Role Menu Permission" arrow>
              <IconButton
               sx={{
                '&:hover': {
                 background: theme.colors.error.lighter
                },
                color: theme.palette.warning.main
               }}
               color="inherit"
               size="small"
               onClick={() => handleClickMenuPermission(role)}
              >
               <ListIcon fontSize="small" />
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
            count={roleList.totalPages}
            shape="rounded"
            color="primary"
            size="large"
            page={stateTable.page}
            onChange={(_, page) => handleChangePagination(page)}
            disabled={roleList.loading}
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
     title={`Are you sure want to remove ${field?.roleName} ?`}
     message="This might be effect your data, consider that what has been deleted cannot be recover."
    />
   </Card>
  </>
 );
};

export default TableRole;
