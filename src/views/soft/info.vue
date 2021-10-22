<template>
  <div class="app-container">
    <h2 style="text-align: center">用户文件上传</h2>

    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="用户文件上传" />
      <el-step title="用户文件上传确认" />
      <el-step title="用户归档信息浏览" />
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

        <el-form-item label="清单文件" :rules="rules" :required="true">
          <el-input v-show="false" v-model="ruleForm.uploadFile" />
          (待填信息）
        </el-form-item>

        <el-form-item span="4">
          <el-row>
            <el-upload
              class="upload-demo"
              :action="BASE_API + '/soft/upload/' + softId"
              :on-preview="handlePreview"
              :before-remove="beforeRemove"
              :on-remove="handleRemove"
              :on-success="handSuccess"
              :limit="1"
              :file-list="fileList"
            >
              <div slot="tip" class="el-upload__tip">暂无文件</div>
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-row>
        </el-form-item>

        <!-- 核心文件。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。-->
        <el-card shadow="never">
          <el-form-item label="核心文件" :rules="rules" :required="true">
            <el-input v-show="false" v-model="ruleForm.uploadFile" />
            (待填信息）
          </el-form-item>

          <div>
            <el-divider></el-divider>
            <el-form-item label="文件1" :rules="rules" :required="true">
              <el-row>
          
              <el-col :span="10">
              <el-table
                  ref="multipleTable"
                  v-loading="loading"
                  element-loading-text="拼命加载中"
                  :show-header="false"
                  :data="tableData3"
                  border
                  class="table"
                  header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange"
                >

                  <el-table-column prop="orgName" label="文件名" />

                  <el-table-column label="操作" width="180" align="center" fixed="right">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        icon="el-icon-edit"
                        @click="seeFile(scope.$index, scope.row)"
                      >查看</el-button>
                      <el-button
                        type="text"
                        icon="el-icon-delete"
                        class="red"
                        @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="3"><div class="grid-content" >
                  <el-upload
                      class="upload-demo"
                      :action="BASE_API + '/soft/upload/' + softId"
                      :on-preview="handlePreview"
                      :before-remove="beforeRemove"
                      :on-remove="handleRemove"
                      :on-success="handSuccess"
                      :limit="1"
                      :file-list="fileList"
                    >
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                    </el-upload>
                </div></el-col>
              <el-col :span="11">
              <el-button-group>
                <el-button>按钮1</el-button>
                <el-button>按钮2</el-button>
                <el-button>按钮3</el-button>
                <el-button>按钮4</el-button>
              </el-button-group>
              </el-col>
              
              </el-row>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="文件2" >
              <el-row>
                <el-col :span="2">
                  <el-form-item>
                    <el-upload
                      class="upload-demo"
                      :action="BASE_API + '/soft/upload/' + softId"
                      :on-preview="handlePreview"
                      :before-remove="beforeRemove"
                      :on-remove="handleRemove"
                      :on-success="handSuccess"
                      :limit="1"
                      :file-list="fileList"
                    >
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                    </el-upload>
                  </el-form-item>
              </el-col>
                  <el-button-group>
                    <el-button>按钮1</el-button>
                    <el-button>按钮2</el-button>
                    <el-button>按钮3</el-button>
                    <el-button>按钮4</el-button>
                  </el-button-group>
              </el-row>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="文件3">
              <el-row>
                <el-col :span="2">
                  <el-form-item>
                    <el-upload
                      class="upload-demo"
                      :action="BASE_API + '/soft/upload/' + softId"
                      :on-preview="handlePreview"
                      :before-remove="beforeRemove"
                      :on-remove="handleRemove"
                      :on-success="handSuccess"
                      :limit="1"
                      :file-list="fileList"
                    >
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                    </el-upload>
                  </el-form-item>
              </el-col>
                  <el-button-group>
                    <el-button>按钮1</el-button>
                    <el-button>按钮2</el-button>
                    <el-button>按钮3</el-button>
                    <el-button>按钮4</el-button>
                  </el-button-group>
              </el-row>
            </el-form-item>
          </div>
        </el-card>
        <!-- 核心文件。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。-->

        <el-form-item label="配置文件">
          <el-form-item> (待填信息） </el-form-item>

          <el-row>
            <el-col :span="2">
              <el-form-item>
                <el-upload
                  class="upload-demo"
                  :action="BASE_API + '/soft/upload/' + softId"
                  :on-preview="handlePreview"
                  :before-remove="beforeRemove"
                  :on-remove="handleRemove"
                  :on-success="handSuccess"
                  :limit="1"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-form-item>
              <el-button>按钮1</el-button>
              <el-button>按钮2</el-button>
              <el-button>按钮3</el-button>
              <el-button>按钮4</el-button>
            </el-form-item>
          </el-row>
        </el-form-item>
      </el-card>

      <el-divider />
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="next('softInfo')"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import soft from "@/api/soft/soft-info";
import PasswordStrength from "@/views/soft/password/PasswordStrength";

export default {
  components: {
    PasswordStrength,
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      tableData: [{}],
      saveBtnDisabled: false, // 保存按钮是否禁用
      softInfo: {
        softName: "",
        softDesc: "",
        userName: "",
        phoneNum: "",
      },
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
        uploadFile: "",
      },
      rules: {
        softName: [
          { required: true, message: "请输入软件名称", trigger: "blur" },
        ],
        softDesc: [
          { required: true, message: "请输入软件描述", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入软件拥有者", trigger: "blur" },
        ],
        phoneNum: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        pass: [
          { validator: validatePass, trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" },
          { required: true, trigger: "blur" },
        ],
        uploadFile: [{ require: true, trigger: "blur" }],
      },
    };
  },
  created() {
    console.log("info created");
    // 获取路由id值
    if (this.$route.params && this.$route.params.id) {
      this.softId = this.$route.params.id;
      // 调用根据id查询课程的方法
      this.getSoftInfo();
    }
  },
  methods: {
    // 根据软件信息id查询
    getSoftInfo() {
      soft.getSoft(this.softId).then((response) => {
        this.softInfo = response.data.softInfo;
      });
    },
    // 添加软件信息
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
    next(formName) {
      console.log("next");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断添加还是修改
          if (!this.softId) {
            // 添加
            this.addSoftInfo();
          } else {
            // 修改
            this.updateSoftInfo();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
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
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
