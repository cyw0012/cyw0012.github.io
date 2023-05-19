import Vue from 'vue'
import App from './App.vue'
import '@/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入截图 vue-cropper 包
import VueCropper from 'vue-cropper'

Vue.use(ElementUI)
Vue.use(VueCropper)

Vue.config.productionTip = false
Vue.prototype.$ws = new WebSocket('ws://127.0.0.1:8888')

new Vue({
  render: h => h(App)
}).$mount('#app')
