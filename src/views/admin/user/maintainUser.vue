<template>
  <div>
    <el-dialog title="用户维护" :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="280px" class="demo-ruleForm">
        <div class="tip">
          <p>账号信息</p>
        </div>
        <el-card class="box-card">
          <el-form-item label="用户头像：" prop="avatar">
            <el-upload class="avatar-uploader" action="/upload" :show-file-list="false" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload" :with-credential="true" :data="upload_data">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="账号：" prop="loginName">
            <el-input type="text" v-model="userForm.loginName" class="el-input-width-400" size="mini"></el-input>
          </el-form-item>

          <el-form-item label="密码：" prop="password">
            <el-input type="text" class="el-input-width-400" v-model="userForm.password"></el-input>
          </el-form-item>

          <el-form-item label="确认密码：" prop="passwordConfirm">
            <el-input type="text" class="el-input-width-400" v-model="userForm.passwordConfirm"></el-input>
          </el-form-item>

          <el-form-item label="是否锁定：" prop="locked">
            <el-input v-model="userForm.locked" class="el-input-width-400"></el-input>
          </el-form-item>
        </el-card>
        <div class="tip">
          <p>用户信息</p>
        </div>

        <el-card class="box-card">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="userForm.name" class="el-input-width-400"></el-input>
          </el-form-item>
          <el-form-item label="出生日期：" prop="birthday">
            <el-input v-model="userForm.birthday"  class="el-input-width-400"></el-input>
          </el-form-item>
          <el-form-item label="所属部门：" prop="organId">
            <el-input v-model="userForm.organId"  class="el-input-width-400"></el-input>
          </el-form-item>

          <el-form-item label="岗位" prop="job">
            <!-- <tags-input element-id="tags" v-model="userForm.job"></tags-input> -->
          </el-form-item>

          <el-form-item label="职务：" prop="duty">
            <!-- <tags-input element-id="tags" v-model="userForm.duty"></tags-input> -->
          </el-form-item>

          <el-form-item label="角色权限：" prop="roleIds">
            <el-input type="textArea" v-model="userForm.roleIds"  class="el-input-width-400"></el-input>
          </el-form-item>

          <el-form-item label="手机号码：" prop="phone">
            <el-input type="textArea" v-model="userForm.phone"  class="el-input-width-400"></el-input>
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
  export default {
    data() {
      return {
        userForm: {
          loginName: '',
          name: '',
          password: '',
          passwordConfirm: '',
          locked: '',
          birthday: '',
          job: '',
          duty: '',
          roleIds: '',
          phone: ''

        },
        upload_data: {
          savePath: '/zhpt/upload_image'
        },
        imageUrl: '',

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
      dialogVisible: {
        type: Boolean,
        default: false
      }
    },
    mounted() {

    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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


          this.$ajax.sendPostRequest("ZHPT_INSERT_MENU", this.userForm, (response) => {
            if (response.data.status == 'success') {
              this.$message({
                message: '新增成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '新增失败',
                type: 'error'
              });
            }
          })
          this.$parent.dialogVisible = false
        });

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
