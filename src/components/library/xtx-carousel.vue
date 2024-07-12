<template>
  <!-- 全局组件：banner -->
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        v-for="(banner, idx) in bannerList"
        :key="banner.id"
        :class="{ fade: idx === index }"
      >
        <RouterLink :to="banner.hrefUrl">
          <img :src="banner.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="prevFn"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a href="javascript:;" class="carousel-btn next" @click="nextFn"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span
        v-for="(item, i) in bannerList"
        :key="i"
        :class="{ active: i === index }"
        @click="index=i"
      ></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref ,watch} from "vue";

export default {
  name: "XtxCarousel",
  props: {
    bannerList: {
      type: Array,
    },
    // 自动播放间隔时长：毫秒
    duration:{
      type:Number,
      default:2000,
    },
    aotoPlay:{
      type:Boolean,
      default:true
    },
  },
  setup(props) {
    const index = ref(0);
    // 点击显示后一张，越界置为0
    const nextFn =()=>{
      index.value ++
      if(index.value >= props.bannerList.length){
        index.value = 0
      }
    };
    // 点击显示前一张，越界置为最后一个
    const prevFn =()=>{
      index.value --
      if(index.value <0){
        index.value = props.bannerList.length-1
      }
    }
    //设置定时器 ，自动播放
    let timer = null
    const autoplay = ()=>{
      clearInterval(timer)
      timer = setInterval(()=>{
        nextFn()
      },props.duration)
    }
    // 监听数组，开启定时器
    watch(()=>props.bannerList,(newValue,oldValue)=>{
      if(newValue.length && props.aotoPlay){
        index.value = 0
        autoplay()
      }
    }, { immediate: true })
    // 鼠标经过，关闭定时器
    const stop = ()=>{
      clearInterval(timer)
    }
    // 鼠标移出，开启定时器
    const start = ()=>{
      if(props.bannerList.length && props.aotoPlay){
        autoplay()
      }
    }
    // 销毁
    onUnmounted(() => {
      clearInterval(timer)
    })
    return { index,nextFn,prevFn,stop,start };
  },
};
</script>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel-body {
    width: 100%;
    height: 100%;
    .carousel-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      a {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .carousel-indicator {
    position: absolute;
    left: 0;
    bottom: 20px;
    z-index: 2;
    width: 100%;
    text-align: center;
    span {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      cursor: pointer;
      ~ span {
        margin-left: 12px;
      }
      &.active {
        background: #fff;
      }
    }
  }
  .next {
    right: 20px;
  }
  .carousel-btn {
    position: absolute;
    top: 228px;
    z-index: 2;
    width: 44px;
    height: 44px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    text-align: center;
    line-height: 44px;
    opacity: 0;
    transition: all 0.5s;
    .iconfont {
      color: #fff;
      font-size: 25px;
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>