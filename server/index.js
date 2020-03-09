const express = require("express")

const app = express()

// 跨域
app.use(require('cors')())
// 
app.use(express.json())
// app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000/admin/api，连接数据库成功')
})