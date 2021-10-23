<template>
  <div class="app-container">
    <h2 style="text-align: center">浏览</h2>

    <el-steps
      :active="3"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="上传" />
      <el-step title="归档" />
      <el-step title="浏览" />
    </el-steps>
    <!-- 表格 -->
    <el-table :data="softList" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="softName" label="单位名称" width="280" />
      <el-table-column prop="status" label="项目名称" width="280" />
      <el-table-column prop="createTime" label="软件创建时间" width="480" />
      <el-table-column prop="txId" label="核验码" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleClick(scope.row.id)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import soft from '@/api/soft/soft-info'

export default {
  data() {
    return {
      softList: [
        {
          id: '1',
          softName: 'testFile01',
          createTime: '2016-05-02',
          status: 0,
          txId: '121232112'
        },
        {
          id: '2',
          softName: 'testFile02',
          createTime: '2016-05-03',
          status: 1,
          txId: '121232112'
        },
        {
          id: '3',
          softName: 'testFile03',
          createTime: '2016-05-04',
          status: 2,
          txId: '121232112'
        },
        {
          id: '4',
          softName: 'testFile04',
          createTime: '2016-05-05',
          status: 3,
          txId: '121232112'
        }
      ]
    }
  },
  created() {
    console.log('info created')
    this.getSoft()
  },
  methods: {
    handleClick(id) {
      console.log(id)
      this.$router.push({ path: '/soft/detail/' + id, query: { id: id }})
    },
    getSoft() {
      soft.getSoftList().then((response) => {
        // 请求成功
        // response接口返回的数据
        this.softList = response.data.softInfo
      })
    }
  }
}
</script>
