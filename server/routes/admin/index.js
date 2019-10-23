module.exports = app => {
  const express = require('express')
  
  const router = express.Router()
  const Category = require('../../models/Category')
  router.post('/categories', async (req,res) => {
    console.log('categories', req.body)
    const model = await Category.create(req.body)
    res.send(model)
  })

  router.get('/categories', async (req,res) => {
    const items = await Category.find().limit(10)
    res.send(items)
  })

  router.delete('/categories/:id', async (req,res) => {
    console.log(req)
    await Category.findByIdAndDelete(req.params._id)
    res.send({
      success: true
    })
  })
  app.use('/admin/api', router)
}