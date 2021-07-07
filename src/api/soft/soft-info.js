import request from '@/utils/request'

export default {
  getSoftList() {
      return request({
          url: '/soft/list',
          method: 'get'
        })
  }
}
