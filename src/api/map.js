import { request } from '@umijs/max';

export const mapAdd = (areaObj) => {
  return request('/classes/CakeArea', {
    method: 'POST',
    data: areaObj,
  });
};

export const mapGet = (city) => {
  return request(`/classes/CakeArea?where={"city":"${city}"}`, {
    method: 'GET',
  });
};

export const mapUpdate = (objectId, areaObj) => {
  return request(`/classes/CakeArea/${objectId}`, {
    method: 'PUT',
    data: areaObj,
  });
};
