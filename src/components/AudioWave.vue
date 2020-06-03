<template>
  <div class="audio-wave-wrap" :class="{active}">
    <div 
      class="line"
      v-for="(item, index) in list" 
      :key="index" 
      :style="'height:'+item+'px;animation-delay:' + -(item-list[0])/((16-6)/0.5) + 's'"></div>
  </div>
</template>
<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [6, 10, 16, 10, 6]
    }
  },
}
</script>
<style lang="scss">
.audio-wave-wrap{
  display: flex;
  align-items: center;
  .line {
    width: 2px;
    margin-right: 2px;
    background: blue;
    border-radius: 4px;
  }
  &.active {
    .line {
      animation: lineAni 0.5s linear infinite alternate;
    }
  }
  @keyframes lineAni {
    0% {
      height: 6px;
    }
    100% {
      height: 16px;
    }
  }
} 
</style>