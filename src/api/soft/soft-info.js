import request from '@/utils/request'

export default {
  // 获取当前系统中存在的软件交易信息
  getSoftList() {
    return request({
      url: '/soft/list',
      method: 'get'
    })
  },
  // 添加被测软件的相关信息资料
  addSoft(softInfo) {
    return request({
      url: '/soft/add',
      method: 'post',
      data: softInfo
    })
  },
  // 审核当前被测软件
  softVerify(id) {
    return request({
      url: '/soft/verity/' + id,
      method: 'post'
    })
  },

  fetchPendingNums() {
    return request({
      url: '/soft/PendingNums',
      method: 'get'
    })
  },
  fetchRejectNums() {
    return request(({
      url: '/soft/RejectNums',
      method: 'get'
    }))
  },
  fetchHandledNums() {
    return request({
      url: '/soft/HandledNums',
      method: 'get'
    })
  },
  fetchGetAllPending() {
    return request({
      url: '/soft/getAllPending',
      method: 'get'
    })
  },
  fetchGetAllReject() {
    return request({
      url: '/soft/getAllReject',
      method: 'get'
    })
  },
  fetchGetAllHandled() {
    return request({
      url: '/soft/getAllHandled',
      method: 'get'
    })
  },
  fetchExamineSoftSuccess(id) {
    return request({
      url: '/soft/examineSoftSuccess',
      method: 'get',
      param: id
    })
  },
  fetchExamineSoftFail(id) {
    return request({
      url: '/soft/examineSoftFail',
      method: 'get',
      param: id
    })
  }
}
