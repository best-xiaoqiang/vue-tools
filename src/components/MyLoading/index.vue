<template>
  <div class="my-loading-wrap" v-show="show">
    <img src="./img/loading.gif" alt="">
    <div class="text">{{text}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      text: '哈哈哈11'
    }
  },
}
</script>
<style lang="scss">
.my-loading-wrap{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    width: 50px;
    height: 50px;
  }
  .text{
    color: #ccc;
    margin-top: 10px;
  }
}
</style>