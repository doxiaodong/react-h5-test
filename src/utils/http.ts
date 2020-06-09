import 'whatwg-fetch';
import queryString from 'query-string';
import { Toast } from 'antd-mobile';
import { listData } from './mock';
const SSO_FETCH_TIMEOUT = 1000;

export function getCookieByName(name) {
  const cookieStr = window.document.cookie;
  const cookieArr = cookieStr.split(', ');
  let cookieObj = {};
  for (var i = 0; i < cookieArr.length; i++) {
    var cur = cookieArr[i].split('=');
    cookieObj[cur[0]] = cur[1];
  }
  return cookieObj[name];
}

/**
 * post a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function httpPost(url: string, body: any, options?: any) {
  const defaultOptions = {
    credentials: 'include',
    method: 'POST',
  } as any;
  if (window.document.cookie) {
    defaultOptions.headers = {
      Cookie: window.document.cookie,
    };
  }
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(body);
  }

  return fetch(url, newOptions).then(response => {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('text/plain') >= 0) {
      return response.text();
    }

    if (contentType && contentType.indexOf('application/json') >= 0) {
      return response.json();
    }

    return response;
  });
  // .catch(error => {
  //   if (error.code) {
  //     Toast.fail(error.name);
  //   }
  //   if ('stack' in error && 'message' in error) {
  //     Toast.fail(`请求错误${error}`);
  //   }
  //   return error;
  // });
}

/**
 * post a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function httpPut(url: string, options?: any) {
  const defaultOptions = {
    credentials: 'include',
    method: 'PUT',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(url, newOptions)
    .then(response => response.json())
    .catch(error => {
      if (error.code) {
        Toast.fail(error.name);
      }
      if ('stack' in error && 'message' in error) {
        Toast.fail(`请求错误${error}`);
      }
      return error;
    });
}

/**
 * post a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function httpGet(url: string, options: any = {}) {
  const defaultOptions = {
    method: 'GET',
    credentials: 'include',
  } as any;
  let didTimeOut = false;
  if (window.document.cookie) {
    defaultOptions.headers = {
      Cookie: window.document.cookie,
    };
  }
  const newOptions = { ...defaultOptions, ...options };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(listData);
    }, 500);
  });
}

/**
 * delete a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function httpDelete(url: string, options?: any) {
  const defaultOptions = {
    credentials: 'include',
    method: 'DELETE',
  };
  const newOptions = {
    ...defaultOptions,
    ...options,
  };

  return fetch(url, newOptions)
    .then(response => response.json())
    .catch(error => {
      if (error.code) {
        Toast.fail(error.name);
      }
      if ('stack' in error && 'message' in error) {
        Toast.fail(`请求错误${error}`);
      }
      return error;
    });
}

export default {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  delete: httpDelete,
};
