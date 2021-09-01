import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/soft-test-center/user/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/soft-test-center/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/soft-test-center/user/logout',
    method: 'post'
  })
}
