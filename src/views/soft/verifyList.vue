<template>
  <div class="app-container">
    <h2 style="text-align: center;">信息列表</h2>
    <!-- 表格 -->
    <el-table v-loadong="loading" :data="AppList" stripe style="width: 100%">
      <el-table-column prop="softName" label="编号" width="180" />
      <el-table-column prop="softDesc" label="软件描述" width="180" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="phoneNum" label="电话" width="180" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button v-if="status=='Pending' || status=='Reject'" type="text" size="small" @click="passApp(scope.row.id)">pass</el-button>
          <el-button v-if="status=='Pending' || status=='Handled'" type="text" size="small" @click="rejectApp(scope.row.id)">reject</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import soft from '@/api/soft/soft-info'

export default {
  name: 'MyApp',
  inject: ['reload'],
  data() {
    return {
      status: '',
      /* HandledSoft: [
        {
          'softName': 'testfile01',
          'softDesc': '测试01',
          'userName': 'wyp',
          'phoneNum': '17746611780'
        },
        {
          'softName': 'testfile03',
          'softDesc': '测试03',
          'userName': 'wyp',
          'phoneNum': '17746611780'
        }
      ],*/
      AppList: [],
      checkResult: '',
      loading: 'false'
    }
  },
  beforeMount() {
    this.loading = true
    this.status = this.$route.query.status
    this.fetchAppsInfo()
    this.loading = false
  },
  methods: {
    fetchAppsInfo() {
      if (this.status === 'Pending') {
        soft.fetchGetAllPending().then(res => {
          this.AppList = res.data.PendingSoft
        })
      } else if (this.status === 'Reject') {
        soft.fetchGetAllReject().then(res => {
          this.AppList = res.data.RejectSoft
        })
      } else if (this.status === 'Handled') {
        soft.fetchGetAllHandled().then(res => {
          this.AppList = res.data.HandledSoft
        })
      }
    },
    passApp(id) {
      this.loading = true
      soft.fetchExamineSoftSuccess(id).then(res => {
        this.checkResult = res.msg
        this.$message({
          message: this.checkResult,
          type: 'success'
        })
      })
      this.fetchAppsInfo()
      this.reload()
      this.loading = false
    },
    rejectApp(id) {
      this.loading = true
      soft.fetchExamineSoftFail(id).then(res => {
        this.checkResult = res.msg
        this.$message({
          message: this.checkResult,
          type: 'success'
        })
      })
      this.fetchAppsInfo()
      this.reload()
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
