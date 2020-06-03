import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/index.css'
import {Button, Card} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Card)

new Vue({
  render: h => h(App),
}).$mount('#app')
