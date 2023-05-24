// 导入express模块;
const express = require('express')
// 创建express的服务器实例;
const app = express()
// 导入数据库模块
const db = require('./db')

// 托管静态资源
app.use('/', express.static('./static'))

// 解决跨域问题
const cors = require('cors')
app.use(cors())
// 配置解析表单
app.use(express.urlencoded({ extended: false }))
// 使用 cookie
const cookieParser = require('cookie-parser')
app.use(cookieParser('itheima'))

// 封装 res.cc()
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 路由模块
// 登录
app.post('/login', (req, res) => {
  let info = req.body
  if (!info.username && !info.password) return res.cc('请输入用户名和密码!')
  if (info.time === undefined) return res.cc('请设置cookie有效时间!')
  let reg1 = /^[\u4e00-\u9fa5]{2,6}$/
  if (!reg1.test(info.username)) return res.cc('请输入合法的用户名!')
  let reg2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,10}$/
  if (!reg2.test(info.password)) return res.cc('请输入合法的密码!')
  const sql1 = 'select * from users where username=?'
  db.query(sql1, [info.username], (err, result) => {
    if (err) return res.cc(err)
    if (result.length === 0) return res.cc('不存在该用户!')
    if (info.password !== result[0].password) return res.cc('密码错误!')
    // 设置 cookie
    res.cookie('username', result[0].username, {
      maxAge: info.time,
      signed: true, //加密
      path: '/',
    })
    res.cc('登录成功!', 0)
  })
})
// 注册
app.post('/register', (req, res) => {
  let info = req.body
  const sql1 = 'select * from users where username=?'
  db.query(sql1, [info.username], (err, result) => {
    if (err) return res.cc(err)
    if (result.length) return res.cc('该用户名已存在!')
    const sql2 =
      'insert into users (username, password, email, qq) values (?, ?, ?, ?)'
    db.query(
      sql2,
      [info.username, info.password, info.email, info.qq],
      (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('注册失败,请稍后再试!')
        res.cc('注册成功!', 0)
      }
    )
  })
})
// 获取信息,便且判断cookie
app.get('/get_cookie', (req, res) => {
  let username = req.signedCookies.username
  if (username === undefined) return res.cc('请先登录!', 2)
  const sql1 = `select id,username,email,qq from users where username = '${username}'`
  db.query(sql1, (err, result) => {
    if (err) return res.cc(err)
    if (result.length === 0) return res.cc('cookie 不合法, 请先登录', 2)
    res.send({
      data: result[0],
      status: 0,
    })
  })
})
// 退出登录
app.get('/loginout', (req, res) => {
  res.cookie('username', null, {
    maxAge: 0,
    signed: true, //加密
    path: '/',
  })
  res.cc('退出登录成功!', 0)
})

// 配置错误中间件
app.use((req, res, next, err) => {
  res.send(err)
})

// 调用app.listen方法，在81端口启动web服务器;
app.listen(81, () => {
  console.log('Express server running at http:127.0.0.1:81')
})
