import request from '@/utils/request'

export default {
  getSoftResource(softName) {
    return request({
      url: '/data-clean/view/getResourceData',
      method: 'get',
      params: {
        softName: softName
      }
    })
  },
  sendVerifyResult(data) {
    return request({
      url: '/data-clean/view/dataCleanMethod',
      method: 'post',
      data: data
    })
  }
}
