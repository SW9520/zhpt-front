<template>
  <div>
    <el-dialog title="菜单维护" :visible.sync="menuDialogVisible" width="50%" @close="close" :close-on-click-modal="false">
      <el-form :model="menuForm" :rules="rules" ref="menuForm" label-width="150px" class="demo-ruleForm">
        <el-card class="box-card">
          <el-row>
            <el-col :span="20">
              <el-form-item label="上级目录" prop="parentId">
                <el-cascader placeholder="搜索：菜单名称" style="width: 100%;" :options="options" filterable v-model="menuForm.parentId"
                  change-on-select></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20">
              <el-form-item label="菜单名称" prop="name">
                <el-input type="text" v-model="menuForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="菜单路径" prop="href">
                <el-input type="text" v-model="menuForm.href"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="20">
              <el-form-item label="排序号" prop="sort">
                <el-input type="text" v-model="menuForm.sort"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="图标" prop="icon">
                <icon-picker v-model="menuForm.icon"></icon-picker>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="是否显示" prop="isShow">
                <el-switch v-model="menuForm.isShow_boolean">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="权限标识" prop="permissions">
                <el-input v-model="menuForm.permissions"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="shiro权限标识" prop="shiroPermissions_arr">
                <tags-input element-id="tags" v-model="menuForm.shiroPermissions_arr"></tags-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="备注" prop="remark">
                <el-input type="textArea" v-model="menuForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import {extend} from '../../../utils/validate.js'
  export default {
    data() {
      return {
        maintainType: "1", // 1 新增 2 修改
        menuForm: {
          parentId: '',
          name: '',
          href: '',
          target: '',
          icon: '',
          sort: '',
          isShow: '1',
          isShow_boolean: true,
          permissions: '',
          shiroPermissions_arr: [],
          remark: '',
          shiroPermissions: '',
          id: ''
        },
        options: [],
        rules: {
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          isShow: [{
            required: true,
            message: '是否显示必填',
            trigger: 'blur'
          }],
          sort: [{
            required: true,
            message: '排序号必填',
            trigger: 'blur'
          }],
        }
      }
    },
    props: {
      menuDialogVisible: {
        type: Boolean
      },
      menu: {
        type: Object
      }
    },
    mounted() {
      var param = {}
      this.$ajax.sendPostRequest("ZHPT_LIST_MENU", param, res => {
        this.options = this.$api.formatTreeSelectData(res.data.data)
      })
    },
    watch: {
      menu: {
        handler(newValue, oldValue) {
         for (var p in newValue) {
           if (newValue.hasOwnProperty(p) && this.menuForm.hasOwnProperty(p))
             this.menuForm[p] = newValue[p];
         }
          this.maintainType = 2
        },
        deep: true
      }

    },
    methods: {
      submitMenu() {
        this.$refs['menuForm'].validate((valid) => {
          if (!valid) {
            return
          }
          var shiroPermissions = "";
          if (this.menuForm.shiroPermissions_arr) {
            for (let perm of this.menuForm.shiroPermissions_arr.values()) {
              shiroPermissions += perm.value
              shiroPermissions += ";"
            }
            shiroPermissions = shiroPermissions.substring(0, shiroPermissions.lastIndexOf(";"))
            this.menuForm.shiroPermissions = shiroPermissions
          }
          if (this.menuForm.parentId) {
            this.menuForm.parentId = this.menuForm.parentId[this.menuForm.parentId.length - 1];
          }
          this.menuForm.isShow = this.menuForm.isShow_boolean == true ? '1' : '0'
          if (this.maintainType == 1) {
            this.addMenu()
          } else {
            this.updateMenu()
          }
        })
      },
      updateMenu() {
        this.$ajax.sendPostRequest("ZHPT_UPDATE_MENU", this.menuForm, (response) => {
          if (response.data.status == 'success') {
            this.close()
          }
        })
      },
      addMenu() {
        this.$ajax.sendPostRequest("ZHPT_INSERT_MENU", this.menuForm, (response) => {
          if (response.data.status == 'success') {
            this.close()
          }
        })
      },
      close() {
        this.$parent.listQuery()
        this.$refs['menuForm'].resetFields();
        this.$parent.maintainMenuVisible = false

      }
    }
  }
</script>

<style>
</style>
