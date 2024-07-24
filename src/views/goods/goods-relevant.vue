<template>
  <!-- 商品推荐 -->
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title">{{ id ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <XtxCarousel :bannerList="sliders" auto-play></XtxCarousel>
  </div>
</template>

<script>
import { findRelGoods } from "@/api/product";
import { ref } from "vue";
export default {
  props: {
    id: {
      type: [Number, String],
      default: "",
    },
  },
  setup(props) {
    const sliders = ref([]);
    findRelGoods(props.id).then((res) => {
      const size = 4;
      const total = Math.ceil(res.result.length / size);
      for (let i = 0; i < total; i++) {
        const item = res.result.slice(i * size, (i + 1) * size);
        sliders.value.push(item);
      }
    });
    return { sliders };
  },
};
</script>

<style scoped lang="less">
// vue3 覆盖样式:deep(选择器)
:deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
  }
  .carousel-btn {
    top: 110px;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
    .iconfont {
      color: #fff;
      font-size: 30px;
    }
  }
  .prev {
    left: 20px;
  }
}
.goods-relevant {
  background-color: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
</style>