const express = require('express')
const app = express()
const Joi = require('joi')

// 解决跨域
const cors = require('cors')
app.use(cors())

// 配置解析表单
app.use(express.urlencoded({ extended: false }))

// 挂载res.cc()
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

const toDoListRouter = require('./router/todolist')
app.use('/api', toDoListRouter)

// 错误中间件
app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) return res.cc(err)
})

app.listen(80, () => {
  console.log('express server running at http://localhost')
})
