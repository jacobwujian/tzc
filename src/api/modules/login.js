import request from '@/utils/request'
import {baseURL} from '@/utils/constant'

function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
    noToken: true
  })
}

function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

function updatePassword(data) {
  return request({
    url: '/api/user/updatePassword',
    method: 'post',
    data
  })
}

// 上传
function upload() {
  return baseURL + '/api/common/upload'
}

function uploadOSS() {
  return baseURL + '/api/common/oss/upload'
}

export default {
  login,
  logout,
  upload,
  updatePassword,
  uploadOSS
}
