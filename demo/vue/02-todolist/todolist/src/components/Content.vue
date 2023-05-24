<template>
  <div id="content-container">
    <ul class="list-group" v-if="state">
      <li class="list-group-item list-group-item-warning">
        <span class="badge nook">未完成</span>
        <label>
          <input type="checkbox" @change="cbChange" /><span>{{
            userinfo
          }}</span></label
        >
      </li>
    </ul>
    <ul class="list-group" v-else>
      <li class="list-group-item list-group-item-success">
        <span class="badge isok">完成</span>
        <label>
          <input type="checkbox" :checked="true" @change="cbChange" /><span
            class="check"
            >{{ userinfo }}</span
          ></label
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    userinfo: {
      type: String,
      required: true,
    },
    state: {
      validator(vl) {
        return vl === 0 || vl === 1
      },
    },
  },
  methods: {
    cbChange(e) {
      this.$emit('cbchange', e.target.checked)
    },
  },
}
</script>

<style scoped>
#content-container {
  margin-top: 20px;
}
input[type='checkbox'] {
  margin-right: 10px;
  display: inline-block;
  width: 15px;
  height: 15px;
}
.check {
  font-style: italic;
  text-decoration: line-through;
}

.nook {
  background-color: #e47676;
}
.isok {
  background-color: #92f1ad;
}
</style>
