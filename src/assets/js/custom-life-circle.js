// 定义生命周期函数 pageHidden 与 pageVisible
import Vue from 'vue'

// 通知所有组件页面状态发生了变化
const notifyVisibilityChange = (lifeCycleName, vm) => {
  // 生命周期函数会存在$options中，通过$options[lifeCycleName]获取生命周期
  const lifeCycles = vm.$options[lifeCycleName]
  // 因为使用了created的合并策略，所以是一个数组
  if (lifeCycles && lifeCycles.length) {
    // 遍历 lifeCycleName对应的生命周期函数列表，依次执行
    lifeCycles.forEach(lifecycle => {
      lifecycle.call(vm)
    })
  }
  // 遍历所有的子组件，然后依次递归执行
  if (vm.$children && vm.$children.length) {
    vm.$children.forEach(child => {
      notifyVisibilityChange(lifeCycleName, child)
    })
  }
}

/**
 * 添加生命周期钩子函数
 * @param {*} rootVm vue 根实例，在页面显示隐藏时候，通过root向下通知
 */
export function init() {
  const optionMergeStrategies = Vue.config.optionMergeStrategies
  /*
    定义了两个生命周期函数 pageVisible, pageHidden
    为什么要赋值为 optionMergeStrategies.created呢
    这个相当于指定 pageVisible, pageHidden 的合并策略与 created的相同（其他生命周期函数都一样）
   */
  optionMergeStrategies.pageVisible = optionMergeStrategies.beforeCreate
  optionMergeStrategies.pageHidden = optionMergeStrategies.created
}

/**
 * 将事件变化绑定到根节点上面
 * @param {*} rootVm
 */
export function bind(rootVm) {
  window.addEventListener('visibilitychange', () => {
    // 判断调用哪个生命周期函数
    let lifeCycleName = undefined
    if (document.visibilityState === 'hidden') {
      lifeCycleName = 'pageHidden'
    } else if (document.visibilityState === 'visible') {
      lifeCycleName = 'pageVisible'
    }
    if (lifeCycleName) {
      // 通过所有组件生命周期发生变化了
      notifyVisibilityChange(lifeCycleName, rootVm)
    }
  })
}

// 作者：前端进击者
// 链接：https://juejin.im/post/5ef6d1325188252e75366ab5
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。