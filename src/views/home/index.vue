<template>
  <div>

    <el-card class="box-card" style="width: 60%;float: left;">
      <el-calendar v-model="choosedDay">
        <template slot="dateCell" slot-scope="{date, data}">
          <el-popover placement="right" width="40" trigger="click" :visible-arrow="false">
            <el-link type="primary" @click="mailTimer">
              <i class="icon el-icon-message"></i>
              定时邮件
            </el-link>
            <el-link type="primary" @click="noticeTimer">
              <i class="icon el-icon-plus"></i>
              定期提醒
            </el-link>


            <p slot="reference" :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(2).join('-') }} {{ data.isSelected ? '✔️' : ''}}
            </p>
          </el-popover>
        </template>
      </el-calendar>
    </el-card>
    <el-dialog title="新建日程" :visible.sync="calendarDialogVisiable" width="80%">
        <template v-if="type == 'mail'" >
          <sendMail></sendMail>
        </template>
        <template v-if="type == 'notice'" >
          <sendMail></sendMail>
        </template>
    </el-dialog>
  </div>

</template>

<script>
  export default {

    data() {
      return {
        calendarDialogVisiable: false,
        choosedDay: new Date(),
        type:''
      }
    },
    mounted() {

      /*  document.oncontextmenu = function(){
        　　return false;
        } */
    },
    methods: {
      rightClick(data) {
        this.calendarDialogVisiable = true
        this.choosedDay = data.day;
      },
      mailTimer(){
        this.type='mail'
        this.calendarDialogVisiable = true
      },
      noticeTimer(){
        this.type='notice'
         this.calendarDialogVisiable = true
      }
    }
  }
</script>

<style>
</style>
