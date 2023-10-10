// 动态生成权限数据
export default (initialState) => {
  console.log('权限文件', initialState);
  const { userInfo } = initialState;
  const role = userInfo?.role
  console.log(role);

  return {
    isRoot: role === 'root',
    isAdmin: role === 'admin' || role === 'root',
    isWorker: true,
  };
};
