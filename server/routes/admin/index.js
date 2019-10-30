module.exports = app => {
  const express = require('express')
  
  const router = express.Router()
  // const req.Model = require('../../models/req.Model')
  
  router.post('/', async (req,res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.delete('/:id', async (req,res) => {
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
      success: true
    })
  })

  router.put('/:id', async (req,res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })

  router.get('/', async (req,res) => {
    const queryOptions = {}
    console.log('/', req.Model.modelName)
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  router.get('/:id', async (req,res) => {
    console.log(req.params)
    const item = await req.Model.findById(req.params.id)
    res.send(item)
  })


  app.use('/admin/api/rest/:resource', (req,res,next) => {
    //inflection.classify categories => Category
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    console.log(req.params.resource)
    next()
  }, router)

  const multer  = require('multer')
  const upload = multer({dest:__dirname + '/../../uploads'})
  app.use('/admin/api/upload', upload.single('file'), (req,res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}