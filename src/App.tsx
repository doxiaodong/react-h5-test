import React, { lazy } from 'react';
import { renderRoutes } from 'react-router-config';
import { HashRouter, Route } from 'react-router-dom';
import { LocaleProvider } from 'antd-mobile';
import antdEnUS from 'antd-mobile/lib/locale-provider/en_US';
import routes from 'routes';
import _ from 'lodash';
import 'assets/style.less';
import './rem';

interface LocaleMap {
  [index: string]: any;
}

const localeMap: LocaleMap = {
  'zh-CN': {
    antd: {},
    intl: 'zh-CN',
  },
  'en-US': {
    antd: antdEnUS,
    intl: 'en-US',
  },
};

function App() {
  const lang = window.localStorage.getItem('language') || navigator.language;
  return (
    <LocaleProvider locale={_.get(localeMap[lang], 'antd', {})}>
      <HashRouter>{renderRoutes(routes)}</HashRouter>
    </LocaleProvider>
  );
}

export default App;
