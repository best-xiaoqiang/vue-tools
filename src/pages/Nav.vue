<template lang="">
  <div class="nav-page-wrap">
    <div class="section-item" v-for="(item, index) in list"
    :key="index" :navKey="index">
      {{ item }}
    </div> 
    <FixedNav v-if="itemDoms.length" :list="list" :item-doms="itemDoms" />
    <FixedNav2 v-if="itemDoms.length" :list="list" :item-doms="itemDoms" /> 
  </div>
</template>
<script>
import FixedNav from "@/components/FixedNav";
import FixedNav2 from "@/components/FixedNav2";

export default {
  components: {
    FixedNav,
    FixedNav2,
  },
  data() {
    return {
      list: ["栏目（一）", "栏目（二）", "栏目（三）", "栏目（四）", "栏目（五）"],
      itemDoms: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.itemDoms = document.getElementsByClassName("section-item");
    });
  },
};
</script>
<style lang="scss">
.nav-page-wrap {
  .section-item {
    height: 500px;
    background-color: aqua;
    line-height: 500px;
    text-align: center;
    border-bottom: 1px solid red;
  }
}
</style>
