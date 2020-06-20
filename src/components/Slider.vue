<template>
  <div class="slider-wrap" ref="slider">
    <div class="bg" :style="'background:' + color">
      <div class="mark" v-for="(item, index) in markList" :key="index" :style="{left: item.left, background: color}"></div>
    </div>
    <div class="process" :style="{width: proW, background: color, opacity: stepCount > 2 ? 0 : 1 }"></div>
    <div class="circle" ref="circle" 
      :style="'left:'+circleL+
      ';background:' + color+
      ';box-shadow:0px 1px 3px 0px '+ shadowColor + ';'">
      <div class="touch-area" ref="touch"></div>
    </div>
    <div class="tips" v-if="tipText">
      <p v-html="tipText"></p>
    </div>
  </div>
</template>
<script>
import util from '@/assets/js/util'
let oldValue = 0
export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    initValue: {
      type: Number,
      default: 0
    },
    tipText: {
      type: String,
      default: ''
    },
    stepCount: {
      type: Number,
      default: 2
    },
    stepMarkShow: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#F78610'
    }
  },
  watch: {
    initValue(newVal){
      this.perValue = this.formatPerValue(newVal, this.min, this.max, this.stepCount)
    },
  },
  data() {
    return {
      sliderDom: null,
      circleDom: null,
      perValue: 0,
      markList: [],
    };
  },
  mounted() {
    this.sliderDom = this.$refs.slider;
    this.circleDom = this.$refs.circle;
    this.touchDom = this.$refs.touch;
    this.initTouchEvent()
    if(this.stepCount > 2 && this.stepMarkShow) this.initMarkList()
    this.perValue = this.formatPerValue(this.initValue, this.min, this.max, this.stepCount)
  },
  methods: {
    initTouchEvent(){
      var _this = this;
      this.touchDom.ontouchstart = function(e) {
        var proW = parseInt(_this.proW);
        var startX = e.touches[0].clientX;
        _this.touchDom.ontouchmove= function(e) {
          var newProW = proW + e.touches[0].clientX - startX;
          var scale = newProW / _this.sliderDom.offsetWidth;
          _this.perValue = Math.ceil((_this.max - _this.min) * scale + _this.min);
          _this.perValue = _this.formatPerValue(_this.perValue, _this.min, _this.max, _this.stepCount)
          _this.value = _this.perValue
        };
        _this.touchDom.ontouchend = function() {
          _this.touchDom.ontouchmove = _this.touchDom.ontouchend = null;
        };
        return false;
      };
    },
    initMarkList(){
      const selfW = 2
      let sliderW = this.sliderDom.offsetWidth
      let _markList = []
      for (let i = 0; i < this.stepCount; i++) {
        _markList.push({
          left: sliderW * i/(this.stepCount-1) - selfW/2 + 'px'
        })
      }
      this.markList = _markList
    },
    formatPerValue(perValue, min, max, stepCount){
      perValue = Math.max(perValue, min);
      perValue = Math.min(perValue, max);
      let _perValue = perValue
      if(stepCount > 2){
        let step = (max-min)/(stepCount-1)
        perValue = step * parseInt(_perValue/step)
        if(_perValue%step >= step/2) perValue += step
      }
      if(perValue !== oldValue){
        oldValue = perValue
        this.$emit('value-change', perValue)
      }
      return perValue
    }
  },
  computed: {
    scale() {
      return (this.perValue - this.min) / (this.max - this.min);
    },
    proW() {
      if (this.sliderDom) {
        return this.sliderDom.offsetWidth * this.scale + "px";
      } else {
        return 0 + "px";
      }
    },
    circleL() {
      if (this.sliderDom) {
        return (
          this.sliderDom.offsetWidth * this.scale - this.circleDom.offsetWidth / 2 + "px"
        );
      } else {
        return 0 + "px";
      }
    },
    shadowColor(){
      return util.toRgba(this.color, 0.6)
    }
  }
};
</script>
<style lang="scss">
.slider-wrap {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 2px;
  border-radius: 5px;
  box-sizing: border-box;
  .bg{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    opacity: 0.2;
    .mark{
      height: 2px;
      width: 2px;
      position: absolute;
      top: 0;
      transform-origin: center;
      transform: scaleY(2.5);
    }
  }
  .process {
    position: absolute;
    left: 0;
    top: 0;
    height: 2px;
    border-radius: 5px;
  }
  .circle {
    position: absolute;
    top: -7px;
    width: 16px;
    height: 16px;
    border-radius: 50%;   
    z-index: 2;
    .touch-area{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      background: rgba($color: red, $alpha: 0);
      z-index: 10;
    }
  }
  .tips {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 0;
    opacity: 0.8;
    max-width: 228px;
    min-width: 80px;
    p{
      border-radius: 8px;
      color: #fff;
      line-height: 16px;
      font-size: 14px;
      background: #000;
      // margin-bottom: 10px;
      box-sizing: border-box;
      padding: 12px 16px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    i{
      width: 0;
      height: 0;
      border: 10px transparent solid;
      border-top-color: #000;
    }
  }
}
</style>