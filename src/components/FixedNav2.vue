<template>
  <div class="service-nav">
    <a
      v-for="(item, index) in list"
      :key="index"
      href="javascript:;"
      class="service-nav-item"
      :class="[currentIndex === index ? 'active' : '']"
      @click="navTap(index)"
    >
      {{ item }}
    </a>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: ()=>{
        return []
      }
    },
    itemDoms: {
      type: HTMLCollection,
      default: ()=>{
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
      itemTopArr: []
    }
  },

  watch: {
    itemDoms: {
      immediate: true,
      handler(val){
        if (val && val.length) {
          this.$nextTick(() => {
            this.initScrollListener()
            console.log('val', val)
            var io = new IntersectionObserver(entries => {
              console.log('entries', entries)
              const entriesOne = entries[0]
              const currentIndex = Array.prototype.findIndex.call(val, (item, index) => {
                console.log(+entriesOne.intersectionRatio === 1, entriesOne.target.attributes.navKey.value, index)
                return +entriesOne.intersectionRatio === 1 && entriesOne.target.attributes.navKey.value == index
              })
              if(currentIndex > -1){
                this.currentIndex = currentIndex
              }
            },  {
              threshold: [1]
            });
            val.forEach(item => {
              io.observe(item);
              // // 停止观察
              // io.unobserve(item);
            })

            // 关闭观察器
            // io.disconnect();
          })
        }
      }
    }
  },
  methods: {    
    initScrollListener() {
      const itemDoms = this.itemDoms
      const len = itemDoms.length
      for (let i = 0; i < len; i++) {
        const itemDom = itemDoms[i]
        this.itemTopArr.push({
          top: itemDom.offsetTop,
          height: itemDom.offsetHeight
        })
      }
    },
  
    getScreenHeight() {
      return document.documentElement.clientHeight || document.body.clientHeight
    },
  
    navTap(index) {
      this.currentIndex = index
      const screenHeight = this.getScreenHeight()
      let theTop = 0
      const targetItem = this.itemTopArr[index]
      if (targetItem.height > screenHeight) {
        theTop = targetItem.top
      } else {
        theTop = targetItem.top - (screenHeight - targetItem.height) / 2
      }
      window.scrollTo(0, theTop)
    }
  },

}
</script>
<style lang="scss" scoped>
.service-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 50px;
  display: flex;
  flex-direction: column;
  z-index: 100;
  .service-nav-item {
    padding: 9px 15px;
    color: #a1a5b1;
    font-size: 12px;
    position: relative;
    &::before {
      content: '';
      width: 1px;
      background-color: #e8e9ed;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      transform: translateX(-50%);
    }
    &:nth-of-type(1)::before {
      top: initial;
      bottom: 0;
      height: 50%;
    }
    &:last-child::before {
      height: 50%;
    }
    &::after {
      content: '';
      width: 4px;
      height: 4px;
      background-color: #cfd2d8;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      z-index: 1;
    }
    &.active {
      color: #222;
      &::after {
        width: 6px;
        height: 6px;
        box-sizing: content-box;
        background-color: rgba(247, 107, 28, 1);
        background-clip: padding-box;
        border: 2px solid rgba(247, 107, 28, 0.2);
      }
    }
  }
}
</style>
