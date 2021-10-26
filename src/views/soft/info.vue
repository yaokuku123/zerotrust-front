<template>
  <div class="app-container">
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
      :rules="rules"
      :model="softInfo"
      label-width="80px"
      class="demo-ruleForm"
    >
      <!-- <el-divider /> -->
      <el-card>
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="项目信息" prop="project">
                <el-input v-model="softInfo.project" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="业务id" prop="sysId">
                <el-input v-model="softInfo.sysId" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="申报单位" prop="appliedinst">
                <el-input v-model="softInfo.appliedinst" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <el-form-item label="建设单位" prop="developinst">
                <el-input v-model="softInfo.developinst" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content" /></el-col>
        </el-row>
      </el-card>
      <!-- <el-divider /> -->

      <el-card>
        <div slot="header">
          <span>填写密码</span>
        </div>

        <el-form ref="ruleForm" :model="softInfo" :rules="rules" :inline="true">
          <el-row>
            <el-col :span="5">
              <el-form-item
                label="输入密码"
                label-width="80px"
                prop="uploadPassword"
              >
                <el-input
                  v-model="softInfo.uploadPassword"
                  placeholder="请输入密码"
                  show-password
                />
              </el-form-item>
            </el-col>

            <el-form-item
              style="display: inline-block; width: 300px; margin-bottom: -200px"
            >
              <password-strength
                v-model="softInfo.uploadPassword"
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
                  v-model="softInfo.checkPass"
                  placeholder="请输入密码"
                  show-password
                />
              </el-form-item>
            </el-col>
            <el-form-item style="padding-top: -20px">
              <el-alert
                title="密码需要包含数字、小写字母、大写字母以及特殊字符"
                type="warning"
                :closable="false"
              />
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>
      <!-- <el-divider />s -->
      <div class="cardcss">
        <el-card>
          <div slot="header" class="clearfix">
            <span>上传文件信息</span>
          </div>
          <el-card shadow="never">
            <el-form-item
              label="核心文件清单（仅限txt）"
              :rules="rules"
              :required="true"
              label-width="200px"
            >
              <a
                href="static/核心文件目录生成方法.pdf"
                style="color: #1890ff"
                download="核心文件目录生成方法.pdf"
                >下载说明书</a
              >
            </el-form-item>

            <el-form-item label="文件清单" :rules="rules">
              <el-row :gutter="20">
                <el-col :span="5">
                  <div class="inputDeep">
                    <el-input v-model="softname1" disabled />
                  </div>
                </el-col>
                <el-col :span="1.2"
                  ><div class="grid-content">
                    <el-upload
                      class="upload-demo"
                      :action="
                        BASE_API +
                        '/soft/upload?pid=' +
                        this.pid +
                        '&fileType=0'
                      "
                      :show-file-list="false"
                      :on-preview="handlePreview0"
                      :before-upload="onBeforeUpload1"
                      :on-success="handSuccess"
                      :file-list="fileList"
                    >
                      <el-button
                        class="filter-item"
                        style="margin-left: 10px"
                        type="primary"
                        icon="el-icon-upload"
                        >上传</el-button
                      >
                    </el-upload>
                  </div></el-col
                >
                <el-col :span="11">
                  <div class="right-items" style="float: left">
                    <el-button
                      class="filter-item"
                      style="margin-left: -3px"
                      type="primary"
                      icon="el-icon-edit"
                      @click="downloadInfo(0)"
                      >下 载</el-button
                    >
                    <el-button
                      class="filter-item"
                      style="margin-left: 17px"
                      type="primary"
                      icon="el-icon-delete"
                      @click="deleteInfo(0)"
                      >删 除</el-button
                    >
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
              (上传个数至少1个，至多3个，且文件必须在清单文件中。）
            </el-form-item>

            <div>
              <el-form-item label="文件1" :rules="rules" :required="true">
                <el-row :gutter="20">
                  <el-col :span="5">
                    <div class="inputDeep">
                      <el-input v-model="this.softname2" disabled />
                    </div>
                    <!-- <el-input v-model="this.softname2" disabled /> -->
                  </el-col>
                  <el-col :span="1.2"
                    ><div class="grid-content">
                      <el-upload
                        class="upload-demo"
                        :action="
                          BASE_API +
                          '/soft/upload?pid=' +
                          this.pid +
                          '&fileType=1'
                        "
                        :show-file-list="false"
                        :on-preview="handlePreview1"
                        :before-upload="onBeforeUpload2"
                        :on-success="handSucess2"
                        :file-list="fileList"
                      >
                        <el-button
                          class="filter-item"
                          style="margin-left: 10px"
                          type="primary"
                          icon="el-icon-upload"
                          >上传</el-button
                        >
                      </el-upload>
                    </div></el-col
                  >
                  <el-col :span="11">
                    <div class="right-items" style="float: left">
                      <el-button
                        class="filter-item"
                        style="margin-left: -3px"
                        type="primary"
                        icon="el-icon-edit"
                        @click="downloadInfo(1)"
                        >下 载</el-button
                      >
                      <el-button
                        class="filter-item"
                        style="margin-left: 17px"
                        type="primary"
                        icon="el-icon-delete"
                        @click="deleteInfo(1)"
                        >删 除</el-button
                      >
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-divider />
              <el-form-item label="文件2" :rules="rules">
                <el-row :gutter="20">
                  <el-col :span="5">
                    <div class="inputDeep">
                      <el-input v-model="this.softname3" disabled />
                    </div>
                  </el-col>
                  <el-col :span="1.2"
                    ><div class="grid-content">
                      <el-upload
                        class="upload-demo"
                        :action="
                          BASE_API +
                          '/soft/upload?pid=' +
                          this.pid +
                          '&fileType=2'
                        "
                        :show-file-list="false"
                        :before-upload="onBeforeUpload3"
                        :on-preview="handlePreview2"
                        :on-success="handSucess3"
                        :file-list="fileList"
                      >
                        <el-button
                          class="filter-item"
                          style="margin-left: 10px"
                          type="primary"
                          icon="el-icon-upload"
                          >上传</el-button
                        >
                      </el-upload>
                    </div></el-col
                  >
                  <el-col :span="11">
                    <div class="right-items" style="float: left">
                      <el-button
                        class="filter-item"
                        style="margin-left: -3px"
                        type="primary"
                        icon="el-icon-edit"
                        @click="downloadInfo(2)"
                        >下 载</el-button
                      >
                      <el-button
                        class="filter-item"
                        style="margin-left: 17px"
                        type="primary"
                        icon="el-icon-delete"
                        @click="deleteInfo(2)"
                        >删 除</el-button
                      >
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-divider />
              <el-form-item label="文件3" :rules="rules">
                <el-row :gutter="20">
                  <el-col :span="5">
                    <div class="inputDeep">
                      <el-input v-model="softname4" disabled />
                    </div>
                  </el-col>
                  <el-col :span="1.2"
                    ><div class="grid-content">
                      <el-upload
                        class="upload-demo"
                        :action="
                          BASE_API +
                          '/soft/upload?pid=' +
                          this.pid +
                          '&fileType=3'
                        "
                        :before-upload="onBeforeUpload4"
                        :show-file-list="false"
                        :on-preview="handlePreview3"
                        :on-success="handSucess4"
                        :file-list="fileList"
                      >
                        <el-button
                          class="filter-item"
                          style="margin-left: 10px"
                          type="primary"
                          icon="el-icon-upload"
                          >上传</el-button
                        >
                      </el-upload>
                    </div></el-col
                  >
                  <el-col :span="11">
                    <div class="right-items" style="float: left">
                      <el-button
                        class="filter-item"
                        style="margin-left: -3px"
                        type="primary"
                        icon="el-icon-edit"
                        @click="downloadInfo(3)"
                        >下 载</el-button
                      >
                      <el-button
                        class="filter-item"
                        style="margin-left: 17px"
                        type="primary"
                        icon="el-icon-delete"
                        @click="deleteInfo(3)"
                        >删 除</el-button
                      >
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
              label-width="135px"
            >
              <el-input v-show="false" v-model="ruleForm.uploadFile" />
              （配置文件是指一种可为计算机程序配置参数和初始设置以及系统资源设定的格式化文档。)<br />
              (常见配位文件具有.cnf、.conf、.cfg、.cg、.ini、.xml等文件扩展名，开发时使用的配置文件扩展名包括.project、.classpath、.make、.config等。）
            </el-form-item>

            <el-form-item label="配置文件" :rules="rules">
              <el-row :gutter="20">
                <el-col :span="5">
                  <div class="inputDeep">
                    <el-input v-model="this.softname5" disabled />
                  </div>
                </el-col>
                <el-col :span="1.2"
                  ><div class="grid-content">
                    <el-upload
                      class="upload-demo"
                      :action="
                        BASE_API +
                        '/soft/upload?pid=' +
                        this.pid +
                        '&fileType=4'
                      "
                      :before-upload="onBeforeUpload5"
                      :show-file-list="false"
                      :on-preview="handlePreview4"
                      :on-success="handSucess5"
                      :file-list="fileList"
                    >
                      <el-button
                        class="filter-item"
                        style="margin-left: 10px"
                        type="primary"
                        icon="el-icon-upload"
                        >上传</el-button
                      >
                    </el-upload>
                  </div></el-col
                >
                <el-col :span="11">
                  <div class="right-items" style="float: left">
                    <el-button
                      class="filter-item"
                      style="margin-left: -3px"
                      type="primary"
                      icon="el-icon-edit"
                      @click="downloadInfo(4)"
                      >下 载</el-button
                    >
                    <el-button
                      class="filter-item"
                      style="margin-left: 17px"
                      type="primary"
                      icon="el-icon-delete"
                      @click="deleteInfo(4)"
                      >删 除</el-button
                    >
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-card>
        </el-card>
      </div>
      <el-divider />
      <el-button :disabled="saveBtnDisabled" type="primary" @click="storeInfo()"
        >保存</el-button
      >
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next()"
        >提交
      </el-button>
    </el-form>
  </div>
</template>
<script>
import soft from "@/api/soft/soft-info";
import softVerify from "@/api/soft/soft-verify";
import PasswordStrength from "@/views/soft/password/PasswordStrength";
import uuidv1 from "uuid/v1";

export default {
  components: {
    PasswordStrength,
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.softInfo.checkPass !== "") {
          this.$refs.softInfo.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.softInfo.uploadPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      baseCertDownloadUrl: process.env.VUE_APP_BASE_API,
      softname: "",
      softname1: "",
      softname2: "",
      softname3: "",
      softname4: "",
      softname5: "",
      softFile: [
        { soft: "" },
        { soft: "" },
        { soft: "" },
        { soft: "" },
        { soft: "" },
      ],
      saveBtnDisabled: true, // 保存按钮是否禁用
      BASE_API: process.env.VUE_APP_BASE_API, // 接口API地址
      saveBtnDisabled: false, // 保存按钮是否禁用
      softInfo: {
        comName: "",
        pid: "",
        proName: "",
        uploadPassword: "",
        checkPass: "",
        fileUploadVoList: "",
      },
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
        uploadFile: "",
      },
      rules: {
        comName: [
          { required: true, message: "请输入软件名称", trigger: "blur" },
        ],
        proName: [
          { required: true, message: "请输入软件描述", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入软件拥有者", trigger: "blur" },
        ],
        phoneNum: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        uploadPassword: [
          { validator: validatePass, trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" },
          { required: true, trigger: "blur" },
        ],
        uploadFile: [{ require: true, trigger: "blur" }],
      },
      pid: "",
      fileList: [],
    };
  },
  created() {
    // 获取路由id值
    if (this.$route.params && this.$route.params.id) {
      this.pid = this.$route.params.id;
      console.log("redirect : " + this.pid);
      this.getData();

      console.log("这是路由后面的id" + this.pid);
    } else {
      this.getRandomCode();
    }
  },
  methods: {
    onBeforeUpload1(file) {
      console.log(file);

      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);

      const whiteList = ["txt"];
      console.log("BAKA");
      if (whiteList.indexOf(fileSuffix) == -1) {
        alert("上传文件只能是 txt 格式");
        flag = false;
        return flag;
      }

      this.softFile[0].soft = file.name;
      var flag = false;
      flag = this.fileCompare();
      console.log("this.compare" + flag);
      if (flag) {
        this.softname1 = file.name;
      } else {
        this.softFile[0].soft = "";
      }

      return flag;
    },
    onBeforeUpload2(file) {
      console.log(file);
      this.softFile[1].soft = file.name;
      console.log("error0");
      var flag = this.fileCompare();
      console.log(flag);
      if (flag) {
        this.softname2 = file.name;
      } else {
        this.softFile[1].soft = "";
      }
      return flag;
    },
    onBeforeUpload3(file) {
      console.log(file);
      this.softFile[2].soft = file.name;
      console.log("error0");
      var flag = this.fileCompare();
      console.log(flag);
      if (flag) {
        this.softname3 = file.name;
      } else {
        this.softFile[2].soft = "";
      }
      return flag;
    },
    onBeforeUpload4(file) {
      console.log(file);
      this.softFile[3].soft = file.name;
      console.log("error0");
      var flag = this.fileCompare();
      console.log(flag);
      if (flag) {
        this.softname4 = file.name;
      } else {
        this.softFile[3].soft = "";
      }
      return flag;
    },
    onBeforeUpload5(file) {
      console.log(file);

      // const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)

      // const whiteList = ['cnf', 'conf', 'cfg', 'cg', 'ini', 'xml', 'project', 'classpath', 'make', 'config']
      // console.log('BAKA')
      // if (whiteList.indexOf(fileSuffix) == -1) {
      //   console.log(fileSuffix)
      //   alert('上传文件只能是 cnf、conf、cfg、cg、ini、xml、project、classpath、make、config格式')
      //   flag = false
      //   return flag
      // }

      this.softFile[4].soft = file.name;
      console.log("error0");
      var flag = this.fileCompare();
      console.log(flag);
      if (flag) {
        this.softname5 = file.name;
      } else {
        this.softFile[4].soft = "";
      }

      return flag;
    },

    getRandomCode() {
      this.pid = uuidv1(); // 获取随机id
      this.softInfo.pid = this.pid;
      console.log(this.pid, " this.Id 11111");
    },
    fileCompare() {
      var i = 0;
      var j = 0;
      for (i; i < 5; i++) {
        if (this.softFile[i].soft == "") continue;
        console.log("文件名i" + this.softFile[i].soft);
        j = i + 1;
        for (j; j < 5; j++) {
          if (this.softFile[j].soft == this.softFile[i].soft) {
            console.log("文件名j" + this.softFile[j].soft);
            alert("文件重名！");
            console.log("error1");
            return false;
          }
        }
      }
      console.log("函数执行到这边了吗");
      return true;
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 上传之前调用的方法
    handlePreview0(file) {
      const flag = file.size / 1024 / 1024 < 200 && file.size / 1024 / 1024 > 2;
      if (!flag) {
        this.$message.error("上传软件大小范围 2MB～200MB!");
      }

      return flag;
    },
    handlePreview1(file) {
      const flag = file.size / 1024 / 1024 < 200 && file.size / 1024 / 1024 > 2;
      if (!flag) {
        this.$message.error("上传软件大小范围 2MB～200MB!");
      }
      return flag;
    },
    handlePreview2(file) {
      const flag = file.size / 1024 / 1024 < 200 && file.size / 1024 / 1024 > 2;
      if (!flag) {
        this.$message.error("上传软件大小范围 2MB～200MB!");
      }
      return flag;
    },
    handlePreview3(file) {
      const flag = file.size / 1024 / 1024 < 200 && file.size / 1024 / 1024 > 2;
      if (!flag) {
        this.$message.error("上传软件大小范围 2MB～200MB!");
      }
      return flag;
    },
    handlePreview4(file) {
      const flag = file.size / 1024 / 1024 < 200 && file.size / 1024 / 1024 > 2;
      if (!flag) {
        this.$message.error("上传软件大小范围 2MB～200MB!");
      }
      return flag;
    },
    // 移除文件之前
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 移除文件后
    handleRemove(file, fileList) {
      soft.deleteFile(this.softId).then((response) => {
        // 请求成功
        // 提示
        this.$message({
          type: "success",
          message: "移除软件成功!",
        });
      });
    },
    // 提交文件成功
    handSuccess(res, file) {
      // alert("上传成功");
      this.$message({
        message: "上传成功",
        type: "success",
      });
      console.log(res);
      this.saveBtnDisabled = false;
      this.softname1 = file.name;
    },
    handSucess2(res, file) {
      // alert("上传成功");
      this.$message({
        message: "上传成功",
        type: "success",
      });
      console.log(res);
      this.saveBtnDisabled = false;
      this.softname2 = file.name;
      console.log(this.softname);
    },
    handSucess3(res, file) {
      // alert("上传成功");
      this.$message({
        message: "上传成功",
        type: "success",
      });
      console.log(res);
      this.saveBtnDisabled = false;
      this.softname3 = file.name;
      console.log(this.softname);
    },
    handSucess4(res, file) {
      // alert("上传成功");
      this.$message({
        message: "上传成功",
        type: "success",
      });
      console.log(res);
      this.saveBtnDisabled = false;
      this.softname4 = file.name;
      console.log(this.softname);
    },
    handSucess5(res, file) {
      // alert("上传成功");
      this.$message({
        message: "上传成功",
        type: "success",
      });
      console.log(res);
      this.saveBtnDisabled = false;
      this.softname5 = file.name;
      console.log(this.softname);
    },
    getData() {
      softVerify.getSoftInfo(this.pid).then((res) => {
        console.log("这是传回来的数据" + res);
        this.softInfo = res.data.softInfo;
        if (JSON.stringify(this.softInfo.status) == JSON.stringify(2)) {
          this.$router.push({
            name: "SoftInfoBack",
            params: { id: this.pid },
          });
        }
        for (var i = 0; i < this.softInfo.fileUploadVoList.length; i++) {
          if (
            JSON.stringify(this.softInfo.fileUploadVoList[i].fileType) ==
            JSON.stringify(0)
          ) {
            this.softname1 = this.softInfo.fileUploadVoList[i].fileName;
            this.softFile[0].soft = this.softname1;
          }
          if (
            JSON.stringify(this.softInfo.fileUploadVoList[i].fileType) ==
            JSON.stringify(1)
          ) {
            this.softname2 = this.softInfo.fileUploadVoList[i].fileName;
            this.softFile[1].soft = this.softname2;
          }
          if (
            JSON.stringify(this.softInfo.fileUploadVoList[i].fileType) ==
            JSON.stringify(2)
          ) {
            this.softname3 = this.softInfo.fileUploadVoList[i].fileName;
            this.softFile[2].soft = this.softname3;
          }
          if (
            JSON.stringify(this.softInfo.fileUploadVoList[i].fileType) ==
            JSON.stringify(3)
          ) {
            this.softname4 = this.softInfo.fileUploadVoList[i].fileName;
            this.softFile[3].soft = this.softname4;
          }
          if (
            JSON.stringify(this.softInfo.fileUploadVoList[i].fileType) ==
            JSON.stringify(4)
          ) {
            this.softname5 = this.softInfo.fileUploadVoList[i].fileName;
            this.softFile[4].soft = this.softname5;
          }
        }
      });
    },
    addSoftInfo() {
      soft.addSoft(this.softInfo).then((response) => {
        // 请求成功
        // 提示
        this.$message({
          type: "success",
          message: "添加软件信息成功!",
        });
        // 跳转到第二步，response接口返回的数据
        this.$router.push({ path: "/soft/upload/" + response.data.id });
      });
    },
    // 修改软件信息
    updateSoftInfo() {
      soft.updateSoft(this.softId, this.softInfo).then((response) => {
        // 提示
        this.$message({
          type: "success",
          message: "修改软件信息成功!",
        });
        // 跳转到第二步
        this.$router.push({ path: "/soft/upload/" + this.softId });
      });
    },
    // 跳转
    storeInfo() {
      if (this.softInfo.checkPass == "") {
        alert("请输入密码再上传或者保存");
      } else {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        console.log("storeInfo " + this.softInfo.proName);
        this.actionMethod(this.softInfo);
        // this.$router.push({ path: '/soft/info/' + this.pid })
        this.$router.replace({
          name: "SoftInfoEdit",
          params: { id: this.pid },
        });
      }
      // console.log("storeInfo " + this.softInfo.proName);
      // this.actionMethod(this.softInfo);
      // // this.$router.push({ path: '/soft/info/' + this.pid })
      // this.$router.replace({
      //   name: "SoftInfoEdit",
      //   params: { id: this.pid },
      // });
    },
    submitInfo(data) {
      var that = this;
      softVerify.submitSoftInfo(data).then((res) => {
        if (res.data.flag) {
          console.log(that.pid);
          softVerify.getcheck(that.pid).then((subRes) => {
            this.$router.push({
              name: "SoftInfoBack",
              params: { id: that.pid },
            });
          });
        } else {
          alert("文件不匹配");
        }
      });
    },
    downloadInfo(id) {
      window.open(
        this.baseCertDownloadUrl +
          "/soft/download?pid=" +
          this.pid +
          "&fileType=" +
          id
      );
    },
    deleteInfo(id) {
      softVerify.deleteSoftInfo(this.pid, id).then((res) => {
        console.log("删除成功了吗" + res.data);
        switch (id) {
          case 0:
            this.softname1 = ""; // 当表达式的结果等于 value1 时，则执行该代码
            this.softFile[0].soft = "";
            break;
          case 1:
            this.softname2 = ""; // 当表达式的结果等于 value2 时，则执行该代码
            this.softFile[1].soft = "";
            break;
          case 2:
            this.softname3 = ""; // 当表达式的结果等于 valueN 时，则执行该代码
            this.softFile[2].soft = "";
            break;
          case 3:
            this.softname4 = ""; // 当表达式的结果等于 valueN 时，则执行该代码
            this.softFile[3].soft = "";
            break;
          case 4:
            this.softname5 = ""; // 当表达式的结果等于 valueN 时，则执行该代码
            this.softFile[4].soft = "";
            break;
          default:
            break; // 如果没有与表达式相同的值，则执行该代码
        }
      });
    },
    next() {
      if (this.softInfo.checkPass == "") {
        alert("请输入密码再上传或者保存");
      } else if (this.softname2 == "") {
        alert("缺少必须上传的核心文件1");
      } else {
        this.submitInfo(this.softInfo);
      }
      // this.submitInfo(this.softInfo);
      // this.$router.push({
      //   name: "SoftInfoBack",
      //   params: { id: this.pid },
      // });
    },
    actionMethod(data) {
      if (this.$route.params && this.$route.params.id) {
        softVerify.update(data).then((res) => {
          console.log(res.data);
        });
      } else {
        softVerify.insert(data).then((res) => {
          console.log(res.data);
        });
      }
    },
  },
};
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
/* .inputDeep >>> .el-input__inner {
  border: 0;
} */
.inputDeep >>> .el-input__inner {
  background-color: #ffffff;
  color: black;
}
</style>
