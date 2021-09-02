<template>
  <div class="app-container">
    <h2 style="text-align: center">数据清理列表</h2>
    <el-form :model="softInfo" ref="info">
      <el-form-item label="软件名称">
        <el-input v-model="softInfo.fieldName" />
      </el-form-item>
      <el-card v-for="(item, idx) in datas" :key="idx">
        <el-form-item :label="item.fieldName">
          <el-input v-model="item.safeLevel" />
        </el-form-item>
      </el-card>
      <el-button @click="transferData">确认</el-button>
    </el-form>
  </div>
</template>
<script>
import soft from "@/api/soft/soft-info";

export default {
  data() {
    return {
      softInfo: {
        fieldName: "",
        tableName: "taiji_cloud",
      },
      datas: [
        {
          fieldName: "",
          safeLevel: "",
        },
      ],
      info: [
        // "id1",
        // "gov_id",
        // "gov_name",
        // "com_id",
        // "com_name",
        // "monitor_time",
        // "service_id",
        // "service_name",
        // "cloud_plat",
        // "net_type",
        // "virtual_num",
        // "use_status",
        // "cloud_id",
        // "virtual_name",
        // "sys_version",
        // "run_status",
        // "ip",
        // "create_time",
      ],
    };
  },

  created() {
    this.getSoftField();
  },

  methods: {
    getSoftField() {
      soft.getSoftField(this.softInfo.tableName).then((response) => {
        // 请求成功
        // response接口返回的数据
        this.info = response.data.info;
        for (var i = 0; i < this.info.length; i++) {
          this.datas.push({ fieldName: this.info[i], safeLevel: "3" });
        }
        this.$delete(this.datas, 0);
        console.log("zheshi" + this.info);
      });
    },
    transferData() {
      soft
        .transferField(
          this.datas,
          this.softInfo.fieldName,
          this.softInfo.tableName
        )
        .then((response) => {
          console.log(response);
          this.$message({
            type: "success",
            message: "数据等级发送成功",
          });
          // 跳转到第二步，response接口返回的数据
          this.$router.push({ path: '/data-clean/view'})
        });
    },
  },
};
</script>
