<template>
  <div>
    <el-dialog title="角色维护" :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false">
      <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="280px" class="demo-ruleForm">

        <el-card class="box-card">

          <el-form-item label="角色名称：" prop="name">
            <el-input type="text" v-model="roleForm.name" class="el-input-width-400" size="mini"></el-input>
          </el-form-item>

          <el-form-item label="角色标识：" prop="identify">
            <el-input type="text" class="el-input-width-400" v-model="roleForm.identify"></el-input>
          </el-form-item>

          <el-form-item label="数据范围：" prop="dataScope">
            <el-input type="text" class="el-input-width-400" v-model="roleForm.dataScope"></el-input>
          </el-form-item>
          <el-form-item label="排序：" prop="sort">
            <el-input type="text" class="el-input-width-400" v-model="roleForm.sort"></el-input>
          </el-form-item>

          <el-form-item label="是否启用：" prop="useable_boolean">
            <el-switch v-model="roleForm.useable_boolean"></el-switch>
          </el-form-item>

          <el-form-item label="角色授权：">
            <menuTree class="el-input-width-400" ref="menuTreeObj" ></menuTree>
          </el-form-item>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitRole">确 定</el-button>
      </span>
    </el-dialog>


  </div>

</template>

<script>
  export default {
    data() {
      return {
        maintainType: "1", // 1 新增 2 修改
        roleForm: {
          name: '',
          identify: '',
          dataScope: '',
          sort: '',
          useable_boolean: false,
          useable:0,
          menuIds: [],
        },

        rules: {
          name: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }],
          identify: [{
            required: true,
            message: '请输入角色标识',
            trigger: 'blur'
          }]
        }

      }
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      role: {
        type: Object
      }
    },
    watch: {
      role: {
        handler: function(newValue, oldval) {
          this.role = newValue
          this.maintainType = '2'; //修改
        },
        deep: true //深度监听
      },
      roleForm: {
        handler: function(newValue, oldval) {
          if (newValue.useable) {
            this.roleForm.useable = true
          }
        },
        deep: true //深度监听
      }
    },
    mounted() {

    },
    methods: {
      getCheckedNodes() {

      },
      submitRole() {
        let ztreeObj = this.$refs['menuTreeObj'].getTreeObj()
        let nodes = ztreeObj.getCheckedNodes(true);
        if(!nodes){
          this.$message({
            message: '请授权后再提交',
            type: 'error'
          });
          return
        }
        for (let node of nodes) {
           this.roleForm.menuIds.push(node.id)
        }

        this.$refs['roleForm'].validate((valid) => {
          if (!valid) {
            return
          }
          if(this.roleForm.useable_boolean){
            this.roleForm.useable = 1
          }else{
             this.roleForm.useable = 0
          }

          if (this.maintainType == '1') {
            this.addRole();
          } else {
            this.editRole();
          }
        });

      },
      addRole() {
        this.$ajax.sendPostRequest("ZHPT_INSERT_ROLE", this.roleForm, (response) => {
          if (response.data.status == 'success') {
            this.$message({
              message: '新增成功',
              type: 'success'
            });
            this.close()
          } else {
            this.$message({
              message: '新增失败',
              type: 'error'
            });
          }
        })
      },
      editRole() {
        this.$ajax.sendPostRequest("ZHPT_UPDATE_ROLE", this.roleForm, (response) => {
          if (response.data.status == 'success') {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.close()
          } else {
            this.$message({
              message: '修改成功',
              type: 'error'
            });
          }
        })
      },
      close() {
        this.$parent.dialogVisible = false
      }
    }
  }
</script>

<style scoped="scoped">


</style>
