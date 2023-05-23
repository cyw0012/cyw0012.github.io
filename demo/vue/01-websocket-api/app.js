const ws = require('nodejs-websocket')
const moment = require('moment')
let users = []
let groups = []
let conns = {}

function broadcast(obj) {
  // 单聊
  if (obj.brige && obj.brige.length) {
    obj.brige.forEach((item) => {
      conns[item].sendText(JSON.stringify(obj))
    })
    return
  }
  // 群聊
  if (obj.groupId) {
    // 找到对应群
    currentGroup = groups.filter((item) => {
      return item.id === obj.groupId
    })[0]
    // 发送消息给群用户
    currentGroup.users.forEach((item) => {
      conns[item.uid].sendText(JSON.stringify(obj))
    })
    return
  }
  server.connections.forEach(function (conn) {
    conn.sendText(JSON.stringify(obj))
  })
}
const server = ws
  .createServer(function (conn) {
    conn.on('text', function (data) {
      const obj = JSON.parse(data)
      switch (obj.type) {
        case 1:
          {
            // 将所有uid对应的连接都保存到一个对象里
            conns[obj.uid] = conn
            
            // 不存在uid对应的用户（不是本人），才会添加，避免重复
            const isSelf = users.some((m) => m.uid === obj.uid)
            console.log(isSelf, data.uid, users, '所有用户')
            if (!isSelf) {
              users.push({
                nickname: obj.nickname,
                uid: obj.uid,
              })
            }
            broadcast({
              type: 1,
              nickname: obj.nickname,
              uid: obj.uid,
              msg: `${obj.nickname}进入了聊天室`,
              date: moment().format('YYYY-MM-DD HH:mm:ss'),
              users,
              brige: obj.brige,
              groups,
            })
          }
          break
        case 2:
          broadcast({
            type: 2,
            nickname: obj.nickname,
            uid: obj.uid,
            msg: obj.msg,
            users,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            brige: obj.brige,
            status: 1, // 表示未读
            groups,
            groupId: obj.groupId,
          })
          break
        case 10:
          groups.push({
            id: moment().valueOf(),
            name: obj.name,
            users: [
              {
                nickname: obj.nickname,
                uid: obj.uid,
              },
            ],
          })
          broadcast({
            type: 1,
            nickname: obj.nickname,
            uid: obj.uid,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            msg: `${obj.nickname}创建了${obj.name}群`,
            brige: obj.brige,
            users,
            groups,
          })
          break
        case 20:
          // 找到当前群，往当前群的userspush进去登录人信息
          currentGroup = groups.filter((item) => {
            return item.id === obj.groupId
          })[0]
          currentGroup.users.push({
            uid: obj.uid,
            nickname: obj.nickname,
          })
          broadcast({
            type: 1,
            nickname: obj.nickname,
            uid: obj.uid,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            msg: `${obj.nickname}加入了${obj.groupName}群`,
            brige: obj.brige,
            users,
            groups,
            groupId: obj.groupId, // 有是群聊，没有是单聊
          })
          break
      }
    })

    conn.on('close', function (e) {
      console.log(e, '服务端连接关闭')
    })

    conn.on('error', function (e) {
      console.log(e, '服务端异常')
    })
  })
  .listen(8888)
console.log('服务端已开启')
