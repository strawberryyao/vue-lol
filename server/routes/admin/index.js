module.exports = app => {
  const express = require('express')
  
  const router = express.Router()
  const Category = require('../../models/Category')
  console.log(11111111111)
  router.post('/categories', async (req,res) => {
    console.log('categories', req.body)
    const model = await Category.create(req.body)
    res.send(model)
  })
  app.use('/admin/api', router)
}