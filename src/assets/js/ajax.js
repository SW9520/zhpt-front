import axios from 'axios'
import qs from 'qs'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store/index.js'



const serviceUrl = {
  'ZHPT_LOGIN': '/zhpt-service/login',
  'ZHPT_LOGIN_REMEMBER_ME': '/zhpt-service/loginWithRememberMe',
  'ZHPT_LIST_TOP_MENU': '/zhpt-service/menu/listTopMenu'

}
axios.defaults.withCredentials = true
// http request 请求拦截器
axios.interceptors.request.use(config => {
  if (store.state.User.userInfo && store.state.User.userInfo.sid) {
    config.headers.common['token'] = store.state.User.userInfo.sid
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});


var ajax = axios.create()
ajax.$store = store
/**
 * ajax.sendPostRequest
 * @param {Object} url
 * @param {Object} params
 * @param {Object} success
 * @param {Object} error
 */
ajax.sendPostRequest = function(serviceId, params, success, error) {
  if (serviceUrl.hasOwnProperty(serviceId)) {
    return new Promise((resolve, reject) => {
      axios.post(serviceUrl[serviceId], qs.stringify(params))
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    }).then(success).catch(error)

  } else {
    Message({
      showClose: true,
      message: '发送微服务【' + serviceId + '】异常……',
      type: 'error'
    })
  }
}
/**
 * ajax.sendGetRequest
 * @param {Object} url
 * @param function success
 * @param function error
 */
ajax.sendGetRequest = function(serviceId, success, error) {
  if (serviceUrl.hasOwnProperty(serviceId)) {
    return new Promise((resolve, reject) => {
      axios.get(serviceUrl[serviceId], {
        // 单独配置
        withCredentials: true
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }).then(success).catch(error)
  } else {
    Message({
      showClose: true,
      message: '发送微服务【' + serviceId + '】异常……',
      type: 'error'
    })
  }
}

export default ajax
