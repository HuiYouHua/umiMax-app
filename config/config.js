import { defineConfig } from '@umijs/max';
import routes from './routes';
export default defineConfig({
  antd: { dark: true },
  access: {},
  model: {},
  initialState: {},
  request: { dataField: '' },
  layout: {},
  dva: {},
  routes,
  npmClient: 'yarn',
  styledComponents: {},
  define: {
    'process.env': process.env,
  },
  proxy: {
    '/classes': {
      // 标识需要进行转换的请求的url
      target: process.env.BASE_URL, // 服务端域名
      changeOrigin: true, // 允许域名进行转换
      // pathRewrite: { '^/classes': '' }, // 将请求url里的ci去掉
    },
  },
});
