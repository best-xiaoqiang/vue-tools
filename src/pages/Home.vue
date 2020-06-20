<template>
  <div class="home-wrap">
    <v-card>
      <AudioWave :active="audioPlay"></AudioWave>
      <el-button type="primary" round @click="audioPlay = !audioPlay">播放</el-button>
    </v-card>
    <v-card>
      <GradientProgress :play="gradientCirclePlay"></GradientProgress>
      <el-button type="primary" round @click="gradientCirclePlay = !gradientCirclePlay">播放</el-button>
    </v-card>
    <v-card>
      <CopyText :text="'我是一个粉刷匠'"></CopyText>
    </v-card>
    <v-card>
      <Slider></Slider>
    </v-card>
    <div class="title">toast</div>
    <v-card>
      <el-button type="primary" round @click="showToast">普通</el-button>
      <el-button type="success" round @click="showToast('success')">成功</el-button>
      <el-button type="danger" round @click="showToast('error')">错误</el-button>
      <el-button type="warning" round @click="showToast('loading')">加载</el-button>
    </v-card>
    <Toast
      :show="toastText != ''"
      :content="toastText"
      :type="toastType"
      @on-show="toastText = ''"></Toast>
  </div>
</template>
<script>
import vCard from '@/components/HomeCard'
import Toast from '@/components/Toast'
import AudioWave from '@/components/AudioWave'
import CopyText from '@/components/CopyText'
import GradientProgress from '@/components/GradientProgress'
import Slider from '@/components/Slider'
export default {
  components: {
    vCard,
    AudioWave,
    GradientProgress,
    Toast,
    CopyText,
    Slider
  },
  data() {
    return {
      audioPlay: false,
      gradientCirclePlay: false,
      toastType: '',
      toastText: ''
    }
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
    }
  }
}
</script>
<style lang="scss">

@import '@/assets/css/index.scss';

.home-wrap{
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