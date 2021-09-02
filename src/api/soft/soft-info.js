import request from '@/utils/request'

export default {
  // 传回审核结果
  sendVerifyResult(verifyResult) {
    return request({
      url: '/data-clean/review/verifyResult',
      method: 'post',
      data: verifyResult
    })
  },
  // 获取字段信息来审核
  getFiledMessage(softName) {
    return request({
      url: '/data-clean/review/getCleanFields',
      method: 'get',
      params: {
        softName: softName
      }
    })
  },
  // 传回字段以及数据清理等级
  transferField(fieldInfo, fileName, tableName) {
    return request({
      url: '/data-clean/fieldRecord?fileName=' + fileName + "&tableName=" + tableName,
      method: 'post',
      data: fieldInfo
    })
  },
  //获取字段
  getSoftField(tableName) {
    return request({
      url: '/data-clean/dataFiled',
      method: 'get',
      params: {
        tableName: tableName
      }
    }
    )
  },
  // 获取当前系统中存在的软件交易信息
  getSoftList() {
    return request({
      url: '/soft-test-center/soft/list',
      method: 'get'
    })
  },
  // 添加被测软件的相关信息资料
  addSoft(softInfo) {
    return request({
      url: '/soft-test-center/soft/add',
      method: 'post',
      data: softInfo
    })
  },
  // 修改被测软件的相关信息资料
  updateSoft(softId, softInfo) {
    return request({
      url: '/soft-test-center/soft/update/' + softId,
      method: 'post',
      data: softInfo
    })
  },
  // 获取被测软件的相关信息资料
  getSoft(softId) {
    return request({
      url: '/soft-test-center/soft/get/' + softId,
      method: 'get'
    })
  },
  // 审核当前被测软件
  softVerify(id) {
    return request({
      url: '/soft-test-center/soft/verity/' + id,
      method: 'post'
    })
  },
  // 删除文件路径字段
  deleteFile(id) {
    return request({
      url: '/soft-test-center/soft/deleteFile/' + id,
      method: 'post'
    })
  },

  fetchPendingNums() {
    return request({
      url: '/soft-test-center/soft/PendingNums',
      method: 'get'
    })
  },
  fetchRejectNums() {
    return request(({
      url: '/soft-test-center/soft/RejectNums',
      method: 'get'
    }))
  },
  fetchHandledNums() {
    return request({
      url: '/soft-test-center/soft/HandledNums',
      method: 'get'
    })
  },
  fetchGetAllPending() {
    return request({
      url: '/soft-test-center/soft/getAllPending',
      method: 'get'
    })
  },
  fetchGetAllReject() {
    return request({
      url: '/soft-test-center/soft/getAllReject',
      method: 'get'
    })
  },
  fetchGetAllHandled() {
    return request({
      url: '/soft-test-center/soft/getAllHandled',
      method: 'get'
    })
  },
  fetchSoftInfoById(id) {
    return request({
      url: '/soft-test-center/soft/getSoftInfo',
      method: 'get',
      params: {
        id: id
      }
    })
  },
  fetchExamineSoftSuccess(id) {
    return request({
      url: '/soft-test-center/soft/examineSoftSuccess',
      method: 'get',
      params: {
        id: id
      }
    })
  },
  fetchExamineSoftFail(id) {
    return request({
      url: '/soft-test-center/soft/examineSoftFail',
      method: 'get',
      params: {
        id: id
      }
    })
  }
}
