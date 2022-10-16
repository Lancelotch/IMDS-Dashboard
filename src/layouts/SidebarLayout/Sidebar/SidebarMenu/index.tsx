import { useContext } from 'react';

import {
 ListSubheader,
 alpha,
 Box,
 List,
 styled,
 Button,
 ListItem
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';

import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import TopicIcon from '@mui/icons-material/Topic';
import {
 CORE_INTERNAL_USER,
 CORE_ROLE,
 MASTER_CUSTOMER,
 MASTER_CUSTOMER_PRODUCT,
 MASTER_PACKAGE,
 MASTER_PRODUCT,
 MASTER_TOPIC
} from 'src/route';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { IRoleMenuRecursive } from 'src/models/role';
import { reducerUpdateMenuRole } from 'src/redux/role';

const MenuWrapper = styled(Box)(
 ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
 ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                 'transform',
                 'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
 //  const { closeSidebar } = useContext(SidebarContext);
 const roleMenuSideBarList = useAppSelector(
  (store) => store.storeRole.roleMenuSideBarList
 );
 const dispatch = useAppDispatch();
 const handleClick = function (subMenu: IRoleMenuRecursive) {
  dispatch(reducerUpdateMenuRole(subMenu));
 };

 return (
  <MenuWrapper>
   {roleMenuSideBarList.data.map((menuSideBar) => (
    <List
     key={menuSideBar.id}
     component="div"
     subheader={
      <ListSubheader component="div" disableSticky>
       {menuSideBar.menuName}
      </ListSubheader>
     }
    >
     <SubMenuWrapper>
      <List component="div">
       {menuSideBar.children.map((subMenu) => (
        <ListItem component="div" key={subMenu.id}>
         <Button
          disableRipple
          component={RouterLink}
          onClick={() => handleClick(subMenu)}
          to={`/${subMenu.url}`}
         >
          {subMenu.menuName}
         </Button>
        </ListItem>
       ))}
      </List>
     </SubMenuWrapper>
    </List>
   ))}
  </MenuWrapper>
 );
 //  return (
 //   <>
 //    <MenuWrapper>
 //     <List
 //      component="div"
 //      subheader={
 //       <ListSubheader component="div" disableSticky>
 //        Security
 //       </ListSubheader>
 //      }
 //     >
 //      <SubMenuWrapper>
 //       <List component="div">
 //        <ListItem component="div">
 //         <Button
 //          disableRipple
 //          component={RouterLink}
 //          onClick={closeSidebar}
 //          to={CORE_ROLE}
 //          startIcon={<AccessibilityIcon />}
 //         >
 //          Role
 //         </Button>
 //        </ListItem>
 //        <ListItem component="div">
 //         <Button
 //          disableRipple
 //          component={RouterLink}
 //          onClick={closeSidebar}
 //          to={CORE_INTERNAL_USER}
 //          startIcon={<AccountCircleIcon />}
 //         >
 //          Internal User
 //         </Button>
 //        </ListItem>
 //       </List>
 //      </SubMenuWrapper>
 //     </List>
 //     <List
 //      component="div"
 //      subheader={
 //       <ListSubheader component="div" disableSticky>
 //        Master Form Parameter
 //       </ListSubheader>
 //      }
 //     >
 //      <SubMenuWrapper>
 //       <List component="div">
 //        <ListItem component="div">
 //         <Button
 //          disableRipple
 //          component={RouterLink}
 //          onClick={closeSidebar}
 //          to={MASTER_CUSTOMER}
 //          startIcon={<PersonIcon />}
 //         >
 //          Customer
 //         </Button>
 //        </ListItem>
 //        <ListItem component="div">
 //         <Button
 //          disableRipple
 //          component={RouterLink}
 //          onClick={closeSidebar}
 //          to={MASTER_PRODUCT}
 //          startIcon={<CategoryIcon />}
 //         >
 //          Product
 //         </Button>
 //        </ListItem>
 //        <ListItem component="div">
 //         <Button
 //          disableRipple
 //          component={RouterLink}
 //          onClick={closeSidebar}
 //          to={MASTER_PACKAGE}
 //          startIcon={<InventoryIcon />}
 //         >
 //          Package
 //         </Button>
 //        </ListItem>
 //        <ListItem component="div">
 //         <Button
 //          disableRipple
 //          component={RouterLink}
 //          onClick={closeSidebar}
 //          to={MASTER_CUSTOMER_PRODUCT}
 //          startIcon={<PersonIcon />}
 //         >
 //          Customer Product
 //         </Button>
 //        </ListItem>
 //        <ListItem component="div">
 //         <Button
 //          disableRipple
 //          component={RouterLink}
 //          onClick={closeSidebar}
 //          to={MASTER_TOPIC}
 //          startIcon={<TopicIcon />}
 //         >
 //          Topic
 //         </Button>
 //        </ListItem>
 //       </List>
 //      </SubMenuWrapper>
 //     </List>
 //    </MenuWrapper>
 //   </>
 //  );
}

export default SidebarMenu;
