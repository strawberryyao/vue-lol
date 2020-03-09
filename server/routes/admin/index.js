const express = require('express')
// const req.Model = require('../../models/req.Model')
module.exports = app => {
  // const req.Model = require('../../models/req.Model')
  const router = express.Router({
    mergeParams:true
  })
  
  router.post('/', async(req,res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.put('/:id', async(req,res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })

  router.delete('/:id', async(req,res) => {
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
      success:true
    })
  })

  router.get('/', async(req,res) => {
    const queryOptions = {}
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    // populate 查询并返回 parent关联到的对象 {_id:parent, name: 'news'}
    const itmes = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(itmes)
  })

  router.get('/:id', async(req,res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 通过mergeParams将 resource合并到router中
  app.use('/admin/api/rest/:resource',(req,res,next) => {
      //inflection.classify categories => req.Model
      const modelName = require('inflection').classify(req.params.resource)
      req.Model = require(`../../models/${modelName}`)
      next()
    }, router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload', upload.single('file'), async(req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })  
    
  // router.post('/', async (req,res) => {
  //   const model = await req.Model.create(req.body)
  //   res.send(model)
  // })

  // router.delete('/:id', async (req,res) => {
  //   await req.Model.findByIdAndDelete(req.params.id,req.body)
  //   res.send({
  //     success: true
  //   })
  // })

  // router.put('/:id', async (req,res) => {
  //   const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
  //   res.send(model)
  // })

  // router.get('/', async (req,res) => {
  //   const queryOptions = {}
  //   console.log('/', req.Model.modelName)
  //   if(req.Model.modelName === 'req.Model') {
  //     queryOptions.populate = 'parent'
  //   }
  //   const items = await req.Model.find().setOptions(queryOptions).limit(10)
  //   res.send(items)
  // })

  // router.get('/:id', async (req,res) => {
  //   console.log(req.params)
  //   const item = await req.Model.findById(req.params.id)
  //   res.send(item)
  // })


  // app.use('/admin/api/rest/:resource', (req,res,next) => {
  //   //inflection.classify categories => req.Model
  //   const modelName = require('inflection').classify(req.params.resource)
  //   req.Model = require(`../../models/${modelName}`)
  //   console.log(req.params.resource)
  //   next()
  // }, router)

  // const multer  = require('multer')
  // const upload = multer({dest:__dirname + '/../../uploads'})
  // app.use('/admin/api/upload', upload.single('file'), (req,res) => {
  //   const file = req.file
  //   file.url = `http://localhost:3000/uploads/${file.filename}`
  //   res.send(file)
  // })
}