<template>
  <!-- 首页人气推荐组件 -->
  <div class="home-hot">
    <homePannel :title="'人气推荐'" :subTitle="'人气爆款 不容错过'">
      <div ref="target"  style="position: relative; height: 426px">
        <Transition name="fade">
          <ul class="hotList" v-if="hotList.length">
            <li class="hot" v-for="item in hotList" :key="item.id">
              <img class="pic" :src="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="alt">{{ item.alt }}</p>
            </li>
          </ul>
          <HomeSkeleton v-else />
        </Transition>
      </div>
    </homePannel>
  </div>
</template>
  
  <script>
import homePannel from "@/views/home/home-panel.vue";
import { findHot } from "@/api/home";
import HomeSkeleton from "@/views/home/home-skeleton.vue"
import { useLazyData } from '@/hooks'

export default {
  components: { homePannel ,HomeSkeleton},
  setup() {
    // 懒加载：观察dom元素，dom出现时再去获取数据
    const {target , result} = useLazyData(findHot)
    return { hotList:result,target };
  },
};
</script>
  
  <style scoped lang="less">
.home-hot {
  width: 1240px;
  background-color: #fff;
  .hotList {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 426px;
    .hot {
      width: 306px;
      height: 406px;
      background: #f0f9f4;
      .hoverShadow();
      .pic {
        width: 100%;
        height: 306px;
      }
      .name,
      .alt {
        font-size: 22px;
        padding-top: 12px;
        text-align: center;
      }
      .alt {
        color: #999;
        font-size: 18px;
      }
    }
  }
}
</style>