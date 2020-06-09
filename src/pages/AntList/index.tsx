import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Api from 'utils/api';
import RouteLayout from 'layouts/RouteLayout';
import TabContent from './TabContent';

const OrderList = props => {
  const location = useLocation();
  const history = useHistory();
  const search = queryString.parse(location.search);
  return (
    <div>
      <RouteLayout pathname="/ant">
        <TabContent url={Api.orderMyList} />
      </RouteLayout>
    </div>
  );
};

export default OrderList;
