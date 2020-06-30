<template>
  <div class="other-wrap">
    <div class="title">通过@hook:updated监听组件的updated生命钩子函数</div>
    <v-card>
      <Slider @hook:updated="onComponentUpdate"></Slider>
    </v-card>
    <div class="title">用Vue.observable写状态管理</div>
    <v-card :between="true">
      <el-button type="primary" round @click="countInc">count:{{count}}  (点击+1)</el-button>
      <el-button type="success" @click="goTest">Test</el-button> 
    </v-card>
    <div class="title">watch的immediate方法</div>
    <v-card>
      <input type="text" v-model="inputValue" />
    </v-card>
  </div>
</template>
<script>
import {store, mutations} from '../store'
import VCard from '@/components/HomeCard'
import Slider from '@/components/Slider'
export default {
  components: {
    VCard,
    Slider
  },
  computed: {
    count(){
      return store.count
    }
  },
  watch: {
    inputValue: {
      handler(newVal, oldVal){
        console.log('inputValue newVal', newVal, oldVal)
      },
      // 配置后监听会立即执行一次
      immediate: true
    }
  },
  data() {
    return {
      inputValue: '初始value'
    }
  },
  mounted(){
    console.log(this)
    this.initResize()
    // this.initVisibility()
  },
  pageVisible(){
    console.log('页面显示出来了')
  },
  pageHidden(){
    console.log('页面隐藏了')
  },
  methods: {
    initResize(){
      window.addEventListener('resize', this.onResize)
      // 通过hook监听组件销毁钩子函数，并取消监听事件
      this.$once('hook:beforeDestroy', ()=>{  
        console.log('beforeDestroy')
        window.removeEventListener('resize', this.onResize)
      })
      /*
        在Vue组件中，可以用过$on,$once去监听所有的生命周期钩子函数，如监听组件的updated钩子函数可以写成 this.$on('hook:updated', () => {})
      */
    },
    onResize(){
      console.log('--resize--')
    },
    onComponentUpdate(){
      console.log('onComponentUpdate')
    },
    countInc(){
      mutations.countInc()
    },
    goTest(){
      this.$router.push({path: '/test'})
    },
    // initVisibility(){
    //   window.addEventListener('visibilitychange', this.onVisibilityChange)
    //   this.$on('hook:beforeDestory', ()=>{
    //     window.removeEventListener('visibilitychange', this.onVisibilityChange)
    //   })
    // },
    // onVisibilityChange(){
    //   if(document.visibilityState === 'hidden'){
    //     console.log('page hidden')
    //   }
    //   if(document.visibilityState === 'visible'){
    //     console.log('page visible')
    //   }
    // },
  },
}
</script>
<style lang="scss">
.other-wrap{
  padding: 10px;
  &>.title{
    margin-bottom: 10px;
    color: #666;
  }
  .box{
    height: 40px;
    padding: 0 20px;
  }
  input{
    background: gray;
    opacity: 0.7;
  }
}
</style>