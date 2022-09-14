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
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TooltipCustomize from 'src/components/TooltipCustomize';
import {
  ChangeEventHandler,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react';
import Confirmation from 'src/components/Confirmation';
import { useLocation } from 'react-router';
import Empty from 'src/components/Empty';
import TableHeader from './Header';
import { IAction, ITableAtribute } from 'src/models/general';
import SearchIcon from '@mui/icons-material/Search';
import { useRole } from 'src/services/role/useRole';

const CustomButton = styled(Button)(
  ({ theme }) => `
    min-width: unset;
    max-height: ${theme.spacing(3)};
    padding-left: ${theme.spacing(2.8)};
    padding-right: ${theme.spacing(2.8)};
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    border-radius: 8px;
      `
);

const FabSmall = styled(Fab)(
  ({ theme }) => `
        min-height: unset;
        background-color: transparent;
        width: ${theme.spacing(3)};
        height: ${theme.spacing(3)};
        color: #E35200;
        border: 1px solid #E35200;
    
      `
);

const TableRole = () => {
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [fieldId, setFieldId] = useState<string>();
  const [editingLabelVal, setEditingLabelVal] = useState<Array<any>>();
  const [openEditLabel, setOpenEditLabel] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const { getRoleList } = useRole();

  const handleChangeSearch = (value: string) => {
    setSearch(value);
  };
  const handleClickSearch = () => {};

  const optionLimits = [10, 25, 50, 100];

  const handleClickEdit = function (label: any) {
    setEditingLabelVal(label);
    setOpenEditLabel(true);
  };

  const handleClickDelete = (id: string) => {
    setOpenConfirmation(true);
    setFieldId(id);
  };

  const deleteLabelHandler = () => {};

  const handleOk = function () {};

  const initialTableAttribute: ITableAtribute = {
    columnName: '',
    limit: 20,
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

  const handleChangeLimit = (limit: number) => {
    dispatchTable({
      type: 'limit',
      payload: { limit: limit }
    });
  };

  const handleChangePage = (page: number) => {
    dispatchTable({
      type: 'page',
      payload: { page: page }
    });
  };

  useEffect(() => {
    getRoleList({ page: 1, limit: 10 });
  }, []);

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
            <Table
              sx={{ minWidth: 650 }}
              size="medium"
              aria-label="simple table"
            >
              <TableHeader
                order={stateTable.sortingMethod}
                orderBy={stateTable.columnName}
                onRequestSort={handleSort}
              />
              <TableBody>
                <TableRow>
                  <TableCell align="center" padding="none">
                    1
                  </TableCell>
                  <TableCell align="left" padding="none">
                    1
                  </TableCell>
                  <TableCell align="center" padding="none">
                    1
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Confirmation
          onClose={() => setOpenConfirmation(false)}
          onOk={handleOk}
          open={openConfirmation}
          labelButton="Delete"
          title="Are you sure want to remove?"
          message="This might be effect your data, consider that what has been deleted cannot be recover."
        />
      </Card>
    </>
  );
};

export default TableRole;
