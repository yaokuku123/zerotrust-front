import request from '@/utils/request'

export default {
  // 获取当前系统中存在的软件交易信息
  insert(softInfoVo) {
    return request({
      url: '/soft/insertInfo',
      method: 'post',
      data: softInfoVo
    })
  },
  update(softInfoVo) {
    return request({
      url: '/soft/updateInfo',
      method: 'post',
      data: softInfoVo
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
  },
  fetchZipWithPass(data) {
    return request({
      url: '/soft/getInfo',
      method: 'post',
      data: data
    })
  },
  fetchCheckPass(data) {
    return request({
      url: '/check',
      method: 'post',
      data: data
    })
  },
  submitSoftInfo(softInfo) {
    return request({
      url: '/soft/submit',
      method: 'post',
      data: softInfo
    })
  },
  deleteSoftInfo(pid,fileType){
    return request({
      url: '/soft/deleteFile',
      method: 'get',
      params: {
        pid: pid,
        fileType:fileType
      }
    })
  },
  downloadSoftInfo(pid,fileType){
    return request({
      url: '/soft/download',
      method: 'get',
      params: {
        pid: pid,
        fileType:fileType
      }
    })
  },
  getcheck(pid){
    return request({
      url: '/filed',
      method: 'get',
      params: {
        pid: pid,
      }
    })
  },
  getfileList(){
    return request({
      url: '/fileInfos',
      method: 'get',
    })
  },
  getFileListByDevelopinst(developinst){
    return request({
      url: '/uploadInfo',
      method: 'get',
      params: {
        developinst: developinst
      }
    })
  },
  login(userVo){
    return request({
      url: '/user/login',
      method: 'post',
      data: userVo
    })
  }

}
