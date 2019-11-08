import axios from 'axios'
import qs from 'qs'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store/index.js'
import {
  Loading
} from 'element-ui'
import router from '@/router/router.js'

var loadingInstance = null

const serviceUrl = {
  'ZHPT_LOGIN': '/zhpt-service/login',
  'ZHPT_LOGIN_OUT': '/zhpt-service/logout',
  'ZHPT_LOGIN_REMEMBER_ME': '/zhpt-service/loginWithRememberMe',
  'ZHPT_LIST_MENU': '/zhpt-service/admin/menu/listMenu',
  'ZHPT_LIST_TOP_MENU': '/zhpt-service/admin/menu/listTopMenu',
  'ZHPT_LIST_LEFT_MENU': '/zhpt-service/admin/menu/getMenuByRootIdAndUser',

  'ZHPT_INSERT_MENU': '/zhpt-service/admin/menu/insertMenu',
  'ZHPT_UPDATE_MENU': '/zhpt-service/admin/menu/updateMenu',
  'ZHPT_DELETE_MENU': '/zhpt-service/admin/menu/deleteMenu',

  'ZHPT_INSERT_USER': '/zhpt-service/admin/user/insertUser',
  'ZHPT_UPDATE_USER': '/zhpt-service/admin/user/updateUser',
  'ZHPT_LIST_PAGED_USER': '/zhpt-service/admin/user/listPagedUser',
  'ZHPT_LIST_PAGED_ROLE': '/zhpt-service/admin/role/listRole',
  'ZHPT_INSERT_ROLE': '/zhpt-service/admin/role/insertRole',
  'ZHPT_UPDATE_ROLE': '/zhpt-service/admin/role/updateRole',
  'ZHPT_DELETE_ROLE': '/zhpt-service/admin/role/deleteRole',

  'ZHPT_LIST_ORGAN': '/zhpt-service/admin/organ/listOrgan',
  'ZHPT_INSERT_ORGAN': '/zhpt-service/admin/organ/insertOrgan',
  'ZHPT_UPDATE_ORGAN': '/zhpt-service/admin/organ/updateOrgan',
  'ZHPT_DELETE_ORGAN': '/zhpt-service/admin/organ/deleteOrgan',
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
    if (response.data.status == "failed") {
      //拦截响应，做统一处理
      EXResolve(response.data.code, response.data.msg)
    }else{
      if(response.data.msg){
         Message({
              message: response.data.msg,
              type: 'success'
            });
      }

    }

    if (loadingInstance) {
      loadingInstance.close()
    }
    return response
  }, err => {

    EXResolve(err.response.status, err.response.statusText)
    return Promise.reject(err) //响应错误时返回错误信息
  }
);

function EXResolve(EXCode, errMsg) {

  MessageBox.alert(
    '<i class="el-icon-error" style="color:#F56C6C;font-size:20px"></i><span style="color:#F56C6C">  【' +EXCode +"】" + errMsg +
    "</span>", {
      dangerouslyUseHTMLString: true,
      showClose: false,
      callback: action => {
        if (EXCode) {
          switch (EXCode) {
            case "401": //未登录
              store.state.User.isLogin = false
              router.replace({
                path: 'login',
                query: {
                  redirect: router.currentRoute.fullPath
                }
              })
          }
        }
      }
    })

}

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
    }).then(success).catch((err) => {
      if (error == null || error == undefined) {
        console.error(err)
      } else {
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
      axios.get(serviceUrl[serviceId]).then(res => {
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
