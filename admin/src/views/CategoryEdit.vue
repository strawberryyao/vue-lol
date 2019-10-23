<template>
  <div class="category">
    <h1>{{id?'编辑': '新建'}}分类</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="分类名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {},
      }
    },
    methods: {
      async save () {
        console.log(this.model)
        let res = await this.$http.post('categories', this.model)
        console.log(res)
        this.$router.push('/categories/list')
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>