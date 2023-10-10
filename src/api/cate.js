import { request } from '@umijs/max';

export const cateAdd = (cateObj) => {
  return request('/classes/CakeCate', {
    method: 'POST',
    data: cateObj,
  });
};

export const cateGet = () => {
  return request('/classes/CakeCate', {
    method: 'GET',
  });
};

export const cateDel = (objId) => {
  return request(`/classes/CakeCate/${objId}`, {
    method: 'DELETE'
  });
};