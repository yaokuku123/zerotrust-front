<template>
  <div class="app-container">
    <h2 style="text-align: center;">填写软件基本信息</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写软件基本信息" />
      <el-step title="上传被测软件" />
      <el-step title="提交审核" />
    </el-steps>

    <el-form ref="softInfo" :model="softInfo" :rules="rules" label-width="100px" class="demo-ruleForm">
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
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next('softInfo')">保存并下一步</el-button>
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
    //获取路由id值
    if(this.$route.params && this.$route.params.id) {
        this.softId = this.$route.params.id
        //调用根据id查询课程的方法
        this.getSoftInfo()
    }
  },
  methods: {
    //根据软件信息id查询
    getSoftInfo(){
      soft.getSoft(this.softId).then(response =>{
        this.softInfo = response.data.softInfo
      })
    },
    //添加软件信息
    addSoftInfo(){
      soft.addSoft(this.softInfo).then(response =>{//请求成功
        //提示
        this.$message({
            type: 'success',
            message: '添加软件信息成功!'
        });
        //跳转到第二步，response接口返回的数据
        this.$router.push({ path: '/soft/upload/' + response.data.id })
      })
    },
    //修改软件信息
    updateSoftInfo() {
        soft.updateSoft(this.softId,this.softInfo).then(response => {
          //提示
          this.$message({
              type: 'success',
              message: '修改软件信息成功!'
          });
          //跳转到第二步
          this.$router.push({path:'/soft/upload/'+ this.softId })
        })
    },
    //跳转
    next(formName) {
      console.log('next')
      this.$refs[formName].validate((valid) => {
          if (valid) {
            //判断添加还是修改
            if(!this.softId) {
                //添加
                this.addSoftInfo()
            } else {
                //修改
                this.updateSoftInfo()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
      })
    }
  }
}
</script>
