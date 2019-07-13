import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/styles/base.css'
import '@/styles/index.less'
// import VeeValidate from 'vee-validate'
import zhCn from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
// import { promised } from "q"

Vue.use(VeeValidate)
Validator.localize('zh_CN', zhCn)

Vue.use(Vant)
Vue.config.productionTip = false

Vue.prototype.$sleep = item => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, item)
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
