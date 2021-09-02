<template>

  <div>

    <div>
      
      软件名称<el-input v-model="softName" @change="getSoftResource" />
      安全等级<el-input v-model="userSafeLevel" @change="getSoftResource" />
    </div>
    <div>
      <el-checkbox-group v-model="verifyResult.fieldInfoWithCleanMethodList" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="field in softResource" :key="field" :label="field" @change="handleCheckVaule(field)">
          <el-descriptions title="字段信息">
            <el-descriptions-item label="域">{{ field.fieldName }}</el-descriptions-item>
            <el-descriptions-item label="安全等级">{{ field.safeLevel }}</el-descriptions-item>
            <el-descriptions-item v-if="field.safeLevel>userSafeLevel" label="清理方法">
              {{ field.cleanMethod }}
              <el-radio-group v-model="field.cleanMethod" @change="handleMethodChange(field.cleanMethod, value)">
                <el-radio value="hashClean" label="hashClean">hashClean</el-radio>
                <el-radio value="saltClean" label="saltClean">saltClean</el-radio>
              </el-radio-group>
              <!--              <el-radio-group value="saltClean" v-model="field.cleanMethod" @change="handleMethodChange(field.cleanMethod, label)">
                <el-radio label="saltClean">saltClean</el-radio>
              </el-radio-group>-->
            </el-descriptions-item>
          </el-descriptions>
        </el-checkbox>
      </el-checkbox-group>
      <el-button type="primary" @click="createData()">确定</el-button>
    </div>
  </div>

</template>

<script>
import dataClean from '@/api/soft/data-clean'

export default {
  name: 'View',
  data() {
    return {
      softName: '',
      radio: 1,
      softResource: {},
      userSafeLevel: 9,
      cleanMethod: 'saltClean',
      checked: 'true',
      verifyResult: {
        softName: '',
        tableName: '',
        userSafeLevel: 1,
        fieldInfoWithCleanMethodList: []
      },
      sendResult: ''
    }
  },
  mounted() {
    // this.getSoftResource()
  },
  methods: {
    getSoftResource() {
      dataClean.getSoftResource(this.softName).then(res => {
        this.softResource = res.data.fieldInfos
        console.log(this.softResource)
        this.verifyResult.fieldInfoWithCleanMethodList = this.search(this.softResource, this.userSafeLevel)
        this.verifyResult.softName = this.softName
        this.verifyResult.tableName = res.data.tableName
        this.verifyResult.userSafeLevel = this.userSafeLevel
      })
    },
    send() {
      dataClean.sendVerifyResult(this.verifyResult).then(res => {
        this.sendResult = res.data
      })
    },
    addMethodKey(list) {

    },
    search(List, keywords) {
      return List.filter(item => {
        if (item.safeLevel <= keywords) { return item }
      })
    },
    createData() {
      dataClean.sendVerifyResult(this.verifyResult)
      this.$message({
            type: "success",
            message: "数据等级发送成功",
          });
      // 跳转到第二步，response接口返回的数据
      this.$router.push({ path: '/data-clean/review'})
    },
    handleCheckedCitiesChange(value) {
      // console.log(value.fieldName)
      this.checkedValue = value
    },
    handleCheckVaule(value) {
      // console.log(value)
      // console.log(value.safeLevel > this.userSafeLevel)
      if (value.safeLevel > this.userSafeLevel) {
        this.$set(value, 'cleanMethod', 'hashClean')
        console.log(this.verifyResult.fieldInfoWithCleanMethodList)
      }
    },
    handleMethodChange(value, label) {
      // console.log(label)
      value = label
      // console.log(value)
    }
  }
}
</script>

<style scoped>

</style>
