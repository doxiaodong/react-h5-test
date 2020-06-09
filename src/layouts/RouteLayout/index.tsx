import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './style.less';

interface IRouteProps {
  pathname: string;
  children?: React.ReactNode;
}

const RouteLayout = (props: IRouteProps) => {
  const location = useLocation();
  const routeCls = classNames({
    'l-route-layout': true,
    'l-route-layout-hide': props.pathname !== location.pathname,
  });
  return <div className={routeCls}>{props.children}</div>;
};

export default RouteLayout;
