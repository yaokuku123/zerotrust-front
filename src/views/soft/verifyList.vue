<template>
  <div class="app-container">
    <h2 style="text-align: center;">信息列表</h2>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="AppList"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="softName" label="编号" width="120" />
      <el-table-column prop="softDesc" label="软件描述" width="120" />
      <el-table-column prop="softFileStoreId" label="软件存储ID" width="120" />
      <el-table-column prop="userName" label="用户名" width="120" />
      <el-table-column prop="phoneNum" label="电话" width="140" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="txId" label="交易ID" width="180" />
      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <el-col slot-scope="scope">
          <el-button v-if="status=='Pending' || status=='Reject'" type="sucess" size="small" @click="passApp(scope.row.id)">pass</el-button>
          <el-button v-if="status=='Pending' || status=='Handled'" type="danger" size="small" @click="rejectApp(scope.row.id)">reject</el-button>
        </el-col>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import soft from '@/api/soft/soft-info'

export default {
  name: 'MyApp',
  inject: ['reload'],
  filters: {
    statusFilter(status) {
      const statusMap = {
        available: 'success',
        offline: 'info',
        checking: ''
      }
      return statusMap[status]
    }
  },
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
    this.status = this.$route.query.status
    this.fetchAppsInfo()
  },
  methods: {
    fetchAppsInfo() {
      this.loading = true
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
      this.loading = false
    },
    passApp(id) {
      this.loading = true
      soft.fetchExamineSoftSuccess(id).then(res => {
        this.checkResult = res.msg
        this.$message({
          message: this.checkResult,
          type: 'success'
        })
        this.fetchAppsInfo()
      })
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
        this.fetchAppsInfo()
      })
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
