<template>
  <div class="coms-wrap">
    <div class="title">音乐播放波动</div>
    <v-card>
      <AudioWave :active="audioPlay"></AudioWave>
      <el-button type="primary" round @click="audioPlay = !audioPlay">播放</el-button>
    </v-card>
    <div class="title">弧形进度条</div>
    <v-card>
      <GradientProgress :play="gradientCirclePlay"></GradientProgress>
      <el-button type="primary" round @click="gradientCirclePlay = !gradientCirclePlay">播放</el-button>
    </v-card>
    <div class="title">复制按钮</div>
    <v-card>
      <CopyText :text="'我是一个粉刷匠'"></CopyText>
    </v-card>
    <div class="title">手动进度条</div>
    <v-card>
      <Slider></Slider>
    </v-card>
    <div class="title">用Vue.extend开发全局组件</div>
    <v-card>
      <el-button type="primary" round @click="showLoading">MyLoading</el-button>
    </v-card>
    <div class="title">toast</div>
    <v-card>
      <el-button type="primary" round @click="showToast">普通</el-button>
      <el-button type="success" round @click="showToast('success')">成功</el-button>
      <el-button type="danger" round @click="showToast('error')">错误</el-button>
      <el-button type="warning" round @click="showToast('loading')">加载</el-button>
    </v-card>
    <div class="title">动态组件</div>
    <v-card>
      <component :is="roleComponent" v-if="roleComponent"></component>
    </v-card>
    <div class="title">插槽使用</div>
    <v-card>
      <SlotTest>
        <div>我是默认插槽中的内容。</div>
        <template v-slot:slot2="scope">
          <div :style="scope.colorRed ? 'color: red' : ''">我是slot1插槽中的内容。</div>
        </template>
        <template v-slot:slot3>
          <!-- <div>我是slot3插槽中的内容。</div> -->
        </template>
      </SlotTest>
    </v-card>
    <div class="title">兄弟组件的通信(bus)</div>
    <v-card>
      <BrotherOne></BrotherOne>
      <BrotherTwo></BrotherTwo>
    </v-card>
    <div class="title">页面和nav联动：</div>
    <v-card>
      <el-button type="success" round @click="$router.push({path: '/nav'})">点击跳转</el-button>
    </v-card>


    <Toast
      :show="toastText != ''"
      :content="toastText"
      :type="toastType"
      @on-show="toastText = ''"></Toast>
  </div>
</template>
<script>
import MyLoading from '@/components/MyLoading/index.js'

import vCard from '@/components/HomeCard'
import Toast from '@/components/Toast'
import AudioWave from '@/components/AudioWave'
import CopyText from '@/components/CopyText'
import GradientProgress from '@/components/GradientProgress'
import Slider from '@/components/Slider'
import SlotTest from '@/components/SlotTest'
import BrotherOne from '@/components/BrotherOne'
import BrotherTwo from '@/components/BrotherTwo'
export default {
  components: {
    vCard,
    AudioWave,
    GradientProgress,
    Toast,
    CopyText,
    Slider,
    SlotTest,
    BrotherOne,
    BrotherTwo
  },
  data() {
    return {
      audioPlay: false,
      gradientCirclePlay: false,
      toastType: '',
      toastText: '',
      roleComponents: {
        manualSlider: Slider
      },
      roleComponent: null
    }
  },
  mounted(){
    setTimeout(() => {
      this.roleComponent = this.roleComponents['manualSlider']
    }, 3000);
  },
  methods: {
    showToast(type){
      this.toastType = type
      if(type == 'loading'){
        this.toastText = ' '
        setTimeout(() => {
          this.toastText = ''
        }, 1000);
      }else if(type == 'success'){
        this.toastText = '成功toast'
      }else if(type == 'error'){
        this.toastText = '错误toast'
      }else{
        this.toastType = 'normal'
        this.toastText = '普通toast'
      }
    },
    showLoading(){
      this.loading = MyLoading({text: '加载载'})
      setTimeout(() => {
        if(this.loading) this.loading.close()
      }, 3000);
    },
  }
}
</script>
<style lang="scss">

@import '@/assets/css/index.scss';

.coms-wrap{
  padding: 10px;
  .el-button{
    margin-left: 10px;
  }
  &>.title{
    margin-bottom: 10px;
    color: #666;
  }
}
</style>