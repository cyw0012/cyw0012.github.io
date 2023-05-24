<template>
  <div id="header-container">
    <div class="input-group">
      <div class="input-group-addon">任务</div>
      <input
        type="text"
        class="form-control"
        id="bookname"
        placeholder="请填写任务信息"
        v-model.trim="userinfo"
        @keyup.enter="addList"
      />
      <button type="button" class="btn btn-primary" @click="addList">
        添加新任务
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      userinfo: '',
    }
  },
  methods: {
    addList() {
      if (this.userinfo === '') return alert('请填写任务信息')
      this.$emit('addlist', this.userinfo)
      this.userinfo = ''
    },
  },
}
</script>

<style scoped>
.input-group .form-control {
  width: 70%;
}
.btn-primary {
  margin-left: 20px;
}
</style>
