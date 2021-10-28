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
            <div class="grid-content">
              <el-form-item label="项目信息" prop="project">
                <div class="inputDeep">
                <el-input disabled v-model="softInfo.project" />
                </div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="业务id" prop="sysId">
                <div class="inputDeep">
                <el-input disabled v-model="softInfo.sysId" />
                </div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="申报单位" prop="appliedinst">
                <div class="inputDeep">
                <el-input disabled v-model="softInfo.appliedinst" />
                </div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="建设单位" prop="developinst">
                <div class="inputDeep">
                <el-input disabled v-model="softInfo.developinst" />
                </div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content" /></el-col>
        </el-row>
      </el-card>
      <el-divider />
      <div class="inputcss">
        <div class="cardcss">
          <el-card>
            <div slot="header" class="clearfix">

              <el-form-item label="上传文件信息">
                <el-button type="text" @click="dialogVisible = true">下载软件压缩包</el-button>
              </el-form-item>

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
                  <el-col :span="8">
                    <div class="inputDeep">
                    <el-input v-model="fileUploadVoList.file0"  disabled />
                    </div>
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
              <div class="inputDeep">
                <el-input v-show="false" v-model="ruleForm.uploadFile.fileName" disabled />
              </div>
              </el-form-item>

              <div>
                <el-form-item label="文件1" :rules="rules" :required="true">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="inputDeep">
                      <el-input v-model="fileUploadVoList.file1"  disabled />
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="文件2" :rules="rules">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="inputDeep">
                      <el-input v-model="fileUploadVoList.file2"  disabled />
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="文件3" :rules="rules">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="inputDeep">
                      <el-input v-model="fileUploadVoList.file3"  disabled />
                      </div>
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
              </el-form-item>

              <el-form-item label="配置文件" :rules="rules">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="inputDeep">
                    <el-input v-model="fileUploadVoList.file4"  disabled />
                    </div>
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

<!--              <el-row :gutter="20">
                <el-col :span="5">
                  <el-form-item label="核验码" :rules="rules">
                    <el-input v-model="ruleForm.uploadFile" style="width: 500px" disabled />
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-button style="" type="primary">下载软件证书</el-button>
                </el-col>
              </el-row>-->

              <el-form-item label="核验码" :rules="rules">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="inputDeep">
                    <el-input v-model="softInfo.verificationCode"  disabled />
                    </div>
                  </el-col>
                  <el-col :span="11">
                    <div class="right-items" style="float: left">
                      <el-button style="" type="primary" @click="downloadCert">下载软件证书</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>



            </el-card>
          </el-card>
        </div>
      </div>

      <el-divider />
      <el-button
        :disabled="saveBtnDisabled"
        type="primary"
        @click="next()"
      >{{buttonMessage}}
      </el-button>
    </el-form>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        请输入注册软件时输入的密码<el-input v-model="downloadPassWord" type="password" />
      </span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkPass">验证密码</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import soft from '@/api/soft/soft-info'
import uuidv1 from 'uuid/v1'
import softVerify from '@/api/soft/soft-verify'

export default {
  data() {
    return {
      buttonMessage:'下一步',
      pid:'',
      fileList: [],
      tableData: [{}],
      baseCertDownloadUrl: process.env.VUE_APP_BASE_API,
      dialogVisible: false,
      saveBtnDisabled: false, // 保存按钮是否禁用
      downloadPassWord: '',
      softInfo: {},
      fileUploadVoList: {
        file0: '',
        file1: '',
        file2: '',
        file3: '',
        file4: ''
      },
      passCheckRes: '',
      check: {
        pid: '',
        password: ''
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
        ]
      },
      Id: ''
    }
  },
  created() {
    let uid = this.$route.query.uid;
    console.log("zheshiuid"+uid)
    if(uid ==2){
      this.buttonMessage='返回'
    }
    this.pid = this.$route.params.id
    // 获取路由id值
    this.getData()
  },
  methods: {
    getData() {
      softVerify.getSoftInfo(this.pid).then(res => {
        this.softInfo = res.data.softInfo
        this.tableData = this.softInfo.fileUploadVoList
        for (var i = 0; i < this.softInfo.fileUploadVoList.length; i++) {
          if (
            JSON.stringify(this.softInfo.fileUploadVoList[i].fileType) ==
            JSON.stringify(0)
          ) {
            this.fileUploadVoList.file0 = this.softInfo.fileUploadVoList[i].fileName;
        
          }
          if (
            JSON.stringify(this.softInfo.fileUploadVoList[i].fileType) ==
            JSON.stringify(1)
          ) {
            this.fileUploadVoList.file1 = this.softInfo.fileUploadVoList[i].fileName;
           
          }
          if (
            JSON.stringify(this.softInfo.fileUploadVoList[i].fileType) ==
            JSON.stringify(2)
          ) {
            this.fileUploadVoList.file2 = this.softInfo.fileUploadVoList[i].fileName;
            
          }
          if (
            JSON.stringify(this.softInfo.fileUploadVoList[i].fileType) ==
            JSON.stringify(3)
          ) {
            this.fileUploadVoList.file3 = this.softInfo.fileUploadVoList[i].fileName;
            
          }
          if (
            JSON.stringify(this.softInfo.fileUploadVoList[i].fileType) ==
            JSON.stringify(4)
          ) {
            this.fileUploadVoList.file4 = this.softInfo.fileUploadVoList[i].fileName;
            
          }
        }
      })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 跳转
    next() {
      if(this.$route.query&&this.$route.query.uid ==2){
        this.$router.push({ path: '/soft/list/' })
      }else{
        console.log('这是back页面的id'+this.$route.params.id)
              this.$router.push({ path: '/soft/list/'+this.$route.params.id})
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    checkPass() {
      this.check.pid = this.softInfo.pid
      this.check.password = this.downloadPassWord
      softVerify.fetchCheckPass(this.check).then(res => {
        if (res.data.result == true) window.open(this.baseCertDownloadUrl + '/zipSoftDownload?pid=' + this.pid)
      })
    },
    downloadCert() {
      window.open(this.baseCertDownloadUrl + '/generatePDF?pid=' + this.pid)
    }
  }
}
</script>

<style scoped>
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
.cardcss .el-card /deep/.el-card__body {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
/deep/.el-row[data-v-41871d6e] {
  margin-bottom: 0px;
}

.inputcss .el-form-item /deep/ .el-form-item__content{
  height: 20px;
}
.inputDeep >>> .el-input__inner {
  background-color: #ffffff;
  color: black;
}
</style>
