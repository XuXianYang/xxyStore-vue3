<template>
  <!-- 首页新鲜好物组件 -->
  <div class="home-new">
    <homePannel :title="'新鲜好物'" :subTitle="'新鲜出炉 品质靠谱'">
      <template #right>
        <xtxMore></xtxMore>
      </template>
      <div ref="target" style="position: relative; height: 426px">
        <Transition name="fade">
          <ul class="goodsList" v-if="newList.length">
            <li class="good" v-for="item in newList" :key="item.id" @click="$router.push(`/goods/${item.id}`)">
              <img class="pic" :src="item.picture" alt="" />
              <p class="name">{{ item.name }}</p>
              <p class="price"><span>￥</span>{{ item.price }}</p>
            </li>
          </ul>
          <HomeSkeleton v-else></HomeSkeleton>
        </Transition>
      </div>
    </homePannel>
  </div>
</template>

<script>
import homePannel from "@/views/home/home-panel.vue";
import xtxMore from "@/components/library/xtx-more.vue";
import { findNew } from "@/api/home";
// import { ref } from "vue";
import HomeSkeleton from "@/views/home/home-skeleton.vue"
import { useLazyData } from '@/hooks'

export default {
  components: { homePannel, xtxMore,HomeSkeleton },
  setup() {
    /*
    const newList = ref([]);
    findNew()
      .then((res) => {
        newList.value = res.result;
      })
      .catch((err) => {});
    return { newList };
    */
    

    // 懒加载：观察dom元素，dom出现时再去获取数据
    const {target , result} = useLazyData(findNew)
    return { newList:result,target };
  },
};
</script>

<style scoped lang="less">
.home-new {
  width: 1240px;
  background-color: #fff;
  .goodsList {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 426px;
    .good {
      width: 306px;
      height: 406px;
      background: #f0f9f4;
      .hoverShadow();
      .pic {
        width: 100%;
        height: 306px;
      }
      .name,
      .price {
        font-size: 20px;
        padding: 5px 10px 0 10px;
        text-align: center;
      }
      .price {
        color: @priceColor;
        span {
          font-size: 15px;
        }
      }
    }
  }
}
</style>