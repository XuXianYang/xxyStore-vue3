<template>
  <div class="goods-image" v-if="images && images.length">
    <div
      class="large"
      :style="[{ backgroundImage: `url(${images[currIndex]})`},bgPosition]"
      v-show="show"
    ></div>
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="" />
      <div class="layer" v-show="show" :style="position"></div>
    </div>
    <ul>
      <li
        v-for="(pic, index) in images"
        :key="index"
        :class="{ active: currIndex === index }"
      >
        <img :src="images[index]" alt="" @mouseenter="currIndex = index" />
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";

export default {
  props: {
    images: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const currIndex = ref(0);
    const { position, bgPosition, show, target } = usePreviewImg()
    return { currIndex,position, bgPosition, show, target };
  },
};
// 获取鼠标移动的数据
const usePreviewImg = () => {
  const target = ref(null);
  // 控制放大镜和预览是否显示
  const show = ref(false);
  //鼠标基于容器左上角X轴偏移，鼠标基于容器左上角Y轴偏移，isOutside鼠标是否在模板容器外
  const { elementX, elementY, isOutside } = useMouseInElement(target);
  const position = reactive({ left: 0, top: 0 });//放大镜位置
  const bgPosition = reactive({
    backgroundPositionX: 0,
    backgroundPositionY: 0,
  });//预览图的位置
  watch([elementX, elementY, isOutside], () => {
    // 控制X轴方向的定位 0-200 之间
    if (elementX.value < 100) position.left = 0;
    else if (elementX.value > 300) position.left = 200;
    else position.left = elementX.value - 100;
    // 控制Y轴方向的定位 0-200 之间
    if (elementY.value < 100) position.top = 0;
    else if (elementY.value > 300) position.top = 200;
    else position.top = elementY.value - 100;
    // 设置大背景的定位
    bgPosition.backgroundPositionX = -position.left * 2 + "px";
    bgPosition.backgroundPositionY = -position.top * 2 + "px";
    // 设置遮罩容器的定位
    position.left = position.left + "px";
    position.top = position.top + "px";
    // 设置是否显示预览大图
    show.value = !isOutside.value;
  });
  return { position, bgPosition, show, target };
};
</script>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    left: 412px;
    top: 0;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-size: 800px, 800px;
    background-color: #f8f8f8;
    background-repeat: no-repeat;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    img {
      width: 100%;
      height: 100%;
    }
    .layer {
      position: absolute;
      left: 0;
      top: 0;
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
    }
  }
  ul {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>