const path = require('path');
const { override, fixBabelImports, addLessLoader, addPostcssPlugins } = require('customize-cra');
// const AntDesignThemePlugin = require('@didi/dantd/dist/theme/antd-theme-webpack-plugin');

// 打包配置
const addCustomize = () => config => {
  if (process.env.NODE_ENV === 'production') {
    config.output.publicPath = '/react-h5-test/';
  }
  return config;
};

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
  }),
  addPostcssPlugins([
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*'],
      // propList: ['*', '!border*', '!font-size*', '!letter-spacing'],
      // propWhiteList: []
    }),
  ]),
  addCustomize(),
);
