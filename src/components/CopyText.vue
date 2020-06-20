<template>
  <div class="copy-text-wrap">
    <input class="copy-text-input" />
    <div class="copy-btn" @click="copy">点击复制</div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '被复制的文字'
    }
  },
  methods: {
    copy(){
      var input=document.querySelector('.copy-text-input');
      input.value = this.text
      input.select();
      // 执行复制
      document.execCommand('Copy');
    }
  },
}
</script>
<style lang="scss">
.copy-text-wrap{
  .copy-text-input{
    position: absolute;
    left: -10000px;
    top: -10000px;
  }
  .copy-btn{
    background: cadetblue;
    padding: 6px;
    color: #fff;
  }
}
</style>