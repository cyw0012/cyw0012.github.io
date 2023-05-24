<template>
  <div id="app-container">
    <Header @addlist="addList"></Header>
    <Content
      v-for="item in xuanran"
      :key="item.id"
      :userinfo="item.userinfo"
      :state="item.state"
      :title="item.time"
      @cbchange="cbChage(item.id, $event)"
      @dblclick="deleteList(item.id)"
    ></Content>
    <Footer v-model="flag"></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Content from './components/Content.vue'
import Footer from './components/Footer.vue'
import request from './utils/request.js'
import dateFormat from './utils/dateFormat.js'
export default {
  name: 'App',
  components: {
    Header,
    Content,
    Footer,
  },
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      flag: 1,
    }
  },
  methods: {
    async initRequest() {
      const { data: res } = await request.get('/getlist')
      this.list2 = res.data.filter((item) => item.state === 0).reverse()
      this.list3 = res.data.filter((item) => item.state === 1).reverse()
      this.list1 = [...this.list3, ...this.list2]
      if (res.status) return alert(res.message)
    },
    async cbChage(id, e) {
      const { data: res } = await request.post(
        '/updatelist',
        {
          id,
          state: e ? 0 : 1,
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      )
      if (res.status) return alert(res.message)
      this.initRequest()
    },
    async addList(e) {
      const { data: res } = await request.post(
        '/addlist',
        {
          userinfo: e,
          time: dateFormat(new Date()),
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      )
      if (res.status) return alert(res.message)
      this.initRequest()
    },
    async deleteList(id) {
      const { data: res } = await request.get('/deletelist/' + id)
      if (res.status) return alert(res.message)
      this.initRequest()
    },
  },
  created() {
    this.initRequest()
  },
  computed: {
    xuanran() {
      if (this.flag === 1) return this.list1
      else if (this.flag === 2) return this.list2
      else if (this.flag === 3) return this.list3
    },
  },
}
</script>

<style scoped>
#app-container {
  width: 900px;
  margin: auto;
}
</style>
