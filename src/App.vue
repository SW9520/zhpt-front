<template>
  <div id="index">
    <!--  <img src="./assets/logo.png" /> -->
     <el-scrollbar style="height: 100%;">
          <router-view   v-if="isRouterAlive"/>
     </el-scrollbar>   
  
  </div>
</template>

<script>
  function close() {}

  export default {
    name: 'app',
    data () {
       return {
         isRouterAlive: true
       }
     },
     methods: {
       reload () {
         this.isRouterAlive = false
         this.$nextTick(() => (this.isRouterAlive = true))
       }
     },
    created() {
      if (sessionStorage.getItem("store")) { //页面加载前读取sessionStorage里的状态信息
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
      }
      window.addEventListener("beforeunload", () => { //在页面刷新前将vuex里的信息保存到sessionStorage里
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
      })
    }
  };
</script>

<style>
  #index {
    overflow: hidden;
    pading: 0
  }
</style>
