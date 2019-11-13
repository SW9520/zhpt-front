<template>
  <div>
      <table class="table table-bordered custom-table">
        <tr>
          <td class="label-td">收件人：</td>
          <td class="value-td">
               <el-input v-model="mailForm.address"></el-input>
          </td>
        </tr>
        <tr>
          <td class="label-td">标题：</td>
          <td class="value-td">   <el-input v-model="mailForm.title"></el-input></td>
        </tr>
        <tr>
          <td class="label-td">內容：</td>
          <td class="value-td">
            <div class="editor">
                  <editor ref="editor" ></editor>
            </div>
          </td>
        </tr>
        <tr>
           <td colspan="2" class="value-td" style="text-align: center;">
               <el-button  size='mini' @click="sendEmail"><i class="el-icon-check"></i> 发 送</el-button>
               <el-button  size='mini' @click="cancelSendEmail"><i class="el-icon-close"></i>关 闭</el-button>
           </td>
        </tr>
      </table>
  </div>





</template>

<script>
  import store from '@/store'
  export default {
    data() {
      return {
        mailForm:{
          address:'827294616@qq.com',
          title:'测试',
          content:'',
          mailType:'1' // 1为单独发送 2为群发
        },
        rules:[

        ]
      }
    },
    mounted() {
      $(".main").height(`${document.documentElement.clientHeight -245}`);

    },
    methods: {
      sendEmail(){
        this.mailForm.content = this.$refs.editor.getContent();
        if(!this.mailForm.address){
          this.$alert("请输入收件邮箱地址")
          return
        }
         if(!this.mailForm.content){
           this.$alert("请输入邮件內容")
           return
         }
         if(this.mailForm.address.split(";").length > 1){//群发
            this.mailForm.mailType = "2"
         }
          this.$ajax.sendPostRequest("ZHPT_SEND_MAIL",this.mailForm,(res)=>{

        })

      },
      cancelSendEmail(){
          store.dispatch('removeTab',{name:"发送邮件"})
      }
    }
  }
</script>

<style scoped="scoped">
  .label-td{
    text-align: right!important;
  }

  .custom-table {
    width: 80%;
    margin: 0 auto;

  }

  .custom-table tr td {
     vertical-align: middle;

  }

  .el-input,.editor {
    padding: 10px 10px!important;
    width: 96%;
  }

  .editor{
    overflow-y: auto;
    height: 400px;
  }
</style>
