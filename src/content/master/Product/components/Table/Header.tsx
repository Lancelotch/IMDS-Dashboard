import React from 'react';
import {
 TableHead,
 TableRow,
 TableCell,
 TableSortLabel,
 Checkbox,
 useTheme
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { IPayloadSort, Order } from 'src/models/general';
import { IProduct } from 'src/models/product';

import FilterNoneIcon from '@mui/icons-material/FilterNone';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

interface HeadCell {
 disablePadding: boolean;
 id: keyof IProduct;
 label: string;
 size?: number;
 needSorting: boolean;
 align?: 'center' | 'left' | 'right';
}

interface EnhancedTableProps {
 onRequestSort: (payload: IPayloadSort<IProduct>) => void;
 order: Order;
 orderBy: string;
 rowCount: number;
 numSelected: number;
 onSelectAllClick: (
  event: React.ChangeEvent<HTMLInputElement>,
  checked: boolean
 ) => void;
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
 orderBy,
 numSelected,
 onSelectAllClick,
 rowCount
}) => {
 const createSortHandler =
  (property: keyof IProduct) => (event: React.MouseEvent<unknown>) => {
   onRequestSort({
    columnName: property,
    sortingMethod: order === 'asc' ? 'desc' : 'asc'
   });
  };

 const theme = useTheme();
 return (
  <TableHead>
   <TableRow>
    <TableCell padding="checkbox" sx={{ width: '4%' }}>
     <Checkbox
      indeterminate={numSelected > 0 && numSelected < rowCount}
      checked={numSelected - rowCount === 0}
      size="small"
      sx={{
       ml: theme.spacing(0.5),
       backgroundColor: theme.palette.primary.main
      }}
      icon={
       <FilterNoneIcon
        sx={{
         color: theme.palette.common.white,
         width: theme.spacing(2.5),
         height: theme.spacing(2.5)
        }}
       />
      }
      checkedIcon={
       <LibraryAddCheckIcon
        sx={{
         color: theme.palette.common.white,
         width: theme.spacing(2.5),
         height: theme.spacing(2.5)
        }}
       />
      }
      indeterminateIcon={
       <IndeterminateCheckBoxIcon
        sx={{
         color: theme.palette.common.white,
         width: theme.spacing(2.5),
         height: theme.spacing(2.5)
        }}
       />
      }
      onChange={onSelectAllClick}
     />
    </TableCell>
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
