<template>
  <div>
    <el-container>
      <!-- 顶部区域  上 -->
      <el-header class="header">
        <headerBar></headerBar>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <asideBar></asideBar>
        </el-aside>
        <el-main class="context">
          <mainBar></mainBar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    data() {
      return {

      }
    },
    created() {
     
    },
    mounted() {
      var list = this.$api.menu.listTopMenu()
    },
    methods: {

    }
  }
</script>

<style scoped="scoped">
  .header {
    background-color: #409EFF;
    color: #333;
    text-align: center;
    line-height: 60px;

  }

  .el-footer {
    background-color: #D3DCE6;
    height: 2.5rem !important;
  }

  .el-aside {
    background-color: #E4E7EB;
    border-right: 1px solid #DCDFE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .context {
    background-color: #E4E7EB;
    color: #333;
    padding: 0px !important;
  }


  body>.el-container {
    margin-bottom: 40px;
  }
</style>
