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
 Card,
 IconButton,
 Tooltip,
 Checkbox,
 FormControlLabel
} from '@mui/material';
import { useEffect, useState } from 'react';
import Confirmation from 'src/components/Confirmation';
import TableHeader from './Header';
import { IOptionSearchField } from 'src/models/general';
import { useRole } from 'src/services/role/useRole';
import { useAppSelector } from 'src/app/hooks';
import DoneIcon from '@mui/icons-material/Done';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useFirstRender } from 'src/hooks/useFirstRender';
import { IPayloadAddRoleMenu, IRoleMenu } from 'src/models/role';
import { getValueParam } from 'src/hooks/useQueryUrl';
import { Pause } from '@mui/icons-material';

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
 const { roleMenuList } = useAppSelector((state) => state.storeRole);
 const { getRoleMenuList, deleteRole, manageRoleMenu } = useRole();
 const isFirstRender = useFirstRender();

 const isChecked = function (value: number) {
  return value === 0 ? false : true;
 };
 const isActive = function (value: number) {
  return value === 0 ? 'InActive' : 'Active';
 };
 const isZero = function (value: boolean) {
  return value === false ? 0 : 1;
 };

 const handleDone = function (role: IRoleMenu) {
  const checkRead = document.getElementById(
   `${role.menuId}-read`
  ) as HTMLInputElement | null;
  const checkDelete = document.getElementById(
   `${role.menuId}-delete`
  ) as HTMLInputElement | null;
  const checkUpdate = document.getElementById(
   `${role.menuId}-update`
  ) as HTMLInputElement | null;
  const checkDownload = document.getElementById(
   `${role.menuId}-download`
  ) as HTMLInputElement | null;
  const checkWrite = document.getElementById(
   `${role.menuId}-write`
  ) as HTMLInputElement | null;
  const payload: IPayloadAddRoleMenu = {
   roleId,
   menus: [
    {
     menuId: role.menuId,
     isCreate: isZero(checkWrite.checked),
     isDelete: isZero(checkDelete.checked),
     isDownload: isZero(checkDownload.checked),
     isRead: isZero(checkRead.checked),
     isUpdate: isZero(checkUpdate.checked)
    }
   ]
  };
  manageRoleMenu(payload);
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

 return (
  <>
   <Card>
    <Box sx={{ margin: theme.spacing(1, 2, 2, 2) }}>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="simple table">
       <TableHeader />

       <TableBody>
        {roleMenuList.data.map((role, index) => (
         <TableRow key={role.id}>
          <TableCell align="center">{index}</TableCell>
          <TableCell align="left">{role.menuName}</TableCell>
          <TableCell align="left">
           <FormControlLabel
            control={
             <Checkbox
              id={`${role.menuId}-read`}
              defaultChecked={isChecked(role.isRead)}
             />
            }
            label={isActive(role.isRead)}
           />
          </TableCell>
          <TableCell align="left">
           <FormControlLabel
            control={
             <Checkbox
              id={`${role.menuId}-delete`}
              defaultChecked={isChecked(role.isDelete)}
             />
            }
            label={isActive(role.isDelete)}
           />
          </TableCell>
          <TableCell align="left">
           <FormControlLabel
            control={
             <Checkbox
              id={`${role.menuId}-update`}
              defaultChecked={isChecked(role.isUpdate)}
             />
            }
            label={isActive(role.isUpdate)}
           />
          </TableCell>
          <TableCell align="left">
           <FormControlLabel
            control={
             <Checkbox
              id={`${role.menuId}-download`}
              defaultChecked={isChecked(role.isDownload)}
             />
            }
            label={isActive(role.isDownload)}
           />
          </TableCell>
          <TableCell align="left">
           <FormControlLabel
            control={
             <Checkbox
              id={`${role.menuId}-write`}
              defaultChecked={isChecked(role.isCreate)}
             />
            }
            label={isActive(role.isCreate)}
           />
          </TableCell>
          <TableCell align="center">
           <Stack direction="row" spacing={2} justifyContent="center">
            <Tooltip title="Edit Role" arrow>
             <IconButton
              sx={{
               '&:hover': {
                background: theme.colors.primary.lighter
               },
               color: theme.palette.success.main
              }}
              color="inherit"
              size="small"
              onClick={() => handleDone(role)}
             >
              <DoneIcon fontSize="small" />
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
              onClick={() => handleClickDelete(role)}
             >
              <DeleteTwoToneIcon fontSize="small" />
             </IconButton>
            </Tooltip>
           </Stack>
          </TableCell>
         </TableRow>
        ))}
       </TableBody>
      </Table>
     </TableContainer>
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
