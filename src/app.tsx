// 运行时配置
import { RunTimeLayoutConfig, history } from '@umijs/max';
import { message } from 'antd';
import type { RequestConfig } from 'umi';
import { errorConfig } from './requestErrorConfig';
import './utils/init-leancloud-sdk';

import HeaderDropMenu from '@/components/HeaderDropMenu';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
// export async function getInitialState(): Promise<{ name: string }> {
export async function getInitialState() {
  let userState = {
    isLogin: false,
    userInfo: null,
  };

  const info =
    localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
  if (info) {
    userState = {
      isLogin: true,
      userInfo: JSON.parse(info),
    };
  }

  console.log('getInitialState 运行时配置', userState);
  return userState;
}

export const layout: RunTimeLayoutConfig = (initialState) => {
  return {
    title: '@umijs/max',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    dva: {
      immer: true, // 不可变数据处理
      extraModels: [],
    },
    headerContentRender: () => {
      return <div>管理控制台 </div>;
    },
    // headerContentRender: (props) => {
    //   return <div>管理控制台 </div>
    // },
    // avatarProps: () => {
    //   return <div>管理控制台 </div>;
    // },
    actionsRender: () => {
      return [<HeaderDropMenu />];
    },
    layout: 'mix', // 菜单模式,side：右侧导航，top：顶部导航
    // avatarProps: {
    //   // src: initialState?.currentUser?.avatar,
    //   icon: <MenuFoldOutlined />,
    //   title: <span>huayoyu</span>,
    //   render: (_, defaultDom) => {
    //     // return <HeaderDropMenu>{defaultDom}</HeaderDropMenu>
    //     return <HeaderDropMenu />
    //   }
    // },
    onPageChange: (location: Location) => {
      // 页面切换时触发
      console.log('页面切换时触发', initialState, location);
      const { isLogin } = initialState.initialState;
      if (isLogin === false) {
        //进行登录校验
        history.push('/login');
      }
    },
  };
};

export const request = {
  ...errorConfig,
};