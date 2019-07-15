import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/styles/base.css'
import '@/styles/index.less'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn' // 加载中文语言包
// import VeeValidate from 'vee-validate'
import zhCn from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
// import { promised } from "q"

Vue.use(VeeValidate)
Validator.localize('zh_CN', zhCn)

Vue.use(Vant)
// options 为可选参数，无则不传
Vue.use(Lazyload)
// 处理时间
dayjs.locale('zh-cn') // 全局使用中文
dayjs.extend(relativeTime)
// 全局过滤器，Vue.filter(...)，任何组件都可以使用
Vue.filter('relativeTime', value => {
  return dayjs().from(value)
})
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
