<template>
  <div class="gradient-progress-wrap">
    <canvas ref="canvas">您的浏览器不支持Canvas标签！</canvas>
  </div>
</template>
<script>
const interval = 10
export default {
  /*
    JS定时器不准及解决方案：https://blog.csdn.net/qq_41494464/article/details/99944633
    canvas画图移动端出现锯齿毛边的解决方法：https://www.cnblogs.com/dearxinli/p/6877286.html
  */
  props: {
    canvasW: {
      type: Number,
      default: 32
    },
    lineW: {
      type: Number,
      default: 4
    },
    duration: { // 毫秒
      type: Number,
      default: 2000
    },
    play: {
      type: Boolean,
      default: false
    }
  },
  watch:{
    play(val){
      if(val){
        if(this.paintParams && !this.painting){
          this.clearProgress = false
          this.paintProgress(this.paintParams)
        }
      }else{
        this.clearProgress = true
        this.initCircle()
      }
    }
  },
  data(){
    return{
      paintParams: null,
      painting: false,
      clearProgress: false
    }
  },
  mounted() {
    this.initCircle()
    if(this.play){
      this.paintProgress(this.paintParams)
    }
  },
  methods: {
    initCircle() {
      let ratio = window.devicePixelRatio ? window.devicePixelRatio * 4 : 1
      let canvasW = this.canvasW * ratio
      let lineW = this.lineW * ratio
      var canvas = this.$refs.canvas //画布对象
      canvas.style.width = this.canvasW + 'px'
      canvas.style.height = this.canvasW + 'px'
      canvas.width = canvasW
      canvas.height = canvasW
      var ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvasW, canvasW) //清除已绘制内容
      ctx.lineWidth = lineW
      const circleR = (canvasW - lineW) / 2
      var gradient = ctx.createLinearGradient(0, 0, 0, canvasW)
      gradient.addColorStop('0', '#BBC7FF')
      gradient.addColorStop('1', '#C4BBFE')
      ctx.strokeStyle = gradient
      ctx.beginPath()
      ctx.arc(canvasW / 2, canvasW / 2, circleR, 0, 180)
      ctx.stroke()
      ctx.closePath()
      // this.paintProgress({ctx, canvasW, lineW, circleR, ratio})
      this.paintParams = {ctx, canvasW, lineW, circleR, ratio}
    },
    //划外圆
    paintProgress({ctx, canvasW, lineW, circleR, ratio}){
      this.painting = true
      var gradient2 = ctx.createLinearGradient(0, 0, 0, canvasW)
      gradient2.addColorStop('0', '#788CFF')
      gradient2.addColorStop('1', '#A15AFC')          
      ctx.lineWidth = lineW
      var currentStep = 0
      let totalStep = this.duration/interval
      var that = this
      let firstTime = new Date().getTime()
      paintStep()
      function paintStep() {
        if(that.clearProgress){
          that.clearProgress = false
          that.painting = false
          return
        }
        currentStep += 1
        that.currentStep = currentStep
        let endTime = new Date().getTime()
        let lastTime = that.duration - (endTime - firstTime) // 剩余时间
        totalStep = currentStep + lastTime/interval 
        /* 每次都根据实际剩余时间重新计算totalStep的值， 
           防止定时器不准时导致的圆圈转不完的情况， 
           缺点是会导致后面的速度比前面的快。
        */
        ctx.beginPath()
        var startAngle = -0.5 * Math.PI
        var endAngle = startAngle + 2 * Math.PI * (currentStep / totalStep)
        ctx.arc(canvasW / 2, canvasW / 2, circleR, startAngle, endAngle)
        ctx.strokeStyle = gradient2
        ctx.stroke()
        if(currentStep < totalStep){
          setTimeout(() => {
            paintStep()
          }, interval);
        }else{
          that.painting = false
          ctx.scale(ratio, ratio);
        }
      }
    }
  }
}
</script>
<style lang="scss">
.gradient-progress-wrap {
  canvas{
    display: block;
  }
}
</style>