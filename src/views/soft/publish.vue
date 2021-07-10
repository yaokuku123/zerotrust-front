<template>
  <div class="app-container">
    <h2 style="text-align: center;">提交审核</h2>

    <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写软件基本信息" />
      <el-step title="上传被测软件" />
      <el-step title="提交审核" />
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="软件名称" prop="softName">
        <el-input v-model="softInfo.softName" disabled/>
      </el-form-item>
      <el-form-item label="软件描述" prop="softDesc">
        <el-input v-model="softInfo.softDesc" disabled/>
      </el-form-item>
      <el-form-item label="软件拥有者" prop="userName">
        <el-input v-model="softInfo.userName" disabled/>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="softInfo.phoneNum" disabled/>
      </el-form-item>
      <el-form-item>
        <el-button @click="previous">返回修改</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">申请发布软件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import soft from '@/api/soft/soft-info'

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      softInfo: {
        softName: '',
        softDesc: '',
        userName: '',
        phoneNum: ''
      }
    }
  },
  created() {
    console.log('publish created')
    //获取路由软件id值
    if(this.$route.params && this.$route.params.id) {
      this.softId = this.$route.params.id
      //调用接口方法根据软件id查询
      this.getSoftInfo()
    }
  },
  methods: {
    //根据软件id查询
    getSoftInfo() {
      soft.getSoft(this.softId)
        .then(response => {
          this.softInfo = response.data.softInfo
        })
    },
    previous() {
      console.log('previous')
      this.$router.push({ path: '/soft/upload/'+ this.softId })
    },
    publish() {
      soft.softVerify(this.softId)
        .then(response => {
          //提示
          this.$message({
              type: 'success',
              message: '软件申请发布成功，等待审核结果!'
          });
          //跳转软件列表页面
          this.$router.push({ path: '/soft/list' })
        })
      
    }
  }
}
</script>
