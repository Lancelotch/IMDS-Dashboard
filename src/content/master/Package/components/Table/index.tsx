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
 Chip,
 TooltipProps,
 tooltipClasses,
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
import { usePackage } from 'src/services/package/usePackage';
import ModalForm from 'src/components/ModalForm';
import { IPackage } from 'src/models/package';
import SearchBySelectField from 'src/components/SearchBySelectField';
import { useFirstRender } from 'src/hooks/useFirstRender';
import { useNavigate } from 'react-router';
import { MASTER_PACKAGE } from 'src/route';

const optionFields: Array<IOptionSearchField> = [
 {
  label: 'Package Name',
  value: 'packageName'
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

const TablePackage = () => {
 const navigate = useNavigate();
 const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
 const [field, setField] = useState<IPackage>();
 const [search, setSearch] = useState<string>('');
 const [selectedItems, setSelectedItems] = useState<Array<IPackage>>([]);
 const [searchField, setSearchField] = useState<IOptionSearchField>(
  optionFields[0]
 );

 const { packageList, loading } = useAppSelector((state) => state.storePackage);
 const roleMenu = useAppSelector((state) => state.storeRole.roleMenu);
 const filterPackageListActive = useMemo(() => {
  const filterDataActive = packageList.data.filter(
   (Package) => Package.isActive === 1
  );
  return { ...packageList, data: filterDataActive };
 }, [packageList]);

 const { getPackageList, deletePackage, deletesPackages ,exportExel} = usePackage();

 const handleClickEdit = function (packageSelected: IPackage) {
  navigate(`${MASTER_PACKAGE}?action=edit&id=${packageSelected.packageId}`);
 };

 const handleClickDelete = (Package: IPackage) => {
  setField(Package);
  setOpenConfirmation(true);
 };

 const handleOkDelete = function () {
  deletePackage(field.packageId);
 };

 const handleChangeSearch = (value: string) => {
  setSearch(value);
 };

 const optionLimits = [10, 25, 50, 100];

 const initialTableAttribute: ITableAtribute<IPackage> = {
  columnName: 'packageName',
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
  React.Reducer<ITableAtribute<IPackage>, IAction>
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
  getPackageList({
   page: page,
   limit: limit,
   sort: sortingMethod,
   dir: `package.${columnName}`,
   searchField: `package.${searchField.value}`,
   searchValue: search
  });
 };

 useEffect(() => {
  getPackageList({
   page: page,
   limit: limit,
   sort: sortingMethod,
   dir: `package.${columnName}`,
   searchField: `package.${searchField.value}`,
   searchValue: search
  });
 }, [stateTable]);

 useEffect(() => {
  if (isFirstRender) return;
  if (!loading) setOpenConfirmation(false);
 }, [loading]);

 const handleChangeSelectStream = function (packageSelected: IPackage) {
  const selectedIndex = selectedItems.findIndex(
   (item) => item.packageId === packageSelected.packageId
  );
  let newSelected: any[] = [];
  if (selectedIndex === -1) {
   newSelected = newSelected.concat(selectedItems, packageSelected);
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
   setSelectedItems(filterPackageListActive.data);
   return;
  }
  setSelectedItems([]);
 };

 const isSelected = (id: string) =>
  selectedItems.findIndex((item) => item.packageId === id) !== -1;

 const theme = useTheme();

 const handleDeletes = () => {
  const ids = selectedItems.map((item) => item.packageId);
  deletesPackages(ids).then(() => {
   setSelectedItems([]);
   getPackageList({
    page: 1,
    limit: limit,
    sort: sortingMethod,
    dir: `package.${columnName}`,
    searchField: `package.${searchField.value}`,
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
         Delete selected packages
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
        rowCount={filterPackageListActive.data.length}
        onSelectAllClick={handleSelectAllClick}
        numSelected={selectedItems.length}
       />

       <TableBody>
        {filterPackageListActive.data.map((packageActive, index) => {
         const isItemSelected = isSelected(packageActive.packageId);
         return (
          <TableRow key={packageActive.packageId}>
           <TableCell align="center" size="small" padding="none">
            <Checkbox
             color="primary"
             checked={isItemSelected}
             value={packageActive.packageId}
             onChange={() => handleChangeSelectStream(packageActive)}
            />
           </TableCell>
           <TableCell align="center">
            {stateTable.limit * (stateTable.page - 1) + index + 1}
           </TableCell>
           <TableCell align="left">{packageActive.packageName}</TableCell>
           <TableCell align="left">
            <BootstrapTooltip
             placement="top"
             title={packageActive.products.map((product) => (
              <Chip
               label={product.productName}
               variant="outlined"
               key={product.productId}
               size="small"
               sx={{
                mr: theme.spacing(0.5),
                backgroundColor: theme.palette.grey[50]
               }}
              />
             ))}
            >
             <Chip label={`${packageActive.products.length} Products`} />
            </BootstrapTooltip>
           </TableCell>
           <TableCell align="center">
            <Stack direction="row" spacing={2} justifyContent="center">
             {roleMenu?.isUpdate === 1 && (
              <Tooltip title="Edit Package" arrow>
               <IconButton
                sx={{
                 '&:hover': {
                  background: theme.colors.primary.lighter
                 },
                 color: theme.palette.primary.main
                }}
                color="inherit"
                size="small"
                onClick={() => handleClickEdit(packageActive)}
               >
                <EditTwoToneIcon fontSize="small" />
               </IconButton>
              </Tooltip>
             )}
             {roleMenu?.isDelete === 1 && (
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
                onClick={() => handleClickDelete(packageActive)}
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
            count={packageList.totalPages}
            shape="rounded"
            color="primary"
            size="large"
            page={stateTable.page}
            onChange={(_, page) => handleChangePagination(page)}
            disabled={packageList.loading}
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
     title={`Are you sure want to remove ${field?.packageName} ?`}
     message="This might be effect your data, consider that what has been deleted cannot be recover."
    />
   </Card>
  </>
 );
};

export default TablePackage;
