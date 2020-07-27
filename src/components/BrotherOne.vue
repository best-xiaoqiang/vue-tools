<template>
  <div>
    <el-button type="primary" round @click="btnTap">发送</el-button>
  </div>
</template>
<script>
import bus from '@/assets/js/bus';
export default {
  methods: {
    btnTap(){
      bus.$emit('busTest')
    }
  },
}
</script>