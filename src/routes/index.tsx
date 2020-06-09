import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import HomeLayout from 'layouts/HomeLayout';
import BlankLayout from 'layouts/BlankLayout';

import { Spin } from 'components';

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={<Spin />}>
      <Component {...props}></Component>
    </Suspense>
  );
};

const AntListComponent = lazy(() => import('../pages/AntList'));
const OrderListComponent = lazy(() => import('../pages/OrderList'));
const NotFoundComponent = lazy(() => import('../pages/NotFound'));

export default [
  {
    component: BlankLayout,
    routes: [
      {
        path: '/',
        component: HomeLayout,
        routes: [
          {
            path: '/',
            exact: true,
            render: () => <Redirect to={'/ant'} />,
          },
          {
            path: '/ant',
            key: 'ant',
            component: SuspenseComponent(AntListComponent),
          },
          {
            path: '/custom',
            key: 'custom',
            component: SuspenseComponent(OrderListComponent),
          },
          {
            path: '*',
            component: SuspenseComponent(NotFoundComponent),
          },
        ],
      },
    ],
  },
];
