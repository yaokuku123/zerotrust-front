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
  // 修改被测软件的相关信息资料
  updateSoft(softId,softInfo) {
    return request({
      url: '/soft/update/'+softId,
      method: 'post',
      data: softInfo
    })
  },
  // 获取被测软件的相关信息资料
  getSoft(softId) {
    return request({
      url: '/soft/get/'+softId,
      method: 'get'
    })
  },
  // 审核当前被测软件
  softVerify(id) {
    return request({
      url: '/soft/verity/' + id,
      method: 'post'
    })
  },
  //删除文件路径字段
  deleteFile(id){
    return request({
      url: '/soft/deleteFile/' + id,
      method: 'post'
    })
  },

  featchPendingNums() {
    return request({
      url: '/soft/PendingNums',
      method: 'get'
    })
  },
  featchHandledNums() {
    return request({
      url: '/soft/HandledNums',
      method: 'get'
    })
  },
  featchGetAllPending() {
    return request({
      url: '/soft/getAllPending',
      method: 'get'
    })
  },
  featchGetAllReject() {
    return request({
      url: '/soft/getAllReject',
      method: 'get'
    })
  },
  featchGetAllHandled() {
    return request({
      url: '/soft/getAllHandled',
      method: 'get'
    })
  },
  featchExamineSoftSuccess(id) {
    return request({
      url: '/soft/examineSoftSuccess',
      method: 'get',
      param: id
    })
  },
  featchExamineSoftFail(id) {
    return request({
      url: '/soft/examineSoftFail',
      method: 'get',
      param: id
    })
  }
}
