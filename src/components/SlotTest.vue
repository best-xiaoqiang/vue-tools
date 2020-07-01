<template>
  <div class="slot-test-wrap">
    <div>默认插槽内容:</div>
    <slot></slot>
    <div>slot2插槽内容：</div>
    <slot name="slot2" v-bind="{colorRed: true}"></slot>
    <div>slot3插槽内容：</div>
    <slot name="slot3">
      <div>---slot3插槽中的默认内容---</div>
    </slot>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
.slot-test-wrap{
  font-size: 20px;
}
</style>