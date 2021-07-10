<template>
  <div class="app-container">
    <h2 style="text-align: center;">软件信息列表</h2>

    <!-- 表格 -->
    <el-table :data="softList" stripe style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="softName" label="软件名称" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column prop="status" label="状态" width="180" />
      <el-table-column prop="txId" label="软件交易号" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
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
      softList: [{
        id: '1',
        softName: 'testFile01',
        createTime: '2016-05-02',
        status: 0,
        txId: '121232112'
      }, {
        id: '2',
        softName: 'testFile02',
        createTime: '2016-05-03',
        status: 1,
        txId: '121232112'
      }, {
        id: '3',
        softName: 'testFile03',
        createTime: '2016-05-04',
        status: 2,
        txId: '121232112'
      }, {
        id: '4',
        softName: 'testFile04',
        createTime: '2016-05-05',
        status: 3,
        txId: '121232112'
      }]
    }
  },
  created() {
    console.log('info created')
    this.getSoft()
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    getSoft() {
      soft.getSoftList().then(response => { // 请求成功
        // response接口返回的数据
        this.softList = response.data.softInfo
      })
    }
  }
}
</script>
