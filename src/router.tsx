import { Suspense, lazy, FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { USERS_SIGN_IN } from './route';
import { useRole } from './services/role/useRole';
import { useAppSelector } from './app/hooks';

interface IProtectedRouter {
 isAuth: boolean;
 children: React.ReactChild;
}

const LoaderMetaData = ({ children }) => {
 const { getRoleMenuSideBarList } = useRole();
 const userJson = window.localStorage.getItem('user');
 const user = JSON.parse(userJson);
 useEffect(() => {
  getRoleMenuSideBarList({
   roleId: user?.roleId
  });
 }, []);

 return <>{children}</>;
};

const ProtectedRouter: FC<IProtectedRouter> = ({ children, isAuth }) => {
 return (
  <>
   {!isAuth ? (
    <Navigate to={USERS_SIGN_IN} />
   ) : (
    <LoaderMetaData>{children}</LoaderMetaData>
   )}
  </>
 );
};

const Loader = (Component) => (props) =>
 (
  <Suspense fallback={<SuspenseLoader />}>
   <Component {...props} />
  </Suspense>
 );

// Home
const Home = Loader(lazy(() => import('src/content/Home')));

// Core
const Role = Loader(lazy(() => import('src/content/core/Role')));
const RoleMenu = Loader(lazy(() => import('src/content/core/RoleMenu')));
const InternalUser = Loader(
 lazy(() => import('src/content/core/InternalUser'))
);

// Core
const Customer = Loader(lazy(() => import('src/content/master/Customer')));
const Product = Loader(lazy(() => import('src/content/master/Product')));
const Package = Loader(lazy(() => import('src/content/master/Package')));
const CustomerProduct = Loader(
 lazy(() => import('src/content/master/CustomerProduct'))
);

//topic
const Topic = Loader(lazy(() => import('src/content/master/Topic')));

// User
const SignIn = Loader(lazy(() => import('src/content/user/SignIn')));

// Status
const Status404 = Loader(
 lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
 lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
 lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
 lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes = (isAuthenticated: boolean): RouteObject[] => {
 return [
  {
   path: '',
   element: <BaseLayout />,
   children: [
    {
     path: '/',
     element: <Navigate to="home" replace />
    },
    {
     path: 'status',
     children: [
      {
       path: '',
       element: <Navigate to="404" replace />
      },
      {
       path: '404',
       element: <Status404 />
      },
      {
       path: '500',
       element: <Status500 />
      },
      {
       path: 'maintenance',
       element: <StatusMaintenance />
      },
      {
       path: 'coming-soon',
       element: <StatusComingSoon />
      }
     ]
    },
    {
     path: '*',
     element: <Status404 />
    }
   ]
  },
  {
   path: '',
   element: (
    <ProtectedRouter isAuth={isAuthenticated}>
     <SidebarLayout />
    </ProtectedRouter>
   ),
   children: [
    {
     path: 'home',
     element: <Home />
    }
   ]
  },
  {
   path: 'core',
   element: (
    <ProtectedRouter isAuth={isAuthenticated}>
     <SidebarLayout />
    </ProtectedRouter>
   ),
   children: [
    {
     path: '',
     element: <Navigate to="role" replace />
    },
    {
     path: 'role',
     element: <Role />
    },
    {
     path: 'role_menu/:id',
     element: <RoleMenu />
    },
    {
     path: 'internal_user',
     element: <InternalUser />
    }
   ]
  },
  {
   path: 'master',
   element: (
    <ProtectedRouter isAuth={isAuthenticated}>
     <SidebarLayout />
    </ProtectedRouter>
   ),
   children: [
    {
     path: '',
     element: <Navigate to="role" replace />
    },
    {
     path: 'customer',
     element: <Customer />
    },
    {
     path: 'product',
     element: <Product />
    },
    {
     path: 'package',
     element: <Package />
    },
    {
     path: 'customer_product',
     element: <CustomerProduct />
    },
    {
     path: 'topic',
     element: <Topic />
    }
   ]
  },
  {
   path: 'users',
   element: <BaseLayout />,
   children: [
    {
     path: 'sign_in',
     element: isAuthenticated ? <Navigate to={'/'} replace /> : <SignIn />
    }
   ]
  }
 ];
};

export default routes;
