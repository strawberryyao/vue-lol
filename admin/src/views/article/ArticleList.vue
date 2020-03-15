<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="100">
          <template slot-scope="scope">
            <el-button type="text" 
                       size="small"
                       @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
            <el-button type="text" 
                       size="small"
                       @click="remove(scope.row)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: []
      }
    },
    created () {
      this.fetch();
    },
    methods: {
      async fetch () {
        const res = await this.$http.get('rest/articles')
        this.items = res.data
      },
      remove (row) {
         this.$confirm(`您确定要删除"${row.title}"这篇文章吗`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          console.log(row)
          await this.$http.delete(`rest/articles/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>