import { request } from '@umijs/max';

export const goodsAdd = (obj) => {
  return request('/classes/CakeGoods', {
    method: 'POST',
    data: obj,
  });
};

// 商品自动转存
export const goodsExchange = (cakeList, values) => {
  let batchObj = { requests: [] };
  cakeList.forEach((item) => {
    batchObj.requests.push({
      method: 'POST',
      path: '/1.1/classes/CakeGoods',
      body: { ...item, ...values },
    });
  });
  return request('/batch', {
    method: 'POST',
    data: batchObj,
  });
};
