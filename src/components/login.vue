<template>
  <div>
    <el-carousel :height="height" :interval="6000">
      <el-carousel-item v-for="item in 7" :key="item"><img class="img" :src="'../../static/image/login/carousel/' + item + '.jpg'" /></el-carousel-item>
    </el-carousel>

    <el-card class="box-card">
      <div slot="header" class="clearfix" style="text-align: center;">
        <span><b style="color: #0074D9;">用户登录</b></span>
      </div>
      <div class="text item">
        <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="loginForm" label-width="0" class="login-form">
          <el-form-item prop="userName">
            <el-input type="text" prefix-icon="el-icon-user" placeholder="用户名" autofocus="true" v-model="loginForm.userName"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" prefix-icon="el-icon-lock" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <!--    <slide-verify :l="42" :r="10" :w="260" :h="100" @success="onSuccess" @fail="onFail" @refresh="onRefresh" :slider-text="text"></slide-verify> -->
            <el-input placeholder="点击图片获取验证码" v-model="loginForm.captcha">
              <div slot="suffix">
                <img :src="imgCodeUrl" @click="changeImgCode" style="width:80px;height: 26px;padding:0.125rem;cursor: pointer;" />
              </div>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="login">登 陆</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox size="mini" @change="chooseRememberMe()" v-model="loginForm.rememberMe"><span style="font-size: 0.75rem;">记住密码</span></el-checkbox>
            <a href="javascript:void(0)" class="require clearfix ">忘记密码</a>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { IPUtils} from '@/assets/js/IPUtils.js'
let _that
// 获取当前窗口
var win = nw.Window.get()

export default {
  data () {
    return {
      height: '32.1rem',
      imgCodeUrl: '/zhpt-service/getImgCode',
      loginForm: {
        userName: 'zhangsan',
        password: '123456',
        rememberMe: true,
        captcha: ''
      },
      loginFormRules: {
        userName: [{
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }]
        /* captcha: [{
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          }] */
      },
      text: '向右滑动'
    }
  },
  beforeCreate () {
    _that = this
  },
  created () {
    win.resizeTo(1000, 550)
    win.setPosition('center')
    let ipaddress = IPUtils.getIPAdress()
    win.title = win.title + '[' + ipaddress + ']'
  },
  mounted () {
    _that.init()
  },
  methods: {
    ...mapMutations({storeLogin: 'login'}),
    init () {
      _that.loginForm.rememberMe = Boolean(localStorage.getItem(_that.$api.key.USER_LOGIN_REMEMBERME))
      if (_that.$cookies.get(_that.$api.key.LOGIN_NAME_COOKIE)) {
        _that.loginForm.userName = _that.$cookies.get(_that.$api.key.LOGIN_NAME_COOKIE)
      }
      if (_that.loginForm.rememberMe) {
        _that.loginWithRememberMe()
      }
    },
    changeImgCode () {
      if (_that.imgCodeUrl.indexOf('?') == -1) {
        _that.imgCodeUrl = _that.imgCodeUrl + '?code=' + Math.floor(Math.random() * 1000000)
      } else {
        _that.imgCodeUrl = _that.imgCodeUrl.substring(0, _that.imgCodeUrl.indexOf('?')) + '?code=' + Math.floor(Math.random() *
            1000000)
      }
    },
    login () {
      _that.$refs['loginForm'].validate(valid => {
        var jsonData = _that.loginForm
        // 加密password
        jsonData.password = _that.$md5(_that.loginForm.password)
        if (valid) {
          _that.$ajax.sendPostRequest(
            'ZHPT_LOGIN',
            jsonData,
            response => {
              if (response.data.status == 'success') {
                _that.initWebSocket()
                _that.$router.push({
                  name: 'home'
                })
                // 如果选中rememberMe
                if (_that.loginForm.rememberMe) {
                  localStorage.setItem(_that.$api.key.USER_SESSION_KEY, response.data.data.encryptUser)
                }
                this.storeLogin(response.data.data)
              } else {
                _that.$message({
                  showClose: true,
                  message: response.data.msg || '用户名或密码错误',
                  type: 'error'
                })
                _that.changeImgCode()
              }
            },
            function (error) {
              console.log(error)
              _that.changeImgCode()
            }
          )
        } else {
          _that.$message({
            showClose: true,
            message: '请输入用户名和密码后再登陆',
            type: 'error'
          })
          _that.changeImgCode()
          return false
        }
      })
    },
    loginWithRememberMe () {
      let encryptUser = localStorage.getItem(_that.$api.key.USER_SESSION_KEY)
      if (!encryptUser) {
        _that.$message({
          showClose: true,
          message: '自动登录失败，请重新输入账号密码！',
          type: 'error'
        })
        localStorage.setItem(_that.$api.key.USER_LOGIN_REMEMBERME, false)
        return
      }
      let params = {
        'encryptUser': encryptUser
      }
      _that.$ajax.sendPostRequest('ZHPT_LOGIN_REMEMBER_ME', params, response => {
        if (response.data.status == 'success') {
          _that.initWebSocket()
          _that.$router.push({
            name: 'home'
          })
          localStorage.setItem(_that.$api.key.USER_SESSION_KEY, response.data.data.encryptUser)
          this.storeLogin(response.data.data)
          
        } else {
          localStorage.setItem(_that.$api.key.USER_LOGIN_REMEMBERME, false)
          _that.$message({
            showClose: true,
            message: '验证失败，请重试',
            type: 'error'
          })
          _that.changeImgCode()
        }
      },
      function (error) {
        console.log(error)
        _that.$message({
          showClose: true,
          message: '验证失败，请重试',
          type: 'error'
        })
        _that.changeImgCode()
        localStorage.setItem(_that.$api.key.USER_LOGIN_REMEMBERME, false)
      }
      )
    },
    onFail () {
      _that.$message({
        showClose: true,
        message: '验证失败，请重试',
        type: 'error'
      })
    },
    onRefresh () {
      _that.$message({
        showClose: true,
        message: '正在加载图片，请稍候……',
        type: 'info'
      })
    },
    chooseRememberMe () {
      if (_that.loginForm.rememberMe) {
        _that.$confirm('请确认是否要记住密码（如果您的电脑有多人共同使用，我们不建议您记住密码）？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            _that.loginForm.rememberMe = true
            localStorage.setItem(_that.$api.key.USER_LOGIN_REMEMBERME, true)
          })
          .catch(() => {
            _that.loginForm.rememberMe = false
          })
      }
    },
    initWebSocket () {
      // 初始化weosocket
      var sid = new Date().getTime()
      var webSocket = new WebSocket('ws://127.0.0.1:8080/websocket/' + sid)
      webSocket.onopen = _that.websocketonopen
      webSocket.onerror = _that.websocketonerror
      webSocket.onmessage = _that.websocketonmessage
      webSocket.onclose = _that.websocketclose
      return sid
    },
    websocketonopen () {
      console.log('websocketonopen')
    },
    websocketonerror (error) {
      console.log(error)
    },
    websocketonmessage (message) {
      console.log(message.data)
    },
    websocketclose () {
      console.log('websocketclose')
    }
  }
}
</script>

<style scoped="scoped">
  .el-carousel {
    z-index: -9999;
  }

  .box-card {
    position: absolute;
    top: 10%;
    right: 6%;
    height: auto;
    width: 18.75rem;
    max-height: 27.1875rem;
    max-width: 23.875rem;
    opacity: 1;
    /* background: #409EFF; */
  }

  .el-card__header {
    padding: 0.625rem 0.625rem;
  }

  .img {
    width: 100%;
    min-height: 29rem;
    min-width: 50rem;
    overflow: hidden;
  }

  .el-button {
    width: 240px;
  }

  a {
    float: right;
    font-size: 12px;
    text-decoration: none;
  }
</style>
