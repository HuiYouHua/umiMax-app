import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';

export const errorConfig: RequestConfig = {
  timeout: 1000,
  errorConfig: {
    // 错误接收及处理
    errorHandler() {},
    // 错误抛出
    errorThrower() {},
  },
  requestInterceptors: [
    // 请求拦截器
    (url, options) => {
      console.log('请求拦截器', url, options);
      options.baseURL = process.env.BASE_URL;
      options.headers = {
        'X-LC-Id': process.env.LEARNCLOUD_ID,
        'X-LC-Key': process.env.LEARNCLOUD_KEY,
      };
      return { url, options };
    },
  ],
  responseInterceptors: [
    // 直接写一个 function，作为拦截器
    (response) => {
      // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
      const { data = {} as any, config } = response;
      console.log('响应拦截器', data, config, config.url, response);

      if ((data.objectId, !unAcceptUrls.includes(config.url))) {
        const method = config.method.toLowerCase();
        if (method === 'post') {
          if (config.url === '/users') {
            message.success('注册成功!');
          } else {
            message.success('新增成功!');
          }
        }
        if (method === 'put') {
          message.success('更新成功!');
        }
      }

      // 这里一开始是在config.js中设置 request: { dataField: 'results' }, 统一拿到结果数据
      // 但是登录接口没有results字段, 所以这里讲 response 中的 data数据更新为解构results后的数据
      const result = data.results ?? data;
      return { ...response, data: result };
      // return response;
    },
  ],
};

const unAcceptUrls = ['/login'];
