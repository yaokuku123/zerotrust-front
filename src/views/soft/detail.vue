<template>
  <div class="app-container">
    {{ this.txInfoVo }}
  </div>
</template>
<script>
import soft from '@/api/soft/soft-info'

export default {
  data() {
    return {
      id: '',
      txInfoVo: []
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getSoftInfoById()
  },
  methods: {
    getSoftInfoById() {
      soft.fetchSoftInfoById(this.id).then(response => { // 请求成功
        // response接口返回的数据
        this.txInfoVo = response.data.txInfoVo
      })
    }
  }
}
</script>
