<template>
  <div class="app-container">
    <h2 style="text-align: center;">填写软件基本信息</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写软件基本信息" />
      <el-step title="上传被测软件" />
      <el-step title="提交审核" />
    </el-steps>

    <el-form ref="ruleForm" :model="softInfo" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="软件名称" prop="softName">
        <el-input v-model="softInfo.softName" />
      </el-form-item>
      <el-form-item label="软件描述" prop="softDesc">
        <el-input v-model="softInfo.softDesc" />
      </el-form-item>
      <el-form-item label="软件拥有者" prop="userName">
        <el-input v-model="softInfo.userName" />
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="softInfo.phoneNum" />
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next()">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      softInfo: {
        id: 0,
        softName: '',
        softDesc: '',
        userName: '',
        phoneNum: ''
      },
      rules: {
        softName: [
          { required: true, message: '请输入软件名称', trigger: 'blur' }
        ],
        softDesc: [
          { required: true, message: '请输入软件描述', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入软件拥有者', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    console.log('info created')
  },
  methods: {
    next() {
      console.log('next')
      // soft.addSoft(this.softInfo).then(response =>{//请求成功
      //               //response接口返回的数据
      //               this.softInfo.id = response.data.id
      // })
      this.$router.push({ path: '/soft/upload/' + this.softInfo.id })
    }
  }
}
</script>
