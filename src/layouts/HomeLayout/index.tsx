import React, { useEffect, useState } from 'react';
import { TabBar } from 'antd-mobile';
import { useLocation, useHistory } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { useSessionStorageState } from '@umijs/hooks';
import { Icon, ErrorBoundary, Spin } from 'components';
import useError from 'hooks/useError';
import Http from 'utils/http';
import Api, { formatUrl } from 'utils/api';

import './style.less';
export const TabsConfig = [
  {
    title: 'ant列表',
    key: 'ant',
    path: '/ant',
    icon: 'tissue',
  },
  {
    title: '自定义列表',
    key: 'custom',
    path: '/custom',
    icon: 'toilet-paper',
  },
];

const Layout = ({ route }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatchError = useError();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [username, setUsername] = useSessionStorageState<string>('username');

  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkLogin = async () => {
    const params = { callback: window.location.href } as any;
    const checkUrl = formatUrl(Api.check, {}, params);
    // 魔镜
    window.taotieCommandQueue = window.taotieCommandQueue || [];
    window.taotieCommandQueue.push({
      command: 'setCookieSystemNameForTaotie',
      parameter: 'Odin',
    });
    try {
      const response = await Http.get(checkUrl, { timeout: 1000 });
      if (!username) {
        setUsername(response as string);
        window.taotieCommandQueue.push({
          command: 'setCookieUserNameForTaotie',
          parameter: response,
        });
        window.location.reload();
      }
    } catch (error) {
      // setError(error);
      // throw new Error(error.message);
      // console.info(error);
      dispatchError(new Error(error.message));
    }
  };

  return (
    <div className="l-home-layout">
      <TabBar barTintColor="white" tabBarPosition="bottom" prerenderingSiblingsNumber={0}>
        {TabsConfig.map(tabItem => {
          return (
            <TabBar.Item
              title={tabItem.title}
              key={tabItem.key}
              icon={<Icon name={tabItem.icon} />}
              selectedIcon={<Icon name={tabItem.icon} />}
              selected={location.pathname === tabItem.path}
              onPress={() => {
                history.push(tabItem.path);
              }}
            ></TabBar.Item>
          );
        })}
      </TabBar>
      <div className="app-root">{renderRoutes(route.routes)}</div>
    </div>
  );
};

const LayoutWithErrorBoundary = props => (
  <ErrorBoundary {...props}>
    <Layout {...props} />
  </ErrorBoundary>
);

export default LayoutWithErrorBoundary;
