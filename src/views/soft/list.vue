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
    <el-button
            type="primary"
            size="medium"
            @click="exportExcel()"
    >导出Excel</el-button>
    <!-- 表格 -->
    <el-table :data="softList" stripe style="width: 100%">
      <el-table-column label="编号" type="index" width="80" /> 
      <el-table-column prop="proName" label="项目名称" width="300" />
      <el-table-column prop="comName" label="单位名称" width="300" />
      <el-table-column prop="verificationCode" label="核验码" width="380" />
      <el-table-column prop="pid" label="证书编号" width="480" />
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleClick(scope.row.pid)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import soft from '@/api/soft/soft-info'
import softVerify from '@/api/soft/soft-verify'

export default {
  data() {
    return {
      baseCertDownloadUrl: process.env.VUE_APP_BASE_API,
      softList: [
        {
          sid:'',
          softRemotePath:"",
          zipName:"",
          proName:'',
          zipPassword:'',
          uploadPassword:'',
          pid: '1',
          status: 0,
          txId: '121232112'
        },
        {
          sid:'',
          softRemotePath:"",
          zipName:"",
          proName:'',
          zipPassword:'',
          uploadPassword:'',
          pid: '1',
          status: 0,
          txId: '121232112'
        },
        {
          sid:'',
          softRemotePath:"",
          zipName:"",
          proName:'',
          zipPassword:'',
          uploadPassword:'',
          pid: '1',
          status: 0,
          txId: '121232112'
        },
        {
          sid:'',
          softRemotePath:"",
          zipName:"",
          proName:'',
          zipPassword:'',
          uploadPassword:'',
          pid: '1',
          status: 0,
          txId: '121232112'
        }
      ]
    }
  },
  created() {
    console.log('info created')
    this.getListData()
  },
  methods: {
    getListData(){
      softVerify.getfileList().then(res => {
        console.log(res)
        this.softList = res.data.softInfo
      })
    },
    handleClick(id) {
      console.log(id)
      this.$router.push({ path: '/soft/back/' + id, query: { id: id }})
    },
    exportExcel(){
      window.open(
        this.baseCertDownloadUrl + "/excel" 
      );
    }
    // getSoft() {
    //   soft.getSoftList().then((response) => {
    //     // 请求成功
    //     // response接口返回的数据
    //     this.softList = response.data.softInfo
    //   })
    // }
  }
}
</script>
