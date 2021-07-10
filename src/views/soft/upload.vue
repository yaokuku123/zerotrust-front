<template>
  <div class="app-container">
    <h2 style="text-align: center;">上传被测软件</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写软件基本信息" />
      <el-step title="上传被测软件" />
      <el-step title="提交审核" />
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="被测软件">
        <el-upload
          class="upload-demo"
          :action="BASE_API+'/soft/upload/'+softId"
          :on-preview="handlePreview"
          :before-remove="beforeRemove"
          :on-remove="handleRemove"
          :on-success="handSuccess"
          :limit="1"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">上传被测软件</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import soft from '@/api/soft/soft-info'

export default {
  data() {
    return {
      saveBtnDisabled: true,// 保存按钮是否禁用
      BASE_API: process.env.VUE_APP_BASE_API, // 接口API地址
    }
  },
  created() {
    console.log('info created')
    //获取路由id值
    if(this.$route.params && this.$route.params.id) {
        this.softId = this.$route.params.id
        
    }
  },
  methods: {
    //上传之前调用的方法
    handlePreview(file) {
      const flag = (file.size / 1024 / 1024 < 200) && (file.size / 1024 / 1024 > 2)
      if (!flag) {
          this.$message.error('上传软件大小范围 2MB～200MB!')
      }
      return flag
    },
    //移除文件之前
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    //移除文件后
    handleRemove(file, fileList){
      soft.deleteFile(this.softId).then(response =>{//请求成功
        //提示
        this.$message({
            type: 'success',
            message: '移除软件成功!'
        });
      })
    },
    //提交文件成功
    handSuccess(res, file){
      this.saveBtnDisabled = false;
    },
    previous() {
      console.log('previous')
      this.$router.push({ path: '/soft/info/'+ this.softId })
    },
    next() {
      console.log('next')
      this.$router.push({ path: '/soft/publish/'+ this.softId })
    }
  }
}
</script>
