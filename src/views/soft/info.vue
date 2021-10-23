<template>
  <div class="app-container">
    <h2 style="text-align: center">上传</h2>

    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
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
              <el-form-item label="单位名称" prop="softName">
                <el-input v-model="softInfo.softName" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="项目名称" prop="softName">
                <el-input v-model="softInfo.softName" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content" /></el-col>
        </el-row>
      </el-card>
      <el-divider />

      <el-card>
        <div slot="header">
          <span>填写密码</span>
        </div>

        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" :inline="true">
          <el-row>
            <el-col :span="5">
              <el-form-item label="输入密码" label-width="80px" prop="pass">
                <el-input
                  v-model="ruleForm.pass"
                  placeholder="请输入密码"
                  show-password
                />
              </el-form-item>
            </el-col>

            <el-form-item
              label="密码强度"
              style="display: inline-block; width: 300px"
            >
              <password-strength
                v-model="ruleForm.pass"
                style="padding-top: 10px; width: 200px"
              />
            </el-form-item>
          </el-row>

          <el-row>
            <el-col :span="4">
              <el-form-item
                label="确认密码"
                label-width="80px"
                prop="checkPass"
              >
                <el-input
                  v-model="ruleForm.checkPass"
                  placeholder="请输入密码"
                  show-password
                />
              </el-form-item>
            </el-col>
            <el-form-item>
              <el-alert
                title="密码需要包含数字、小写字母、大写字母以及特殊字符"
                type="warning"
                :closable="false"
              />
            </el-form-item>
          </el-row>
        </el-form>
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

          <el-form-item label="文件清单" :rules="rules">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-input v-model="softname1" disabled />
              </el-col>
              <el-col
                :span="1.2"
              ><div class="grid-content">
                <el-upload
                  class="upload-demo"
                  :action="BASE_API+'/soft/upload?pid='+pid+'&fileType=0'"
                  :show-file-list="false"
                  :on-preview="handlePreview"
                  :before-remove="beforeRemove"
                  :on-remove="handleRemove"
                  :on-success="handSuccess"
                  :limit="1"
                  :file-list="fileList"
                >
                  <el-button
                    class="filter-item"
                    style="margin-left: 10px"
                    type="primary"
                    icon="el-icon-upload"
                  >上传</el-button>
                </el-upload>
              </div></el-col>
              <el-col :span="11">
                <div class="right-items" style="float: left">
                  <el-button
                    class="filter-item"
                    style="margin-left: -3px"
                    type="primary"
                    icon="el-icon-edit"
                  >下 载</el-button>
                  <el-button
                    class="filter-item"
                    style="margin-left: 17px"
                    type="primary"
                    icon="el-icon-delete"
                    @click="softname1=''"
                  >删 除</el-button>
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
            <el-input v-show="false" v-model="ruleForm.uploadFile" />
            (核心文件是指在已部署的可执行系统中实现系统主要功能的文件。）
          </el-form-item>

          <div>
            <el-divider />
            <el-form-item label="文件1" :rules="rules" :required="true">
              <el-row :gutter="20">
                <el-col :span="5">
                  <el-input v-model="this.softname2" />
                </el-col>
                <el-col
                  :span="1.2"
                ><div class="grid-content">
                  <el-upload
                    class="upload-demo"
                    :action="BASE_API+'/soft/upload?pid='+pid+'&fileType=1'"
                    :show-file-list="false"
                    :on-preview="handlePreview"
                    :before-remove="beforeRemove"
                    :on-remove="handleRemove"
                    :on-success="handSucess2"
                    :limit="1"
                    :file-list="fileList"
                  >
                    <el-button
                      class="filter-item"
                      style="margin-left: 10px"
                      type="primary"
                      icon="el-icon-upload"
                    >上传</el-button>
                  </el-upload>
                </div></el-col>
                <el-col :span="11">
                  <div class="right-items" style="float: left">
                    <el-button
                      class="filter-item"
                      style="margin-left: -3px"
                      type="primary"
                      icon="el-icon-edit"
                    >下 载</el-button>
                    <el-button
                      class="filter-item"
                      style="margin-left: 17px"
                      type="primary"
                      icon="el-icon-delete"
                      @click="softname2=''"
                    >删 除</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-divider />
            <el-form-item label="文件2" :rules="rules">
              <el-row :gutter="20">
                <el-col :span="5">
                  <el-input v-model="this.softname3" />
                </el-col>
                <el-col
                  :span="1.2"
                ><div class="grid-content">
                  <el-upload
                    class="upload-demo"
                    :action="BASE_API+'/soft/upload?pid='+pid+'&fileType=2'"
                    :show-file-list="false"
                    :on-preview="handlePreview"
                    :before-remove="beforeRemove"
                    :on-remove="handleRemove"
                    :on-success="handSucess3"
                    :limit="1"
                    :file-list="fileList"
                  >
                    <el-button
                      class="filter-item"
                      style="margin-left: 10px"
                      type="primary"
                      icon="el-icon-upload"
                    >上传</el-button>
                  </el-upload>
                </div></el-col>
                <el-col :span="11">
                  <div class="right-items" style="float: left">
                    <el-button
                      class="filter-item"
                      style="margin-left: -3px"
                      type="primary"
                      icon="el-icon-edit"
                    >下 载</el-button>
                    <el-button
                      class="filter-item"
                      style="margin-left: 17px"
                      type="primary"
                      icon="el-icon-delete"
                      @click="softname3=''"
                    >删 除</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-divider />
            <el-form-item label="文件3" :rules="rules">
              <el-row :gutter="20">
                <el-col :span="5">
                  <el-input v-model="softname4" />
                </el-col>
                <el-col
                  :span="1.2"
                ><div class="grid-content">
                  <el-upload
                    class="upload-demo"
                    :action="BASE_API+'/soft/upload?pid='+pid+'&fileType=3'"
                    :show-file-list="false"
                    :on-preview="handlePreview"
                    :before-remove="beforeRemove"
                    :on-remove="handleRemove"
                    :on-success="handSucess4"
                    :limit="1"
                    :file-list="fileList"
                  >
                    <el-button
                      class="filter-item"
                      style="margin-left: 10px"
                      type="primary"
                      icon="el-icon-upload"
                    >上传</el-button>
                  </el-upload>
                </div></el-col>
                <el-col :span="11">
                  <div class="right-items" style="float: left">
                    <el-button
                      class="filter-item"
                      style="margin-left: -3px"
                      type="primary"
                      icon="el-icon-edit"
                    >下 载</el-button>
                    <el-button
                      class="filter-item"
                      style="margin-left: 17px"
                      type="primary"
                      icon="el-icon-delete"
                      @click="softname4=''"
                    >删 除</el-button>
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
            <el-input v-show="false" v-model="ruleForm.uploadFile" />
            （配置文件是指一种可为计算机程序配置参数和初始设置以及系统资源设定的格式化文档。)<br>
            (常见配位文件具有.cnf、.conf、.cfg、.cg、.ini、.xml等文件扩展名，开发时使用的配置文件扩展名包括.project、.classpath、.make、.config等。）
          </el-form-item>

          <el-form-item label="配置文件" :rules="rules">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-input v-model="this.softname5" />
              </el-col>
              <el-col
                :span="1.2"
              ><div class="grid-content">
                <el-upload
                  class="upload-demo"
                  :action="BASE_API+'/soft/upload?pid='+pid+'&fileType=4'"
                  :show-file-list="false"
                  :on-preview="handlePreview"
                  :before-remove="beforeRemove"
                  :on-remove="handleRemove"
                  :on-success="handSucess5"
                  :limit="1"
                  :file-list="fileList"
                >
                  <el-button
                    class="filter-item"
                    style="margin-left: 10px"
                    type="primary"
                    icon="el-icon-upload"
                  >上传</el-button>
                </el-upload>
              </div></el-col>
              <el-col :span="11">
                <div class="right-items" style="float: left">
                  <el-button
                    class="filter-item"
                    style="margin-left: -3px"
                    type="primary"
                    icon="el-icon-edit"
                  >下 载</el-button>
                  <el-button
                    class="filter-item"
                    style="margin-left: 17px"
                    type="primary"
                    icon="el-icon-delete"
                    @click="softname5=''"
                  >删 除</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
        </el-card>
      </el-card>

      <el-divider />
      <el-button
        :disabled="saveBtnDisabled"
        type="primary"
        @click="storeInfo()"
      >保存</el-button>
      <el-button
        :disabled="saveBtnDisabled"
        type="primary"
        @click="next()"
      >提交
      </el-button>
    </el-form>
  </div>
</template>
<script>
import soft from '@/api/soft/soft-info'
import PasswordStrength from '@/views/soft/password/PasswordStrength'
import uuidv1 from 'uuid/v1'
import { get } from 'js-cookie'
import { date } from 'jszip/lib/defaults'

export default {
  components: {
    PasswordStrength
  },
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
      softname: '',
      softname1: '',
      softname2: '',
      softname3: '',
      softname4: '',
      softname5: '',
      saveBtnDisabled: true, // 保存按钮是否禁用
      BASE_API: process.env.VUE_APP_BASE_API, // 接口API地址
      tableData: [{}],
      saveBtnDisabled: false, // 保存按钮是否禁用
      softInfo: {
        softName: '',
        softDesc: '',
        userName: '',
        phoneNum: ''
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
        ],
        uploadFile: [{ require: true, trigger: 'blur' }]
      },
      pid: '',
      fileList: []
    }
  },
  created() {
    console.log('info created')
    // 获取路由id值
    if (this.$route.params && this.$route.params.id) {
      this.pid = this.$route.params.id
      console.log('这是路由后面的id' + this.pid)
    } else {
      this.getRandomCode()
    }
  },
  methods: {
    handleCreate() {
      this.softname1 = this.softname
    },
    handleCreate1() {
      this.softname2 = file.name
    },
    handleCreate2() {
      this.softname3 = file.name
    },
    handleCreate3() {
      this.softname4 = file.name
    },
    handleCreate4() {
      this.softname5 = file.name
    },
    getRandomCode() {
      this.pid = uuidv1() // 获取随机id
      console.log(this.pid, ' this.Id 11111')
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    // 上传之前调用的方法
    handlePreview(file) {
      const flag = file.size / 1024 / 1024 < 200 && file.size / 1024 / 1024 > 2
      if (!flag) {
        this.$message.error('上传软件大小范围 2MB～200MB!')
      }
      return flag
    },
    // 移除文件之前
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 移除文件后
    handleRemove(file, fileList) {
      soft.deleteFile(this.softId).then((response) => {
        // 请求成功
        // 提示
        this.$message({
          type: 'success',
          message: '移除软件成功!'
        })
      })
    },
    // 提交文件成功
    handSuccess(res, file) {
      alert('上传成功')
      console.log(res)
      this.saveBtnDisabled = false
      this.softname1 = file.name
      console.log(this.softname)
    },
    handSucess2(res, file) {
      alert('上传成功')
      console.log(res)
      this.saveBtnDisabled = false
      this.softname2 = file.name
      console.log(this.softname)
    },
    handSucess3(res, file) {
      alert('上传成功')
      console.log(res)
      this.saveBtnDisabled = false
      this.softname3 = file.name
      console.log(this.softname)
    },
    handSucess4(res, file) {
      alert('上传成功')
      console.log(res)
      this.saveBtnDisabled = false
      this.softname4 = file.name
      console.log(this.softname)
    },
    handSucess5(res, file) {
      alert('上传成功')
      console.log(res)
      this.saveBtnDisabled = false
      this.softname5 = file.name
      console.log(this.softname)
    },

    // 根据软件信息id查询
    getSoftInfo() {
      soft.getSoft(this.softId).then((response) => {
        this.softInfo = response.data.softInfo
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
    storeInfo() {
      this.$router.replace({ name: 'SoftInfoEdit', params: { id: this.pid }})
    },
    next() {
      console.log(this.Id)

      this.$router.push({ name: 'SoftInfoBack', params: { id: this.pid }})
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
