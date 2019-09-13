<template>
    <div>
        
            <el-header>
                <headerBar></headerBar>
            </el-header>
            <div class="menuItem">
                <div class="sideBarDiv">
                     <el-button type="text" @click="collapseChage" icon="el-icon-d-arrow-left">收起侧边栏</el-button>
                </div>
               
            </div>
            <el-container>
                <el-aside width="200px">
                  <asideBar></asideBar>
                </el-aside>
                <el-container>
                    <el-main>
                       <mainBar></mainBar>
                    </el-main>
                   <!-- <el-footer>Footer</el-footer> -->
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse:false
        };
    },
    methods: {
        collapseChage() {
            this.isCollapse = !this.isCollapse;
            this.$bus.$emit("collapseChage",this.isCollapse);
        }
    },
    created() {
        win.maximize();
    },
    mounted(){
         
    }
};
</script>

<style>
  .el-header {
    background-color: #409EFF;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
 .el-footer{
      background-color: #D3DCE6;
      height: 2.5rem!important;
 }
   .el-aside {
    background-color: #E4E7EB;
    border-right: 1px solid #DCDFE6 ;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E4E7EB;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .menuItem{
      background-color: #E9EEF3;
      border-bottom: 1px solid #DCDFE6 ;
  }
  .sideBarDiv{
      width: 200px;
      border-right: 1px solid #DCDFE6  ;
  }
  .sideBarDiv .el-button{
      padding-left:60px
  }
  
    body > .el-container {
    margin-bottom: 40px;
  } 
    
</style>
