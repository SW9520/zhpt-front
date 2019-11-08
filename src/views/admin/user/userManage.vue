<template>
  <div style="height: 100%;overflow-y: auto;overflow-x:hidden; width: 100%;margin:0 auto">
    <el-form ref="form" :model="userForm" label-width="80px" size="mini">

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="姓名:">
            <el-input v-model="userForm.name"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="部门:">
            <el-input v-model="userForm.organId"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="角色:">
            <el-input v-model="userForm.roleNames"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="text-align: center;">
        <el-button type="primary" plain>查 询</el-button>
      </el-row>





    </el-form>
    <div>
      <el-row>
        <el-button type="primary" @click="addUser()">新增</el-button>
        <el-button type="warning" @click="editUser()">修改</el-button>
        <el-button type="danger" @click="delUser()">删除</el-button>
      </el-row>
      <el-row >
           <grid  :columns="tableColmns" :check="true" :paging="true" :pageInfo="pageInfo" @pageSizeChange="handlePageSizeChange" @pageChange="handlePageChange">  </grid>
      </el-row>
    </div>





    <maintainUser :dialogVisible="dialogVisible" :user="user"></maintainUser>
  </div>

</template>

<script>
  import $ from 'jquery';
  import maintainUser from './maintainUser.vue'

  export default {
    components: {
      maintainUser
    },
    data() {
      return {
        userForm: {
          name: ""
        },

        dialogVisible: false,
        user: {},
        tableColmns: [{
            label: "登录名",
            field: "loginName",
            width: 200
          },
          {
            label: "姓名",
            field: "name"
          },
          {
            label: "所属部门",
            field: "organName"
          },
          {
            label: "岗位",
            field: "job"
          },
          {
            label: "职务",
            field: "duty"
          },
          {
            label: "手机号码",
            field: "phone"
          },
          {
            label: "角色",
            field: "roleNames"
          }
        ],
        pageInfo: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    mounted() {
      $(".main").height(`${document.documentElement.clientHeight -245}`);
      this.listUser();
    },
    methods: {
      addUser() {
        this.dialogVisible = true
      },
      editUser() {
        this.dialogVisible = true
      },
      delUser() {},
      listUser() {
        var param = {
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize
        }

        this.$ajax.sendPostRequest("ZHPT_LIST_PAGED_USER", param, res => {
          this.pageInfo = res.data.data.page
        })
      },
      handlePageChange(pageNum) {
        this.pageInfo.pageNum = pageNum;
        this.listUser()
      },
      handlePageSizeChange(pageSize) {
        this.pageInfo.pageSize = pageSize;
        this.listUser()
      }

    },
  }
</script>

<style scoped="scoped">
  .main {
    overflow-y: scroll;
  }
</style>
