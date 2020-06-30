<template>
  <div class="directive-wrap">
    <div class="title">V-Click-Outside</div>
    <v-card>
      <el-button type="primary" round v-click-outside="onClickOutside">监听元素之外的点击事件</el-button>
    </v-card>
    <div class="title">V-Tooltip</div>
    <v-card>
      <el-button type="primary" round v-tooltip.right-start="'哈哈哈'">tooltip</el-button>
    </v-card>
    <div class="title">V-Money</div>
    <v-card>
      <input v-model.lazy="price" v-money="moneyConfig" />
      <div>{{price}}</div>
    </v-card>
    <div class="title">Vue-Ripple-Directive</div>
    <v-card>
      <div class="box" v-ripple>点击有波纹</div>
    </v-card>
    <div class="title">V-Blur</div>
    <v-card>
      <div class="box2" v-blur="blurConfig">半透明遮罩</div>
    </v-card>
    <v-card>

    </v-card>
  </div>
</template>
<script>
/*
  这15个Vue自定义指令，让你的项目开发爽到爆: https://zhuanlan.zhihu.com/p/108308393?utm_source=qq
*/ 
import VCard from '@/components/HomeCard'

export default {
  components: {
    VCard,
  },
  data() {
    return {
      price: 99.99,
      moneyConfig: {
        decimal: '.',
        thousands: ',',
        prefix: '$ ',
        precision: 2,
      },
      blurConfig: {
        isBlurred: true,
        opacity: 0.3,
        filter: 'blur(1.2px)',
        transition: 'all .3s linear'
      },
    }
  },
  methods: {
    onClickOutside(){
      console.log('onClickOutside')
    }
  },
}
</script>
<style lang="scss">
.directive-wrap{
  padding: 10px;
  &>.title{
    margin-bottom: 10px;
    color: #666;
  }
  .tooltip{
    background: red;
  }
  .box{
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    background: green;
    color: white;
    border-radius: 40px;
  }
  .box2{
    width: 100px;
    height: 100px;
    line-height: 100px;
    background: green;
    color: white;
    text-align: center;
  }
}
</style>