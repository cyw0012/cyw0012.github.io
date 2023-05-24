<template>
  <div id="footer-container">
    <ul class="nav nav-pills">
      <li
        role="presentation"
        :class="flag === 1 ? 'active' : ''"
        @click="change(1)"
      >
        <a href="#">全部</a>
      </li>
      <li
        role="presentation"
        :class="flag === 2 ? 'active' : ''"
        @click="change(2)"
      >
        <a href="#">完成</a>
      </li>
      <li
        role="presentation"
        :class="flag === 3 ? 'active' : ''"
        @click="change(3)"
      >
        <a href="#">未完成</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  emits: ['update:flag'],
  data() {
    return {
      flag: 1,
    }
  },
  methods: {
    change(vl) {
      this.flag = vl
      this.$emit('update:flag', vl)
    },
  },
}
</script>

<style scoped>
.nav {
  margin-left: 350px;
}
.nav-pills > li {
  background-color: antiquewhite;
}
.nav-pills > li + li {
  margin-left: 10px;
}
</style>
