// https://juejin.im/post/5eef7799f265da02cd3b82fe#heading-7
import Vue from 'vue'
import MyLoadingCom from './index.vue'

// 通过Vue.extend将组件包装成一个子类
const MyLoadingConstructor = Vue.extend(MyLoadingCom)

let _loading = undefined

MyLoadingConstructor.prototype.close = function(){
  if(_loading){
    _loading = undefined
  }
  this.show = false
  if(this.$el && this.$el.parentNode){
    this.$el.parentNode.removeChild(this.$el)
  }
  this.$destroy()
}

const MyLoading = (options = {}) => {
  // 如果组件已渲染，直接返回即可
  if(_loading){
    return _loading
  }
  // 要挂载的元素
  const parent = document.body
  // 组件属性
  const opts = {
    text: '',
    ...options
  }
  // 通过构造函数初始化组件 相当于 new Vue()
  const instance = new MyLoadingConstructor({
    el: document.createElement('div'),
    data: opts
  })
  // 将loading元素挂在到parent上面
  parent.appendChild(instance.$el)
  // 显示loading
  Vue.nextTick(()=>{
    instance.show = true
  })
  // 将组件实力赋给_loading
  _loading = instance
  return instance
}

export default MyLoading