import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Order } from 'src/models/general';
import { IProduct } from 'src/models/product';

interface HeadCell {
 disablePadding: boolean;
 id: keyof IProduct;
 label: string;
 size?: number;
 needSorting: boolean;
 align?: 'center' | 'left' | 'right';
}

interface EnhancedTableProps {
 onRequestSort: (
  event: React.MouseEvent<unknown>,
  property: keyof IProduct
 ) => void;
 order: Order;
 orderBy: string;
}

const headCells: HeadCell[] = [
 {
  id: 'productName',
  disablePadding: false,
  label: 'Product Name',
  needSorting: false,
  align: 'left'
 },
 {
  id: 'isStaging',
  disablePadding: false,
  label: 'Is Staging',
  needSorting: false,
  align: 'left'
 },
 {
  id: 'type',
  disablePadding: false,
  label: 'Type',
  needSorting: false,
  align: 'left'
 },
 {
  id: 'typeValue',
  disablePadding: false,
  label: 'Type Value',
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
  (property: keyof IProduct) => (event: React.MouseEvent<unknown>) => {
   onRequestSort(event, property);
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
         //active={true}
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
