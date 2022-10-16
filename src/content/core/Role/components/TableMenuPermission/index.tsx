import {
 Box,
 Paper,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableRow,
 useTheme,
 Card,
 Tooltip,
 Checkbox,
 FormControlLabel,
 TableFooter,
 Button
} from '@mui/material';
import { useEffect, useState } from 'react';
import Confirmation from 'src/components/Confirmation';
import TableHeader from './Header';
import { IOptionSearchField } from 'src/models/general';
import { useRole } from 'src/services/role/useRole';
import { useAppSelector } from 'src/app/hooks';
import { useFirstRender } from 'src/hooks/useFirstRender';
import { IPayloadAddRoleMenu, IRoleMenu } from 'src/models/role';
import { getValueParam } from 'src/hooks/useQueryUrl';
import { useFormik } from 'formik';

const optionFields: Array<IOptionSearchField> = [
 {
  label: 'Role Name',
  value: 'roleName'
 }
];

const TableMenuPermission = () => {
 const roleId = getValueParam('id');
 const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
 const [field, setField] = useState<IRoleMenu>();
 const { roleMenuList, loading } = useAppSelector((state) => state.storeRole);
 const { getRoleMenuList, deleteRole, manageRoleMenu } = useRole();
 const isFirstRender = useFirstRender();
 const { handleSubmit, values, setFieldValue } = useFormik<IPayloadAddRoleMenu>(
  {
   initialValues: {
    roleId: roleId,
    menus: []
   },
   onSubmit: async (value) => {
    manageRoleMenu(value);
   }
  }
 );

 useEffect(() => {
  if (isFirstRender) return;
  setFieldValue('menus', roleMenuList.data);
 }, [roleMenuList]);

 const isChecked = function (value: number) {
  return value === 0 ? false : true;
 };
 const isActive = function (value: number) {
  return value === 0 ? 'InActive' : 'Active';
 };

 const handleClickDelete = (role: IRoleMenu) => {
  setField(role);
  setOpenConfirmation(true);
 };

 const handleOkDelete = function () {
  deleteRole(field.menuId);
 };

 useEffect(() => {
  getRoleMenuList({
   roleId
  });
 }, []);

 const theme = useTheme();

 const setFieldMenuByIndex = function (index: number, value: number) {
  setFieldValue(`menus[${index}].isCreate`, value);
  setFieldValue(`menus[${index}].isRead`, value);
  setFieldValue(`menus[${index}].isDelete`, value);
  setFieldValue(`menus[${index}].isUpdate`, value);
  setFieldValue(`menus[${index}].isDownload`, value);
 };

 const handleSelectAllRow = function (checked: boolean, index: number) {
  if (checked) {
   setFieldMenuByIndex(index, 1);
   return;
  }
  setFieldMenuByIndex(index, 0);
 };

 const isIndeterminate = function (menu: IRoleMenu) {
  const { id, menuHeadId, menuId, menuName, url, ...rest } = menu;
  const totalSelected = Object.values(rest).reduce((prevVal, currVal) => {
   return prevVal + currVal;
  }, 0);
  if (totalSelected > 0 && totalSelected < Object.keys(rest).length)
   return true;
  return false;
 };

 return (
  <>
   <Card>
    <Box sx={{ margin: theme.spacing(2) }}>
     <form onSubmit={handleSubmit}>
      <TableContainer
       component={Paper}
       sx={{ maxHeight: 'calc(100vh - 400px)' }}
      >
       <Table
        stickyHeader
        sx={{ minWidth: 650 }}
        size="medium"
        aria-label="simple table"
       >
        <TableHeader />
        <TableBody>
         {values.menus.map((menu, index) => (
          <TableRow key={menu.menuId}>
           <TableCell align="center">
            <Tooltip title="Select All" arrow>
             <Checkbox
              color="info"
              id={`${menu.menuId}-write`}
              checked={isChecked(menu.isCreate)}
              indeterminate={isIndeterminate(menu)}
              onChange={(e, checked) => handleSelectAllRow(checked, index)}
             />
            </Tooltip>
           </TableCell>
           <TableCell align="left">{menu.menuName}</TableCell>
           <TableCell align="left">
            <FormControlLabel
             control={
              <Checkbox
               id={`${menu.menuId}-read`}
               name={`menus[${index}].isRead`}
               checked={isChecked(menu.isRead)}
               onChange={(_, checked) => {
                setFieldValue(`menus[${index}].isRead`, checked ? 1 : 0);
               }}
              />
             }
             label={isActive(menu.isRead)}
            />
           </TableCell>
           <TableCell align="left">
            <FormControlLabel
             control={
              <Checkbox
               id={`${menu.menuId}-delete`}
               name={`menus[${index}].isDelete`}
               checked={isChecked(menu.isDelete)}
               onChange={(_, checked) => {
                setFieldValue(`menus[${index}].isDelete`, checked ? 1 : 0);
               }}
              />
             }
             label={isActive(menu.isDelete)}
            />
           </TableCell>
           <TableCell align="left">
            <FormControlLabel
             control={
              <Checkbox
               id={`${menu.menuId}-update`}
               name={`menus[${index}].isUpdate`}
               checked={isChecked(menu.isUpdate)}
               onChange={(_, checked) => {
                setFieldValue(`menus[${index}].isUpdate`, checked ? 1 : 0);
               }}
              />
             }
             label={isActive(menu.isUpdate)}
            />
           </TableCell>
           <TableCell align="left">
            <FormControlLabel
             control={
              <Checkbox
               id={`${menu.menuId}-download`}
               name={`menus[${index}].isDownload`}
               checked={isChecked(menu.isDownload)}
               onChange={(_, checked) => {
                setFieldValue(`menus[${index}].isDownload`, checked ? 1 : 0);
               }}
              />
             }
             label={isActive(menu.isDownload)}
            />
           </TableCell>
           <TableCell align="left">
            <FormControlLabel
             control={
              <Checkbox
               id={`${menu.menuId}-write`}
               name={`menus[${index}].isCreate`}
               checked={isChecked(menu.isCreate)}
               onChange={(_, checked) => {
                setFieldValue(`menus[${index}].isCreate`, checked ? 1 : 0);
               }}
              />
             }
             label={isActive(menu.isCreate)}
            />
           </TableCell>
           {/* <TableCell align="center">
            <Tooltip title="Delete menu" arrow>
             <IconButton
              sx={{
               '&:hover': {
                background: theme.colors.error.lighter
               },
               color: theme.palette.error.main
              }}
              color="inherit"
              size="small"
              onClick={() => handleClickDelete(menu)}
             >
              <DeleteTwoToneIcon fontSize="small" />
             </IconButton>
            </Tooltip>
           </TableCell> */}
          </TableRow>
         ))}
        </TableBody>
       </Table>
      </TableContainer>
      <TableFooter
       sx={{
        paddingTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'right'
       }}
      >
       <Button variant="contained" type="submit" disabled={loading}>
        Submit
       </Button>
      </TableFooter>
     </form>
    </Box>

    <Confirmation
     onClose={() => setOpenConfirmation(false)}
     onOk={handleOkDelete}
     open={openConfirmation}
     labelButton="Delete"
     title={`Are you sure want to remove ${field?.menuName} ?`}
     message="This might be effect your data, consider that what has been deleted cannot be recover."
    />
   </Card>
  </>
 );
};

export default TableMenuPermission;
