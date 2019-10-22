<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-button type="primary" @click="addMenu()">新增</el-button>
        <el-button type="warning" @click="editMenu()">修改</el-button>
        <el-button type="danger" @click="delMenu()">删除</el-button>
      </el-row>
    </el-card>
    <br>
    <el-card class="box-card" style="height: 545px;">
      <treeTable :data="tableData.data" :columns="tableData.columns" border></treeTable>
    </el-card>

    <!-- 新增-->
     <addMenu :dialogVisible="addMenuVisible"></addMenu>
  </div>

</template>
<script>
  import addMenu  from './addMenu.vue'


  export default {
   components: {
    addMenu
   },
    data() {
      return {
        addMenuVisible: false,
        tableData:{
          columns: [{
              text: "名称",
              value: "name",
              width: 200
            },
            {
              text: "链接",
              value: "path"
            },
            {
              text: "显示",
              value: "show"
            },
            {
              text: "权限标识",
              value: "permissions"
            },
            {
              text: "排序",
              value: "sort"
            },
            {
              text: "备注",
              value: "remark"
            }
          ],
          data: []
        }
      }
    },
    methods: {
      addMenu() {
        this.addMenuVisible = true
      },
      editMenu(){

      },
      delMenu(){

      }
    },
  }
</script>

<style scoped="scoped">
</style>
