<template>
  <div class="app-container">

    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 20px"
    >
      <el-step title="上传" />
      <el-step title="归档" />
      <el-step title="浏览" />
    </el-steps>

    <el-form
      ref="softInfo"
      :model="softInfo"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-divider />
      <el-card>
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <el-row>
          <el-col :span="12">
            <div class="grid-content" style="margin-bottom: -20px">
              <el-form-item label="单位名称" prop="softName">
                <el-input v-model="softInfo.comName" disabled />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content" style="margin-bottom: -60px">
              <el-form-item label="项目名称" prop="softName">
                <el-input v-model="softInfo.proName" disabled />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content" /></el-col>
        </el-row>
      </el-card>
      <el-divider />
      <el-card>
        <div slot="header" class="clearfix">
          <span>上传文件信息</span>
        </div>
        <el-card shadow="never">
          <el-form-item
            label="核心文件清单"
            :rules="rules"
            :required="true"
            label-width="135px"
          >
            <a href="static/核心文件目录生成方法.pdf" style="color:#1890ff" download="核心文件目录生成方法.pdf">下载说明书</a>
          </el-form-item>

          <el-form-item
            label="文件清单"
            :rules="rules"
            style="margin-bottom: 10px"
          >
            <el-row :gutter="20">
              <el-col :span="5">
                <el-input v-model="fileUploadVoList.file0" style="width: 500px" disabled />
              </el-col>
            </el-row>
          </el-form-item>
        </el-card>
        <!-- 核心文件。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。-->
        <el-card shadow="never">
          <el-form-item
            label="上传核心文件"
            :rules="rules"
            :required="true"
            label-width="135px"
          >
            <el-input v-show="false" v-model="ruleForm.uploadFile.fileName" disabled />
            (核心文件是指在已部署的可执行系统中实现系统主要功能的文件。）
          </el-form-item>

          <div>
            <el-divider />
            <el-form-item label="文件1" :rules="rules" :required="true">
              <el-row :gutter="20">
                <el-col :span="5">
                  <el-input v-model="fileUploadVoList.file1" style="width: 500px" disabled />
                </el-col>
              </el-row>
            </el-form-item>
            <el-divider />
            <el-form-item label="文件2" :rules="rules">
              <el-row :gutter="20">
                <el-col :span="5">
                  <el-input v-model="fileUploadVoList.file2" style="width: 500px" disabled />
                </el-col>
              </el-row>
            </el-form-item>
            <el-divider />
            <el-form-item label="文件3" :rules="rules">
              <el-row :gutter="20">
                <el-col :span="5">
                  <el-input v-model="fileUploadVoList.file3" style="width: 500px" disabled />
                </el-col>
              </el-row>
            </el-form-item>
          </div>
        </el-card>
        <!-- 核心文件。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。-->

        <el-card shadow="never">
          <el-form-item
            label="系统配置文件"
            :rules="rules"
            :required="true"
            label-width="135px"
          >
            <el-input v-show="false" v-model="ruleForm.uploadFile" disabled />
            （配置文件是指一种可为计算机程序配置参数和初始设置以及系统资源设定的格式化文档。)<br>
            (常见配位文件具有.cnf、.conf、.cfg、.cg、.ini、.xml等文件扩展名，开发时使用的配置文件扩展名包括.project、.classpath、.make、.config等。）
          </el-form-item>

          <el-form-item label="配置文件" :rules="rules">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-input v-model="fileUploadVoList.file4" disabled />
              </el-col>
            </el-row>
          </el-form-item>
        </el-card>
        <el-card shadow="never">
          <el-form-item
            label="查看软件指纹"
            :rules="rules"
            label-width="135px"
          />

          <el-form-item label="核验码" :rules="rules">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-input v-model="ruleForm.uploadFile" disabled />
              </el-col>
              <el-row>
                <el-button type="primary">下载软件证书</el-button>
              </el-row>
            </el-row>
          </el-form-item>
        </el-card>
      </el-card>

      <el-divider />
      <el-button
        :disabled="saveBtnDisabled"
        type="primary"
        @click="next()"
      >下一步
      </el-button>
    </el-form>
  </div>
</template>
<script>
import soft from '@/api/soft/soft-info'
import uuidv1 from 'uuid/v1'
import softVerify from '@/api/soft/soft-verify'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      tableData: [{}],
      saveBtnDisabled: false, // 保存按钮是否禁用
      softInfo: {
        comName: '',
        pid: '',
        proName: '',
        uploadPassword: '',
        checkPass: '',
        fileUploadVoList: ''
      },
      fileUploadVoList: {
        file0: '',
        file1: '',
        file2: '',
        file3: '',
        file4: ''
      },
      ruleForm: {
        pass: '',
        checkPass: '',
        age: '',
        uploadFile: ''
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
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ]
      },
      Id: ''
    }
  },
  created() {
    console.log('info created')
    this.pid = this.$route.params.id
    console.log(this.softInfo.pid)
    // 获取路由id值
    this.getData(this.pid)
  },
  methods: {
    getData() {
      console.log('hello')
      softVerify.getSoftInfo(this.pid).then(res => {
        this.softInfo = res.data.softInfo
        this.tableData = this.softInfo.fileUploadVoList
        console.log(res)
        this.fileUploadVoList.file0 = this.tableData[0].fileName
        this.fileUploadVoList.file1 = this.tableData[1].fileName
        this.fileUploadVoList.file2 = this.tableData[2].fileName
        this.fileUploadVoList.file3 = this.tableData[3].fileName
        this.fileUploadVoList.file4 = this.tableData[4].fileName

        console.log(this.fileUploadVoList)
      })
    },
    getRandomCode() {
      this.Id = uuidv1() // 获取随机id
      console.log(this.Id, ' this.Id 11111')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    // 根据软件信息id查询
    getSoftInfo() {
      soft.getSoft(this.softId).then((response) => {
        this.softInfo = response.data.softInfo
        this.fileUploadVoList = this.softInfo.fileUploadVoList
      })
    },
    // 添加软件信息
    addSoftInfo() {
      soft.addSoft(this.softInfo).then((response) => {
        // 请求成功
        // 提示
        this.$message({
          type: 'success',
          message: '添加软件信息成功!'
        })
        // 跳转到第二步，response接口返回的数据
        this.$router.push({ path: '/soft/upload/' + response.data.id })
      })
    },
    // 修改软件信息
    updateSoftInfo() {
      soft.updateSoft(this.softId, this.softInfo).then((response) => {
        // 提示
        this.$message({
          type: 'success',
          message: '修改软件信息成功!'
        })
        // 跳转到第二步
        this.$router.push({ path: '/soft/upload/' + this.softId })
      })
    },
    // 跳转
    next() {
        this.$router.push({ path: '/soft/list/' })
      console.log('next')
    }
  }
}
</script>

<style>
.inline-border {
  border-style: solid;
  border-width: 1px;
}
.inline-block {
  display: inline-block;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 5px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-form-item__label {
  width: 120px;
}
</style>
