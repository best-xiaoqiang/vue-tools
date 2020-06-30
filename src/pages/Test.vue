<template>
  <div class="test-wrap">
    <v-card>
      <el-button type="primary" round @click="countInc">count:{{count}}  (点击+1)</el-button>
    </v-card>
  </div>
</template>
<script>
import {store, mutations} from '../store'
import VCard from '@/components/HomeCard'

export default {
  components: {
    VCard,
  },
  computed: {
    count(){
      return store.count
    }
  },
  methods:{
    countInc(){
      mutations.countInc()
    }
  }
}
</script>
<style lang="scss">
.test-wrap{
  padding: 10px;
}
</style>