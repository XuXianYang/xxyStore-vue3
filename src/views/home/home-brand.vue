<template>
  <!-- 首页热门品牌组件 -->
  <div class="home-brand">
    <homePannel :title="'热门品牌'" :subTitle="'国际经典 品质保证'">
      <template #right>
        <a
          href="javascript:;"
          :class="{ disabled: index === 0 }"
          class="carousel-btn"
          @click="tooglePage(0)"
          ><i class="iconfont icon-angle-left"></i
        ></a>
        <a
          href="javascript:;"
          :class="{ disabled: index === 1 }"
          class="carousel-btn"
          @click="tooglePage(1)"
          ><i class="iconfont icon-angle-right"></i
        ></a>
      </template>
      <div class="box" ref="target" style="position: relative">
        <Transition name="fade">
          <ul
            class="brandList"
            v-if="brandList.length"
            :style="{ transform: `translateX(${-index * 1240}px)` }"
          >
            <li class="brand" v-for="item in brandList" :key="item.id">
              <RouterLink to="/">
                <img class="pic" :src="item.picture" alt="" />
              </RouterLink>
            </li>
          </ul>
          <div v-else class="skeleton">
            <XtxSkeleton
              class="item"
              v-for="i in 5"
              :key="i"
              animated
              bg="#e4e4e4"
              width="240px"
              height="305px"
            />
          </div>
        </Transition>
      </div>
    </homePannel>
  </div>
</template>
  
  <script>
import homePannel from "@/views/home/home-panel.vue";
import { findBrand } from "@/api/home";
import { useLazyData } from "@/hooks";
import { ref } from "vue";
import XtxSkeleton from "@/components/library/xtx-skeleton.vue";

export default {
  components: { homePannel, XtxSkeleton },
  setup() {
    // 懒加载：观察dom元素，dom出现时再去获取数据
    const { target, result } = useLazyData(findBrand);
    const index = ref(0);
    // 切换页面
    const tooglePage = (idx) => {
      index.value = idx;
    };
    return { brandList: result, target, index, tooglePage };
  },
};
</script>
  
  <style scoped lang="less">
.home-brand {
  width: 1240px;
  .home-panel {
    background: #f5f5f5;
    .carousel-btn {
      width: 20px;
      height: 20px;
      line-height: 20px;
      background: #ccc;
      color: #fff;
      display: inline-block;
      text-align: center;
      margin-left: 5px;
      background: @xtxColor;
      &::before {
        font-size: 12px;
        position: relative;
        top: -2px;
      }
      &.disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    }
  }
  .box {
    width: 100%;
    overflow: hidden;
    height: 345px;
    padding-bottom: 40px;
    .brandList {
      width: 200%;
      display: flex;
      transition: all 1s;
      .brand {
        margin-right: 10px;
        width: 240px;
        &:nth-child(5n) {
          margin-right: 0;
        }
        .pic {
          width: 240px;
          height: 305px;
        }
      }
    }
    .skeleton{
        display: flex;
        width: 100%;
        .item{
            margin-right: 10px;
            &:last-child{
                margin-right: 0;
            }
        }
    }
  }
  
}
</style>