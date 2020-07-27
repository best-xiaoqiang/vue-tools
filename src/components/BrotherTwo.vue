<template>
  <div>
    <el-button :type="btnType" round>{{content}}</el-button>
  </div>
</template>
<script>
import bus from '@/assets/js/bus';

export default {
  data() {
    return {
      btnType: 'danger',
      content: '点击左侧组件'
    }
  },
  created(){
    bus.$on('busTest', ()=>{
      this.content = '收到'
      this.btnType = 'success'
    })
  }
}
</script>