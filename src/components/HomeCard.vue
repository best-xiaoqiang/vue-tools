<template>
  <div class="home-card-wrap">
    <el-card>
      <div :class="[between ? 'flex-between' : 'flex-left']">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    between: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
.home-card-wrap{
  &>.el-card{
    margin-bottom: 10px;
  }
}
</style>