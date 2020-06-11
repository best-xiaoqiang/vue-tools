<template>
  <div class="home-card-wrap">
    <el-card>
      <div class="flex-left">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>
<style lang="scss">
.home-card-wrap{
  &>.el-card{
    margin-bottom: 10px;
  }
}
</style>