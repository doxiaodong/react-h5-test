import queryString from 'query-string';

export function getAPIOrigin() {
  return 'http://127.0.0.1:8080';
  // return process.env.ODIN_ENV === 'odin' && process.env.NODE_ENV === 'production' ? '/' : '/';
}

/**
 * formatUrl 处理Url
 * @export
 * @param {*} url 需要处理的url，比如 /deploy/order/:id
 * @param {*} params 需要处理的参数 ，比如 {id: 123}
 * @param {*} query 需要处理的参数 ，比如 {id: 123}
 * @returns
 */
export function formatUrl(url: string): string;
export function formatUrl(url: string, params?: object): string;
export function formatUrl(url: string, params?: object, query?: object): string;
export function formatUrl(url: string, params?: object, query?: object): string {
  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      var regex = new RegExp(`:${paramKey}`, 'i');
      url = url.replace(regex, paramValue);
    });
  }

  if (query) {
    url = `${url}?${queryString.stringify(query)}`;
  }

  return url;
}

let api = {
  check: '/sso/check',
  orderList: '/deploy/order',
  orderPendingList: '/order/pending',
  orderMyList: '/order/my',
  orderDetail: '/order/detail/:id',
  orderApprove: '/order/detail/:id/approve',
  orderReject: '/order/detail/:id/reject',
  orderSkip: '/order/detail/:id/skip',
  orderUndo: '/order/detail/:id/undo',
};

const newApi = Object.entries(api)
  .map(([odinKey, odinVal]) => {
    return {
      [odinKey]: `${getAPIOrigin()}${odinVal}`,
    };
  })
  .reduce((odinItem, target) => {
    return {
      ...target,
      ...odinItem,
    };
  }, {});

// const odinApi = {
//   check: '/sso/check',
// };

// export const newOdinApi = Object.entries(odinApi)
//   .map(([odinKey, odinVal]) => {
//     return {
//       [odinKey]: `${getOdinAPIOrigin()}${odinVal}`,
//     };
//   })
//   .reduce((odinItem, target) => {
//     return {
//       ...target,
//       ...odinItem,
//     };
//   }, {});

export default newApi;
