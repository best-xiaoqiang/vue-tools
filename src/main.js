import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.scss'
import 'element-ui/lib/theme-chalk/index.css';
import elementUi from '@/plugins/element-ui'
import initDirectives from '@/plugins/directives'
import router from '@/router'
import {init, bind} from '@/assets/js/custom-life-circle'

Vue.config.productionTip = false

elementUi()
initDirectives()
// 初始化生命周期函数, 必须在Vue实例化之前确定合并策略
init()

const vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// 将rootVm 绑定到生命周期函数监听里面
bind(vm)