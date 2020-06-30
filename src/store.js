import Vue from 'vue'
export const store = Vue.observable({
  count: 0
})
export const mutations = {
  countInc(){
    store.count += 1
  }
}