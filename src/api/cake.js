import { request } from '@umijs/max';

export const bannerAdd = (bannerObj) => {
  return request('/classes/CakeBanner', {
    method: 'POST',
    data: bannerObj,
  });
};

export const bannerGet = () => {
  return request('/classes/CakeBanner', {
    method: 'GET'
  });
};

export const bannerDel = (objId) => {
  return request(`/classes/CakeBanner/${objId}`, {
    method: 'DELETE'
  });
};

export const bannerUpdate = (objId, bannerObj) => {
  return request(`/classes/CakeBanner/${objId}`, {
    method: 'PUT',
    data: bannerObj
  });
};