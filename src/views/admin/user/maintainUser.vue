<template>
  <div>
    <el-dialog title="用户维护" :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="280px" class="demo-ruleForm">
        <tip>
          <p>登录账号</p>
        </tip>
        <el-card class="box-card">
          <el-form-item label="用户头像：" prop="avatar">
            <el-upload class="avatar-uploader" action="/uploadAvatar" :show-file-list="false" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload" :with-credential="true" :data="upload_data">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="账号：" prop="loginName">
            <el-input type="text" v-model="userForm.loginName" class="el-input-width-400" size="mini"></el-input>
          </el-form-item>

          <el-form-item label="密码：" prop="password">
            <el-input type="password" class="el-input-width-400" v-model="userForm.password"></el-input>
          </el-form-item>

          <el-form-item label="确认密码：" prop="passwordConfirm">
            <el-input type="password" class="el-input-width-400" v-model="userForm.passwordConfirm"></el-input>
          </el-form-item>

          <el-form-item label="是否锁定：" prop="isLocked">
            <el-switch v-model="userForm.isLocked"></el-switch>
          </el-form-item>
        </el-card>

        <tip>
          <p>个人资料</p>
        </tip>
        <el-card class="box-card">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="userForm.name" class="el-input-width-400"></el-input>
          </el-form-item>
          <el-form-item label="出生日期：" prop="birthday">
            <el-date-picker v-model="userForm.birthday" align="right" type="date"  value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 400px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所属部门：" prop="organIds">
              <el-cascader placeholder="搜索：机构名称" :options="userForm.organId_options" filterable v-model="userForm.organIds"
                change-on-select  size="mini" class="el-input-width-400"></el-cascader>
          </el-form-item>

          <el-form-item label="岗位：" prop="job">
            <el-input v-model="userForm.job" class="el-input-width-400"></el-input>
          </el-form-item>

          <el-form-item label="职务：" prop="duty">
            <el-input v-model="userForm.duty" class="el-input-width-400"></el-input>
          </el-form-item>

          <el-form-item label="角色权限：" prop="roleIds">
              <el-select v-model="userForm.roleIds" multiple placeholder="请选择"  size="mini" class="el-input-width-400">
                <el-option
                  v-for="item in userForm.roleId_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>

          <el-form-item label="手机号码：" prop="phone">
            <el-input type="textArea" v-model="userForm.phone" class="el-input-width-400"></el-input>
          </el-form-item>
        </el-card>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  const qs = require('qs');
  export default {
    data() {
      var validatePassConfirm = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        maintainType: "1", // 1 新增 2 修改
        userForm: {
          loginName: '',
          name: '',
          password: '',
          passwordConfirm: '',
          isLocked: false,
          organId:'',
          organIds:'',
          organId_options:[],
          locked: 0,
          birthday: '',
          job: '',
          duty: '',
          roleIds: [],
          roleId_options:[],
          phone: '',
          avatar: '',
          id: ''
        },
        upload_data: {
          savePath: '/zhpt/upload_image'
        },
        imageUrl: '',

        rules: {
          loginName: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          passwordConfirm: [{
            required: true,
            trigger: 'blur',
            validator: validatePassConfirm
          }],
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          }],
          roleIds: [{
            required: true,
            message: '请选择角色',
            trigger: 'blur'
          }],
          organId: [{
            required: true,
            message: '请选择部门',
            trigger: 'blur'
          }],
        }
      }
    },
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      user: {
        type: Object
      }
    },
    watch: {
      user: {
        handler: function(newValue, oldval) {
          this.user = newValue
          this.maintainType = '2'; //修改
        },
        deep: true //深度监听
      },
      userForm: {
        handler: function(newValue, oldval) {
          if (newValue.isLocked) {
            this.userForm.locked = 1
          }
        },
        deep: true //深度监听
      }
    },
    mounted() {
      var param = {}
      this.$ajax.sendPostRequest("ZHPT_LIST_ORGAN", param, res => {
        this.userForm.organId_options = this.$api.formatTreeSelectData(res.data.data)
      })
      this.$ajax.sendPostRequest("ZHPT_LIST_PAGED_ROLE", param, res => {
         this.userForm.roleId_options = this.$api.formatTreeSelectData(res.data.data)
      })
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.userForm.avatar = res;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitUser() {
        this.$refs['userForm'].validate((valid) => {
          if (!valid) {
            return
          }
          this.userForm.organId = this.userForm.organIds[0]

          if (this.maintainType == '1') {
            this.addUser();
          } else {
            this.editUser();
          }
        });

      },
      addUser() {
        this.$ajax.sendPostRequest("ZHPT_INSERT_USER", this.userForm, (response) => {
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
      editUser() {
        this.$ajax.sendPostRequest("ZHPT_UPDATE_USER",this.userForm, (response) => {
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
  .avatar-uploader,
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    width: 150px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }

  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>
