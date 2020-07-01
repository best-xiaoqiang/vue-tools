<template>
  <div>
    <transition name="fade">
      <router-view class="ab-fill"></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active{
  transition: opacity .5s;
}
.fade-enter, .fade-leave-active{
  opacity: 0;
}
</style>
