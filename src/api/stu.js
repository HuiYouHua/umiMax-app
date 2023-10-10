import { request } from '@umijs/max';

export const stuAdd = (obj) => {
  return request('/classes/stu', {
    method: 'POST',
    data: obj,
  });
};

export const stuGet = () => {
  return request('/classes/stu', {
    method: 'GET',
  });
};

export const stuDel = (objId) => {
  return request(`/classes/stu/${objId}`, {
    method: 'DELETE',
  });
};
