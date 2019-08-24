<template>
    <div>
        <div>{{ msg }}</div>
    </div>
</template>

<script >
var os = require('os');
//获取当前窗口
var win = nw.Window.get();
export default {
    data() {
        return {
            msg: 'this is login page……'
        };
    },
    created(){
        win.maximize(); 
    }
};
</script>

<style></style>
