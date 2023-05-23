<template>
  <div class="home">
    <el-dialog :visible="showInfoDialog">
      <el-input
        type="text"
        v-model="nickname"
        placeholder="请输入你的昵称"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
    :visible="showGroupDialog"
    >
      <el-input type="text" v-model="groupName" placeholder="请输入群名称" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showGroupDialog = false">取 消</el-button>
        <el-button type="primary" @click="createGroup">确 定</el-button>
      </span>
    </el-dialog>

    <div class="web-im">
      <!-- 聊天列表 -->
      <div class="left">
        <p class="user" @click="showGroupDialog = true">新建群</p>
        <!-- 群聊列表 -->
        <div class="user" v-for="items in groups" :key="items.id" @click="triggerGroup(items)">
          <span> {{items.name}}</span>
          <span v-if="!isUserInGroup(items)" @click="addGroup(items.id, items.name)">+</span>
          <span class="msgtip" v-show="getGroupMsgNum(items)">{{getGroupMsgNum(items)}}</span>
        </div>
        <!-- 单聊列表 -->
        <div class="user" v-for="(itm, idex) in users" :key="idex" v-show="itm.uid !== uid" @click="triggerUser(itm)">
          <span>{{itm.nickname}}</span>
          <span class="msgtip" v-show="getMsgNum(itm)">{{getMsgNum(itm)}}</span>
          </div>
      </div>
      <!-- 消息 -->
      <div class="right">
        <div class="body im-record" id="im-record">
          <p>{{ title }}</p>
          <div class="ul">
            <!-- user为靠右展示样式，如果uid一致说明是本人 -->
            <div
              class="li"
              :class="{ user: item.uid == uid }"
              v-for="(item, index) in currentMessage"
              :key="index"
            >
              <template v-if="item.type === 1">
                <p class="join-tips">{{ item.msg }}</p>
              </template>
              <template v-else>
                <p class="message-date">
                  <span class="m-nickname">{{ item.nickname }}</span>
                  {{ item.date }}
                </p>
                <p class="message-box">{{ item.msg }}</p>
              </template>
            </div>
          </div>
        </div>
        <div class="im-footer">
          <el-input
            placeholder="请输入你想说的内容..."
            v-model="msg"
            class="im-footer_inp"
          />
          <el-button class="im-footer_btn" type="primary" @click="send"
            >发送</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment' // 需要下载moment。npm install moment --save
export default {
  data () {
    return {
      ws: '',
      showInfoDialog: false,
      nickname: '',
      uid: this.uid,
      messageList: [],
      users: [],
      msg: '', // 输入的消息内容
      title: '请选择聊天对象',
      brige: [],
      groups: [], // 所有群对应数组
      showGroupDialog: false, // 新建群模态框
      groupName: '', // 群名
      groupId: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      if (window.WebSocket) {
        let user = {}
        if (localStorage.getItem('WEB_IM_USER')) { user = JSON.parse(localStorage.getItem('WEB_IM_USER')) }
        this.nickname = user.nickname || ''
        this.uid = user.uid || ''

        // 没有当前人信息就弹窗去填写
        if (!this.uid) {
          this.showInfoDialog = true
        } else {
          this.contactSocket()
        }

        // 监听回车事件
        const vm = this
        document.onkeydown = function (event) {
          const e = event || window.event
          if (e && e.keyCode === 13) {
            console.log('触发enter')
            vm.send()
          }
        }
      } else {
        console.log('当前浏览器不支持WebSocket！')
      }
    },

    // 模态框确认事件
    sure () {
      this.showInfoDialog = false
      this.contactSocket()
    },

    // enter触发 或者 点击“发送”触发
    send () {
      if (!this.msg) return
      this.sendMessage(2, this.msg)
    },

    // 发送信息给客户端
    sendMessage (type, msg) {
      const data = {
        uid: this.uid,
        type,
        nickname: this.nickname,
        msg,
        // users: this.users,
        brige: this.brige,
        groups: this.groups,
        groupId: this.groupId
      }
      this.ws.send(JSON.stringify(data))
      this.msg = ''
    },

    // 创建群
    createGroup () {
      const data = {
        uid: this.uid,
        type: 10,
        nickname: this.nickname,
        users: this.users,
        name: this.groupName,
        brige: []
      }
      this.ws.send(JSON.stringify(data))
      this.showGroupDialog = false
      this.groupName = ''
    },

    // 加入群
    addGroup (id, groupname) {
      const data = {
        uid: this.uid,
        type: 20,
        nickname: this.nickname,
        brige: [],
        groupName: groupname,
        groupId: id
      }
      this.ws.send(JSON.stringify(data))
    },
    // 判断当前用户是否在群里
    isUserInGroup (items) {
      const isIn = items.users.some(item => { return item.uid === this.uid })
      return isIn
    },

    // 切换到单聊
    triggerUser (itm) {
      this.brige = [this.uid, itm.uid]
      this.title = `和${itm.nickname}聊天`
      this.groupId = ''
    },

    // 切换到群聊
    triggerGroup (items) {
      const isIn = items.users.some(item => { return item.uid === this.uid })
      if (!isIn) {
        this.$message.error('您还不是该群成员，不可发信息！')
        return
      }
      this.groupId = items.id
      this.brige = []
      this.title = `在${items.name}聊天`
    },

    // 获取消息未读数量，有user表示是单聊，没有表示群聊
    // 获取单聊消息未读数量
    getMsgNum (user) {
      // userid相同，确认是当前聊天对应人的消息数组
      return this.messageList.filter(m => {
        return m.brige.length && m.status === 1 && m.uid === user.uid
      }).length
    },

    // 获取群聊未读消息数
    getGroupMsgNum (users) {
      return this.messageList.filter(m => {
        return m.groupId === users.id && m.status === 1
      }).length
    },

    // 连接websocket
    contactSocket () {
      const that = this
      this.ws = new WebSocket('ws://127.0.0.1:8888')
      const ws = this.ws
      ws.onopen = function () {
        console.log('连接服务器成功')

        // 没有当前人信息的话，需要缓存下
        if (!that.uid) {
          that.uid = 'web_im_' + moment().valueOf()
          localStorage.setItem(
            'WEB_IM_USER',
            JSON.stringify({
              uid: that.uid,
              nickname: that.nickname
            })
          )
        }
        that.sendMessage(1)
      }
      ws.onmessage = function (e) {
        const obj = JSON.parse(e.data)
        that.messageList.push(obj)
        if (obj.users) that.users = obj.users
        if (obj.groups) that.groups = obj.groups
      }
      ws.onclose = function () {
        console.log('连接已关闭')
      }
    }
  },
  computed: {
    // 筛选当前brige一致的放到一个聊天数组里，区分单聊和群聊
    currentMessage () {
      const vm = this
      const data = this.messageList.filter(item => {
        // 如果有groupId，过滤展示出当前对应群
        if (this.groupId) {
          // return item.groups.filter(p => { return p.id === this.groupId })
          return item.groupId === vm.groupId
        } else if (this.brige.length) {
          return item.brige.sort().join('') === vm.brige.sort().join('')
        } else {
          return item.type === 1
        }
      })
      data.forEach((m) => {
        // 当前群聊，所有status设置为0
        m.status = 0
      })
      return data
    }
  }
}
</script>

<style scoped lang="less">
.web-im {
  display: flex;
}
.left {
  width: 200px;
  border: 1px solid #ccc;
  .user {
    width: 100%;
    height: 36px;
    padding-left: 10px;
    border-bottom: 1px solid #ccc;
    line-height: 36px;
    .msgtip {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: #46b0ff;
      margin-left: 5px;
      text-align: center;
      color: #fff;
      line-height: 20px;
      border-radius: 50%;
    }
  }
}
.right {
  position: relative;
  flex: 1;
  height: 600px;
  margin: 0 auto;
  .im-title {
    height: 30px;
    padding-left: 20px;
    border-bottom: 1px solid #ccc;
    line-height: 30px;
    font-size: 16px;
  }
  .im-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    .im-footer_inp {
      width: 80%;
    }
    .im-footer_btn {
      width: 20%;
    }
  }

  .im-record {
    width: 100%;
    height: 540px;
    overflow-y: auto;
    .join-tips {
      position: relative !important;
      display: block;
      width: 100%;
      left: 0 !important;
      transform: none !important;
      color: #cccccc;
      font-size: 15px;
      text-align: center;
    }
    .li {
      position: relative;
      margin-bottom: 15px;
      text-align: left;
      color: #46b0ff;
      &:after {
        content: '';
        display: block;
        clear: both;
      }
      .message-date {
        font-size: 16px;
        color: #b9b8b8;
      }
      .m-nickname {
        color: #46b0ff;
      }
      &.user {
        text-align: right;
      }
    }
    .message-box {
      line-height: 30px;
      font-size: 20px;
    }
  }
}
</style>
