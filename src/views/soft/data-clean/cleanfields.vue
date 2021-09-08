<template>
  <div class="app-container">
    <h2 style="text-align: center">软件信息列表</h2>
    <el-input v-model="softName" placeholder="请输入文件名" /><el-button
      @click="getSoftField(softName)"
      >查询</el-button
    >

    <!-- 表格 -->
    <p>安全等级要求：{{ userSafeLevel }}</p>
    <p>表名：{{ tableName }}</p>
    <el-table :data="fieldInfoWithCleanMethodList" stripe style="width: 100%">
      <el-table-column prop="fieldName" label="字段名称" width="180" />
      <el-table-column prop="safeLevel" label="清洗等级" width="180" />
      <el-table-column prop="cleanMethod" label="降级方法" width="180" />
    </el-table>
    <el-button @click="sendVerifyResult">确认通过</el-button
    ><el-button @click="sendVerifyResult2">结果驳回</el-button>
  </div>
</template>
<script>
import soft from "@/api/soft/soft-info";

export default {
  data() {
    return {
      verifyResult: {
        result: false,
        tableName: "",
        fieldInfoWithCleanMethodList: [],
        softName: "",
      },
      fieldInfoWithCleanMethodList: [],
      userSafeLevel: "",
      tableName: "",
      cleanList: [],
      softName: "",
    };
  },
  created() {
    this.cleandata();
  },
  methods: {
    cleandata() {
      let listmethod = [];
      for (var i = 0; i < this.fieldInfoWithCleanMethodList.length; i++) {
        if (this.fieldInfoWithCleanMethodList[i].cleanMethod != null) {
          console.log("未匹配到notclean");
          listmethod.push(this.fieldInfoWithCleanMethodList[i]);
          console.log(listmethod);
        }
      }
      this.fieldInfoWithCleanMethodList = listmethod;
    },
    getSoftField(softName) {
      soft.getFiledMessage(softName).then((response) => {
        // 请求成功
        // response接口返回的数据
        console.log(response.data);
        this.fieldInfoWithCleanMethodList =
          response.data.fieldInfoWithCleanMethodList;
        this.userSafeLevel = response.data.userSafeLevel;
        this.tableName = response.data.tableName;
        this.cleandata();

        this.verifyResult.tableName = response.data.tableName;
        this.verifyResult.fieldInfoWithCleanMethodList =
          response.data.fieldInfoWithCleanMethodList;
      });
    },
    sendVerifyResult() {
      this.verifyResult.softName = this.softName;
      this.verifyResult.result = true;
      console.log("这是传输对象" + this.verifyResult);
      soft.sendVerifyResult(this.verifyResult).then((response) => {
        this.$message({
          type: "success",
          message: "软件申请发布成功，等待审核结果!",
        });
        console.log(response);
      });
    },
    sendVerifyResult2() {
      this.verifyResult.softName = this.softName;
      this.verifyResult.result = false;
      soft.sendVerifyResult(this.verifyResult).then((response) => {
        this.$message({
          type: "error",
          message: "软件申请发布驳回，等待审核结果!",
        });
      });
    },
  },
};
</script>