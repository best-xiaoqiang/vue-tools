<template>
  <transition name="fade">
    <div class="sm-toast-wrapper" v-if="show">
      <div class="toast">
        <i class="fa" :class="classname"></i>
        <p v-text="content"></p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean
    },
    type: {
			type: String,
			default: ''
    },
    content: {
      type: String,
      default: "请填写文字"
    },
    delay: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      timer: null,
      classname: ""
    };
  },
  watch: {
    show(val) {
      var _this = this;
      if (val) {
        if (this.type !== "loading") {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(() => {
            _this.$emit("on-show", false);
          }, this.delay);
        }
      } else {
        this.$emit("on-show", val);
      }
    },
    type(val) {
      var _this = this;
      if (val !== "loading") {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          _this.$emit("on-show", false);
        }, this.delay);
      }

      this.initType();
    }
  },
  created() {
    this.initType();
  },
  methods: {
    initType() {
      switch (this.type) {
        case "loading":
          this.classname = "fa-spinner";
          break;
        case "success":
          this.classname = "fa-check";
          break;
        case "error":
          this.classname = "fa-exclamation";
					break;
				default:
					this.classname = ''
			}
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/font-awesome.min.css";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

@keyframes loading {
  0 {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

.sm-toast-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 100000;
  .toast {
    position: fixed;
    z-index: 5000;
    width: 122px;
    min-height: 76px;
    top: 180px;
    left: 50%;
    margin-left: -61px;
    background: rgba(17, 17, 17, 0.7);
    text-align: center;
    border-radius: 5px;
    color: #ffffff;
    i {
      font-size: 56px;
      margin: 22px 0 10px;
      display: block;
      color: #fff;
      &.fa-spinner {
        -webkit-animation: loading 3s linear infinite;
      }
    }
    p {
      margin: 0 0 15px;
      color: #fff;
      text-align: center;
      line-height: 1.5;
      font-size: 14px;
    }
  }
}
</style>
