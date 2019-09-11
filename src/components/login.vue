<template>
    <div>
        <el-carousel :height="height" :interval="6000">
            <el-carousel-item v-for="item in 7" :key="item"><img :src="'../../static/image/login/carousel/' + item + '.jpg'" /></el-carousel-item>
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
                    <el-form-item prop="password"><el-input type="password" prefix-icon="el-icon-lock" placeholder="密码" v-model="loginForm.password"></el-input></el-form-item>
                    <el-form-item prop="keyWord">
                        <slide-verify :l="42" :r="10" :w="260" :h="100" @success="onSuccess" @fail="onFail" @refresh="onRefresh" :slider-text="text"></slide-verify>
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
import { IPUtils } from '@/assets/js/IPUtils.js';
import $ from 'jquery';

//获取当前窗口
var win = nw.Window.get();
export default {
    data() {
        return {
            height: '32.1rem',
            loginForm: {
                userName: 'zhangsan',
                password: '123456',
                rememberMe: false
            },
            loginFormRules: {
                userName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
            },
            text: '向右滑动'
        };
    },
    created() {
        win.resizeTo(1000, 550);
        win.setPosition('center');
        let ipaddress = IPUtils.getIPAdress();
        win.title = win.title + '['+ipaddress+']'
       
    },
    methods: {
        onSuccess() {
            this.$refs['loginForm'].validate(valid => {
                var jsonData = this.loginForm;
                //加密password
                jsonData.password = this.$md5(this.loginForm.password);
                if (valid) {
                   this.$ajax.sendPostRequest('http://localhost:8080/login', jsonData, (response) => {
                       this.initWebSocket()
                    },function(error){
                        console.log(error)
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: '请输入用户名和密码后再登陆',
                        type: 'error'
                    });
                    return false;
                }
            });
        },
        onFail() {
            this.$message({
                showClose: true,
                message: '验证失败，请重试',
                type: 'error'
            });
        },
        onRefresh() {
            this.$message({
                showClose: true,
                message: '正在加载图片，请稍候……',
                type: 'info'
            });
        },
        chooseRememberMe() {
            if (this.loginForm.rememberMe) {
                this.$confirm('请确认是否要记住密码（如果您的电脑有多人共同使用，我们不建议您记住密码）？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {})
                    .catch(() => {
                        this.loginForm.rememberMe = false;
                    });
            }
        },
        initWebSocket() {
            //初始化weosocket
            var sid = new Date().getTime();
            var webSocket = new WebSocket('ws://127.0.0.1:8080/websocket/' + sid);
            webSocket.onopen = this.websocketonopen;
            webSocket.onerror = this.websocketonerror;
            webSocket.onmessage = this.websocketonmessage;
            webSocket.onclose = this.websocketclose;
            return sid;
        },
        websocketonopen() {
            console.log('websocketonopen');
        },
        websocketonerror(error) {
            console.log(error);
        },
        websocketonmessage(message) {
            console.log(message.data);
        },
        websocketclose() {
            console.log('websocketclose');
        }
    }
};
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
    width: auto;
    max-height: 27.1875rem;
    max-width: 22.875rem;
    opacity: 1;
    /* background: #409EFF; */
}
.el-card__header {
    padding: 0.625rem 0.625rem;
}
img {
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
