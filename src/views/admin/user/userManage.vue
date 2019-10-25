<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-button type="primary" @click="addUser()">新增</el-button>
        <el-button type="warning" @click="editUser()">修改</el-button>
        <el-button type="danger" @click="delUser()">删除</el-button>
      </el-row>
    </el-card>
    <br>
    <el-card class="box-card main">
        <el-table :data="tableData" border style="width: 100%;" fit header-cell-class-name="table-header-style-grey" >
            <el-table-column
              prop="loginName"
              label="登录名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="organName"
              label="所属部门">
            </el-table-column>
            <el-table-column
              prop="job"
              label="岗位"
              width="120">
            </el-table-column>
            <el-table-column
              prop="duty"
              label="职务"
              width="300">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号码"
             >
            </el-table-column>
            <el-table-column
              prop="roleNames"
              label="角色"
             >
            </el-table-column>
          </el-table>
    </el-card>

    <maintainUser :dialogVisible = "dialogVisible"></maintainUser>
  </div>

</template>

<script>
  import $ from 'jquery';
  import maintainUser from './maintainUser.vue'

  export default {
    components:{
      maintainUser
    },
    data(){
      return {
        dialogVisible: false,
        tableData:[]
      }
    },
    mounted() {
       $(".main").height( `${document.documentElement.clientHeight -245}`)
    },
    methods: {
      addUser() {
        this.dialogVisible = true
      },
      editUser() {
        this.dialogVisible = true
      },
      delUser() {

      }
    },
  }


</script>

<style>
</style>
