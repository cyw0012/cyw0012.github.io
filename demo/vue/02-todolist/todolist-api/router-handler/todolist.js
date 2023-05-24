const db = require('../db')

// 获取信息
exports.getlist = (req, res) => {
  const sql1 = 'SELECT * FROM todolist'
  db.query(sql1, (err, result) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      data: result,
    })
  })
}

// 增加信息
exports.addlist = (req, res) => {
  const userinfo = req.body.userinfo.trim()
  const time = req.body.time
  if (userinfo === '') return res.cc('信息不能为空')
  const sql2 = 'insert into todolist (userinfo, time) values (?,?)'
  db.query(sql2, [userinfo, time], (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows != 1) return res.cc('添加失败，请稍后再试！')
    res.cc('数据加入成功', 0)
  })
}

// 更新信息
exports.updatelist = (req, res) => {
  const info = req.body
  const sql3 = 'select * from todolist where id =?'
  db.query(sql3, [info.id], (err, result) => {
    if (err) return res.cc(err)
    if (result.length == 0) return res.cc('没有该数据')

    const sql4 = 'update todolist set state=? where id =?'
    db.query(sql4, [info.state, info.id], (err, result) => {
      if (err) return res.cc(err)
      res.cc('更新成功', 0)
    })
  })
}

// 删除信息
exports.deletelist = (req, res) => {
  const info = req.params
  const sql5 = 'select * from todolist where id =?'
  db.query(sql5, [info.id], (err, result) => {
    if (err) return res.cc(err)
    if (result.length == 0) return res.cc('没有该数据')

    const sql6 = 'delete from todolist where id =?'
    db.query(sql6, [info.id], (err, result) => {
      if (err) return res.cc(err)
      res.cc('删除成功', 0)
    })
  })
}

// 删除已完成的
exports.deletok = (req, res) => {
  const sql1 = 'delete from todolist where state=0'
  db.query(sql1, (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows === 0) return res.cc('清除失败！')

    res.cc('清除成功！', 0)
  })
}