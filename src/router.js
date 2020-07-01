import Vue from 'vue'
import VueRouter from 'vue-router'

// 页面
import Home from '@/pages/Home.vue'
import Coms from '@/pages/Coms.vue'
import Directive from '@/pages/Directive.vue'
import Other from '@/pages/Other.vue'
import Test from '@/pages/Test.vue'

Vue.use(VueRouter)

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

export default router