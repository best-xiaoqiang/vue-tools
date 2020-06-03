<template>
  <div class="home-wrap">
    <el-card>
      <div class="flex-left">
        <AudioWave :active="audioPlay"></AudioWave>
        <el-button type="primary" round @click="audioPlay = !audioPlay">播放</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import AudioWave from '../components/AudioWave';
export default {
  components: {
    AudioWave
  },
  data() {
    return {
      audioPlay: false
    }
  },
}
</script>
<style lang="scss">
.home-wrap{
  padding: 10px;
  .flex-left{
    &>.el-button{
      margin-left: 10px;
    }
  }
  &>.el-card{
    margin-bottom: 10px;
  }
}
</style>