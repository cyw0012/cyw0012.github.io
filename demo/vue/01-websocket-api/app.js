const ws = require('nodejs-websocket')
const moment = require('moment')
const db = require('./db')

// 保存所有连接、用户
let conns = {}
let users = []

// 信息发送
function broadcast(obj) {
  // 广播给所有用户
  server.connections.forEach(function (conn) {
    conn.sendText(JSON.stringify(obj))
  })
}

// 创建 websocket实例
const server = ws.createServer(function (conn) {
  // 监听客户端发送过来的消息
  conn.on('text', function (data) {
    const obj = JSON.parse(data)
    switch (obj.type) {
      // 注册用户
      case 1:
        let uid = 'web_im_' + moment().valueOf()
        conns[uid] = conn
        const sql1 = 'insert into users_tb (uid, uname, introduce, time) values (?, ?, ?, ?)'
        break;
    }
  })
  
  conn.on('close', function (e) {
    console.log(e, '服务端连接关闭')
  })
  conn.on('error', function (e) {
    console.log(e, '服务端异常')
  })
}).listen(8888)