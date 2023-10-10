export default routes = [
  {
    name: '登录',
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    name: '注册',
    path: '/register',
    component: './Login/register',
    layout: false,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '数据统计',
    path: '/home',
    component: './Home',
    icon: 'AreaChartOutlined',
    access: 'isRoot',
  },
  // {
  //   name: '权限演示',
  //   path: '/access',
  //   component: './Access',
  //   icon: 'AliwangwangOutlined',
  // },
  // {
  //   name: ' CRUD 示例',
  //   path: '/table',
  //   component: './Table',
  //   icon: 'TableOutlined'
  // },
  {
    name: '学员管理',
    path: '/stu',
    icon: 'GitlabOutlined',
    routes: [
      {
        name: '学员列表',
        path: '/stu/list',
        component: './Stu/list',
      },
      {
        name: '学员录入',
        path: '/stu/pub',
        component: './Stu/pub',
        access: 'isAdmin',
      },
    ],
  },
  {
    name: '分类管理',
    path: '/category',
    icon: 'WindowsOutlined',
    access: 'isAdmin',
    routes: [
      {
        name: '分类列表',
        path: '/category/catelist',
        component: './Category/catelist',
      },
      {
        name: '分类发布',
        path: '/category/catepub',
        component: './Category/catepub',
      },
    ],
  },
  {
    name: '轮播管理',
    path: '/banner',
    icon: 'RadarChartOutlined',
    routes: [
      {
        name: '轮播列表',
        path: '/banner/list',
        component: './Banner/list',
      },
      {
        name: '轮播发布',
        path: '/banner/pub',
        component: './Banner/pub',
      },
      {
        name: '轮播编辑',
        path: '/banner/edit',
        component: './Banner/edit',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '商品管理',
    path: '/goods',
    icon: 'ShoppingOutlined',
    access: 'isAdmin',
    routes: [
      {
        name: '商品列表',
        path: '/goods/list',
        component: './Goods/list',
      },
      {
        name: '商品发布',
        path: '/goods/pub',
        component: './Goods/pub',
      },
    ],
  },
  {
    name: '状态管理',
    path: '/dva',
    icon: 'CodepenOutlined',
    routes: [
      {
        name: '消息中心',
        path: '/dva/notice',
        component: './Dva/notice',
      },
    ],
  },
  {
    name: '配送范围',
    path: '/area',
    component: './Area',
    icon: 'AreaChartOutlined',
  },
  {
    name: '系统设置',
    path: '/system',
    icon: 'SettingOutlined',
    access: 'isRoot',
    routes: [
      {
        name: '角色管理',
        path: '/system/roleManager',
        component: './System/roleManager',
      },
      {
        name: '用户管理',
        path: '/system/userManager',
        component: './System/userManager',
      },
    ],
  },
];
