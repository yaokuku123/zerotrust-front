import request from '@/utils/request'

export default {
  // 获取当前系统中存在的软件交易信息
  insert(data) {
    return request({
      url: '/soft/updateInfo',
      method: 'post',
      data: data
    })
  },
  update(data) {
    return request({
      url: '/soft/updateInfo',
      method: 'post',
      data: data
    })
  },
  getSoftInfo(pid) {
    return request({
      url: '/soft/getInfo',
      method: 'get',
      params: {
        pid: pid
      }
    })
  }
}
