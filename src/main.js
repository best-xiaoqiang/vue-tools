import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.scss'
import 'element-ui/lib/theme-chalk/index.css';
import elementUi from '@/plugins/element-ui'
import VueRouter from 'vue-router'
import {init, bind} from '@/assets/js/custom-life-circle'

// 页面
import Home from '@/pages/Home.vue'
import Coms from '@/pages/Coms.vue'
import Directive from '@/pages/Directive.vue'
import Other from '@/pages/Other.vue'
import Test from '@/pages/Test.vue'

// 自定义指令
import vco from "v-click-outside" // npm install --save v-click-outside
import VTooltip from "v-tooltip" // npm install --save v-tooltip
import VMoney from 'v-money' // npm install --save v-money
import VRipple from 'vue-ripple-directive' // npm install --save vue-ripple-directive
import VBlur from 'v-blur' // npm install --save v-blur

Vue.use(vco)
Vue.use(VTooltip)
Vue.use(VMoney)
VRipple.color = 'rgba(255, 0, 0, 0.5)'
Vue.directive('ripple', VRipple)
Vue.use(VBlur)

Vue.config.productionTip = false
Vue.use(VueRouter)

elementUi()

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/coms',
    component: Coms
  },
  {
    path: '/directive',
    component: Directive
  },
  {
    path: '/other',
    component: Other
  },
  {
    path: '/test',
    component: Test
  },
]

const router = new VueRouter({
  routes
})

// 初始化生命周期函数, 必须在Vue实例化之前确定合并策略
init()

const vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// 将rootVm 绑定到生命周期函数监听里面
bind(vm)