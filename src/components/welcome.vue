<template>
    <div class="el-container">
        <div class="login"></div>
        <div class="el-footer">
            <span>{{ msg }}</span>
        </div>
    </div>
</template>

<script>
var os = require('os');
//获取当前窗口
var win = nw.Window.get();
// win.maximize();

export default {
    name: 'welcome',
    data() {
        return {
            msg: '当前系统: '+os.platform() + '('+os.hostname()+')'
        };
    },
    created: function() {
        //显示窗口
        win.show();
        setTimeout(()=>{
              this.$router.push({ name: 'login' })
        },20000)
         
       
    }
};
</script>

<style scoped="scoped">
body {
    margin: 0px !important;
    padding: 0px !important;
}
.el-container{
    line-height: 40px;
}
.login {
    background-image: url('../../static/image/login/login-bg.jpg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    min-height: 22.7rem;
    min-width: 50rem;
    overflow: hidden;
}
.el-footer {
    background:white;
    text-align: center;
    width: 100%;
    height: 40px;
    color: black;
    position: absolute;
    bottom: 0px;
    vertical-align: middle;
}
</style>
