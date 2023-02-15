import axios from 'axios'
import Vue from 'vue'
import { message } from 'ant-design-vue'
import router from '@/router'
import store from '@/store'
import {cPath, baseURL, accessToken} from '@/utils/constant'

let prod = false
if(process.env.NODE_ENV === 'production'){
  prod = true
}

const service = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  withCredentials: true
})
// cw  http://10.53.2.245:8081
// wx  http://10.88.9.220:8081
// xq  http://10.53.2.248:8081r
const domain = {
  cw: baseURL, //http://localhost:9001/
  wx: baseURL //http://localhost:9001/
}

service.interceptors.request.use(
  (config) => {
    if(!prod){
      config.url = (config.domain ? domain[config.domain] : domain['wx']) + config.url
    }
    const token = Vue.ls.get(accessToken)
    if (token && !config.noToken) {
      config.headers['Authorization'] = token
    }
      config.headers['RequestTime'] = Date.parse(new Date())
      return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { data, config } = response
    if (data.status === 200){
      return data.data
    } else if (data.status === 401){
      message.error('登录已超时')
      if(location.pathname.indexOf(cPath) === 0){
        router.push(cPath + '/login')
      }else{
        router.push('/login')
      }
      store.commit('user/SET_USER_INFO', null)
      return Promise.reject(new Error(data.error || 'Error'))
    } else {
      if(!config.noMessage) message.error(data.message || 'Error')
      return Promise.reject(new Error(data.error || 'Error'))
    }
  },
  (error) => {
    message.error('服务异常')
    return Promise.reject(error)
  }
)

export default service
