<template lang="">
  <div class="nav-page-wrap">
    <div class="section-item" v-for="(item, index) in list" :key="index">
      {{item}}
    </div>
    <FixedNav v-if="itemDoms.length" :list="list" :item-doms="itemDoms" />
  </div>
</template>
<script>
import FixedNav from '@/components/FixedNav'

export default {
  components: {
    FixedNav
  },
  data() {
    return {
      list: [
        '栏目（一）',
        '栏目（二）',
        '栏目（三）',
        '栏目（四）',
        '栏目（五）'
      ],
      itemDoms: []
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.itemDoms = document.getElementsByClassName('section-item')
    })
  }
}
</script>
<style lang="scss">
.nav-page-wrap{
  .section-item{
    height: 500px;
    background-color: aqua;
    line-height: 500px;
    text-align: center;
    border-bottom: 1px solid red;
  }
}
</style>