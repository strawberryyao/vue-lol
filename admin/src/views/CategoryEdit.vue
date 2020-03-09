<template>
  <div class="category">
    <h1>{{id?'编辑': '新建'}}分类</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="上级分类名称">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
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
        parents: []
      }
    },
    created () {
      this.fetchParents()
      this.id && this.fetch()
    },
    methods: {
      async save () {
        let res
        if (this.id) {
          // res = await this.$http.put(`rest/categories/${this.id}`, this.model)
          res = await this.$http.put(`categories/${this.id}`, this.model)
        } else {
          res = await this.$http.post('categories', this.model)
          // res = await this.$http.post('rest/categories', this.model)
        }
        this.$router.push('/categories/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch () {
        // let res = await this.$http.get(`rest/categories/${this.id}`)
        let res = await this.$http.get(`categories/${this.id}`)
        this.model = res.data
      },
      async fetchParents () {
        // const res = await this.$http.get(`rest/categories`)
        const res = await this.$http.get(`categories`)
        this.parents = res.data
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>