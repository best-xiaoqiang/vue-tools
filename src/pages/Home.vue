<template>
  <div class="home-wrap">
    <el-table
      :data="menuList"
      border
      style="width: 100%"
      @row-click="menuTap">
      <el-table-column
        align="center"
        prop="title">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [
        {
          title: '组件',
          path: '/coms'
        },
        {
          title: '自定义指令',
          path: '/directive'
        },
        {
          title: '其它',
          path: '/other'
        },
      ]
    }
  },
  methods: {
    menuTap(e){
      let {path} = e
      this.$router.push({path})
    }
  },
}
</script>
<style lang="scss">
.home-wrap{
  padding: 10px;
  .el-table__header-wrapper{
    display: none;
  }
}
</style>