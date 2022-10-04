import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { IPayloadSort, Order } from 'src/models/general';
import { IRole, IRoleMenu } from 'src/models/role';

interface HeadCell {
 disablePadding: boolean;
 id: keyof IRoleMenu;
 label: string;
 size?: number;
 needSorting: boolean;
 align?: 'center' | 'left' | 'right';
}

interface EnhancedTableProps {
 onRequestSort?: (payload: IPayloadSort<IRole>) => void;
 order?: Order;
 orderBy?: string;
}

const headCells: HeadCell[] = [
 {
  id: 'menuName',
  disablePadding: false,
  label: 'Menu Name',
  needSorting: false,
  align: 'left'
 },
 {
  id: 'isRead',
  disablePadding: false,
  label: 'Read',
  needSorting: false,
  align: 'left'
 },
 {
  id: 'isDelete',
  disablePadding: false,
  label: 'Delete',
  needSorting: false,
  align: 'left'
 },
 {
  id: 'isUpdate',
  disablePadding: false,
  label: 'Update',
  needSorting: false,
  align: 'left'
 },
 {
  id: 'isDownload',
  disablePadding: false,
  label: 'Download',
  needSorting: false,
  align: 'left'
 },
 {
  id: 'isCreate',
  disablePadding: false,
  label: 'Write',
  needSorting: false,
  align: 'left'
 }
];

const Header: React.FC<EnhancedTableProps> = ({
 onRequestSort,
 order,
 orderBy
}) => {
 const createSortHandler =
  (property: keyof IRole) => (event: React.MouseEvent<unknown>) => {
   onRequestSort({
    columnName: property,
    sortingMethod: order === 'asc' ? 'desc' : 'asc'
   });
  };

 return (
  <TableHead>
   <TableRow>
    <TableCell size="small" align="center" padding="none">
     No
    </TableCell>
    {headCells.map((headCell: any) => (
     <React.Fragment key={headCell.id}>
      {headCell ? (
       <TableCell
        key={uuidv4()}
        size="small"
        align={headCell.align}
        padding={headCell.disablePadding ? 'none' : 'normal'}
        sortDirection={orderBy === headCell.id ? order : false}
       >
        <TableSortLabel
         active={orderBy === headCell.id}
         direction={orderBy === headCell.id ? order : 'asc'}
         onClick={createSortHandler(headCell.id)}
        >
         {orderBy === headCell.id ? (
          <React.Fragment>
           <div style={{ fontWeight: 700 }}>{headCell.label}</div>
           <span
            style={{
             border: 0,
             clip: 'rect(0 0 0 0)',
             height: 1,
             margin: -1,
             overflow: 'hidden',
             padding: 0,
             position: 'absolute',
             top: 20,
             width: 1
            }}
           >
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
           </span>
          </React.Fragment>
         ) : (
          <div>{headCell.label}</div>
         )}
        </TableSortLabel>
       </TableCell>
      ) : (
       <TableCell size="small" align={headCell.align} padding="none">
        {headCell.name}
       </TableCell>
      )}
     </React.Fragment>
    ))}
    <TableCell size="small" align="center" padding="none">
     Action
    </TableCell>
   </TableRow>
  </TableHead>
 );
};

export default Header;
