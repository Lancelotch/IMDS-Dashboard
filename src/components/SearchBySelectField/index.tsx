import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useTheme } from '@mui/material';
import { IOptionSearchField } from 'src/models/general';

interface Props {
 onSearchBy: (searchField: IOptionSearchField) => void;
 options: Array<IOptionSearchField>;
 optionSelected: IOptionSearchField;
}

const SearchBySelectField: React.FC<Props> = ({
 onSearchBy,
 options,
 optionSelected
}) => {
 const [open, setOpen] = React.useState(false);
 const anchorRef = React.useRef<HTMLDivElement>(null);

 const handleMenuItemClick = (
  event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  optionSelected: IOptionSearchField
 ) => {
  onSearchBy(optionSelected);
  setOpen(false);
 };

 const handleToggle = () => {
  setOpen((prevOpen) => !prevOpen);
 };

 const handleClose = (event: Event) => {
  if (
   anchorRef.current &&
   anchorRef.current.contains(event.target as HTMLElement)
  ) {
   return;
  }

  setOpen(false);
 };

 const theme = useTheme();

 return (
  <React.Fragment>
   <ButtonGroup
    variant="contained"
    ref={anchorRef}
    aria-label="split button"
    sx={{ width: theme.spacing(50), transform: 'translateX(-14px)' }}
   >
    <Button
     size="small"
     aria-controls={open ? 'split-button-menu' : undefined}
     aria-expanded={open ? 'true' : undefined}
     aria-label="select merge strategy"
     aria-haspopup="menu"
     onClick={handleToggle}
    >
     <ArrowDropDownIcon />
    </Button>
    <Button
     disabled
     sx={{ borderRadius: theme.spacing(0), width: theme.spacing(20) }}
    >
     {optionSelected?.label}
    </Button>
   </ButtonGroup>
   <Popper
    sx={{
     zIndex: 1
    }}
    open={open}
    anchorEl={anchorRef.current}
    role={undefined}
    transition
    disablePortal
   >
    {({ TransitionProps, placement }) => (
     <Grow
      {...TransitionProps}
      style={{
       transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
      }}
     >
      <Paper>
       <ClickAwayListener onClickAway={handleClose}>
        <MenuList id="split-button-menu" autoFocusItem>
         {options.map((option) => (
          <MenuItem
           key={option.value}
           selected={option.value === optionSelected.value}
           onClick={(event) => handleMenuItemClick(event, option)}
          >
           {option.label}
          </MenuItem>
         ))}
        </MenuList>
       </ClickAwayListener>
      </Paper>
     </Grow>
    )}
   </Popper>
  </React.Fragment>
 );
};

export default SearchBySelectField;
