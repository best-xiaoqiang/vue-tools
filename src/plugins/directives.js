import Vue from 'vue'

// 自定义指令
import vco from "v-click-outside" // npm install --save v-click-outside
import VTooltip from "v-tooltip" // npm install --save v-tooltip
import VMoney from 'v-money' // npm install --save v-money
import VRipple from 'vue-ripple-directive' // npm install --save vue-ripple-directive
import VBlur from 'v-blur' // npm install --save v-blur

Vue.directive('myFocus', {
  inserted(el){
    console.log(el.getAttribute('testAttr'), 'xxx')
    el.focus()
  }
})

export default () => {
  Vue.use(vco)
  Vue.use(VTooltip)
  Vue.use(VMoney)
  VRipple.color = 'rgba(255, 0, 0, 0.5)'
  Vue.directive('ripple', VRipple)
  Vue.use(VBlur)
}