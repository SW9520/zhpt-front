<template>
    <div class="el-container">
        <div class="bc"></div>
        <div class="el-footer">
            <el-progress :text-inside="true" :stroke-width="20" :percentage="percentage"></el-progress>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';

var os = require('os');
//获取当前窗口
var win = nw.Window.get();
// win.maximize();

export default {
    name: 'welcome',
    data() {
        return {
            percentage: 0
        };
    },
    created: function() {
        var p = 0;
        //显示窗口
        win.show();
        this.$router.push({ name: 'login' });
       // let timer = setInterval(() => {
       //      $('.el-progress-bar__outer').css('border-radius', '0px');
       //      $('.el-progress-bar__inner').css('border-radius', '0px');
       //      p = p + 1;
       //      this.percentage = p;
       //      if (p == 100) {
       //          clearInterval(timer);
       //          this.$router.push({ name: 'login' });
       //      }
       //  }, 100);
        
    }
};
</script>

<style scoped="scoped">
body {
    margin: 0px !important;
    padding: 0px !important;
}
.el-container {
    /* line-height: 40px; */
}
.bc {
    background-image: url('../../static/image/login/welcome-bg.jpg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    min-height: 24rem;
    min-width: 50rem;
    overflow: hidden;
}
.el-footer {
    background: white;
    text-align: center;
    width: 100%;
    /* height: 40px; */
    color: black;
    position: absolute;
    bottom: 0px;
    vertical-align: middle;
}
.el-progress {
    width: 50.2rem;
    left: -20px;
}
</style>
