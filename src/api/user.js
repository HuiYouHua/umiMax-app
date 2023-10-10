import { request } from '@umijs/max';

export const userLogin = (user) => {
  return request('/login', {
    method: 'POST',
    data: user
  })
}

export const userRegister = (user) => {
  return request('/users', {
    method: 'POST',
    data: user
  })
}