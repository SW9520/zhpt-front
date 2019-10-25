import axios from 'axios'
import qs from 'qs'
import { Message,MessageBox} from 'element-ui'
import store from '@/store/index.js'
import {Loading} from 'element-ui'
import router from '@/router/router.js'

var loadingInstance = null

const serviceUrl = {
  'ZHPT_LOGIN': '/zhpt-service/login',
  'ZHPT_LOGIN_REMEMBER_ME': '/zhpt-service/loginWithRememberMe',
  'ZHPT_LIST_TOP_MENU': '/zhpt-service/menu/listTopMenu',
  'ZHPT_INSERT_MENU': '/zhpt-service/menu/insertMenu'
}
axios.defaults.withCredentials = true
// http request 请求拦截器
axios.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    text: "正在加载……"
  })
  if (store.state.User.userInfo && store.state.User.userInfo.sid) {
    config.headers.common['TOKEN'] = store.state.User.userInfo.sid
  }
  return config
}, error => {

  if (loadingInstance) {
    loadingInstance.close()
  }

  return Promise.reject(error)

});

axios.interceptors.response.use(
  response => {
    if(response.data.status == "failed" ){
      MessageBox.alert( '<i class="el-icon-error" style="color:#F56C6C;font-size:20px"></i><span style="color:#F56C6C">' + response.data.msg +"</span>",{
         dangerouslyUseHTMLString: true
      })
    }
    //拦截响应，做统一处理
    if (response.data.code) {
      switch (response.data.code) {
        case 401: //未登录
          Message({
            showClose: true,
            message: response.data.desc,
            type: 'warning'
          })
          store.state.User.isLogin = false
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
         case 403: //无权限操作
           Message({
             showClose: true,
             message: response.data.desc,
             type: 'warning'
           })
      }
    }
    if (loadingInstance) {
      loadingInstance.close()
    }

    return response
  }
);

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
          if (loadingInstance) {
            loadingInstance.close()
          }
          reject(err)
        })
    }).then(success).catch((err)=>{
      if(error == null || error == undefined){
        console.error(err)
      }else{
        error(err)
      }
    })

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
        if (loadingInstance) {
          loadingInstance.close()
        }
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
