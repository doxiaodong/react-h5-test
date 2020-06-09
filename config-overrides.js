const path = require('path');
const {
  override,
  fixBabelImports,
  addLessLoader,
  addPostcssPlugins,
  setWebpackPublicPath,
} = require('customize-cra');
// const AntDesignThemePlugin = require('@didi/dantd/dist/theme/antd-theme-webpack-plugin');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
  }),
  setWebpackPublicPath('/react-h5-test'),
  addPostcssPlugins([
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*'],
      // propList: ['*', '!border*', '!font-size*', '!letter-spacing'],
      // propWhiteList: []
    }),
  ]),
);
