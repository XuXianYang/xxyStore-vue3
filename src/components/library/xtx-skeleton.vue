<template>
  <!-- 全局组件：面板骨架 -->
  <div
    class="xtx-skeleton"
    :style="{ width, height }"
    :class="{ shan: animated }"
  >
    <!-- 盒子效果 -->
    <div class="block" :style="{ backgroundColor: bg }"></div>
    <!--闪效果： 伪元素 -->
  </div>
</template>

<script>
export default {
  name: "XtxSkeleton",
  props: {
    width: {
      type: String,
      default: "100px",
    },
    height: {
      type: String,
      default: "100px",
    },
    bg: {
      type: String,
      default: "#efefef",
    },
    animated: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="less">
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.shan {
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    animation: shan 1.5s ease 0s infinite;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>