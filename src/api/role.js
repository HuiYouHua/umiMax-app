import { request } from '@umijs/max';

export const roleAdd = (user) => {
  return request('/classes/CakeRole', {
    method: 'POST',
    data: user,
  });
};

export const roleGet = () => {
  return request('/classes/CakeRole', {
    method: 'GET',
  })
}
