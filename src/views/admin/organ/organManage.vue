<template>
  <div style="height: 100%;overflow-y: auto;overflow-x:hidden; width: 100%;margin:0 auto">
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
    <maintainOrgan :organDialogVisible="organDialogVisible" :organ="organ"></maintainOrgan>
  </div>

</template>

<script>
  import $ from 'jquery';
  import maintainOrgan from './maintainOrgan.vue'

  export default {
    components: {
      maintainOrgan
    },
    data() {
      return {
        organForm: {
          name: ""
        },

        organDialogVisible: false,
        organ: {},
        tableColmns: [{
            label: "机构名称",
            field: "name",
            width: 200
          },
          {
            label: "所属区域",
            field: "areaName"
          },
          {
            label: "机构编码",
            field: "code"
          },
          {
            label: "机构类型",
            field: "type"
          },
          {
            label: "机构负责人",
            field: "managerName"
          },
          {
            label: "分管领导",
            field: "mainDirectorName"
          },
          {
            label: "联络员",
            field: "liaisonName"
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
        this.organDialogVisible = true
      },
      editUser() {
        this.organDialogVisible = true
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
