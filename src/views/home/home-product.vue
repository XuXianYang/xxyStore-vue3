<template>
  <!-- 首页产品区域 -->
  <div class="home-product" ref="target">
    <homePanel :title="item.name" v-for="item in goodsList" :key="item.id">
      <template #right v-if="item.children">
        <div class="sub">
          <RouterLink
            to="/"
            v-for="sub in item.children"
            :key="sub.id"
            >{{ sub.name }}</RouterLink
          >
        </div>
        <XtxMore />
      </template>
      <div class="box" v-if="item.goods">
        <RouterLink class="cover" to="/">
          <img v-lazyload="item.picture" alt="" />
          <strong class="label">
            <span>{{ item.name }}</span>
            <span>{{ item.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="good in item.goods" :key="good.id" @click="$router.push(`/goods/${good.id}`)">
            <homeGoods :good="good"></homeGoods>
          </li>
        </ul>
      </div>
    </homePanel>
  </div>
</template>

<script>
import homeGoods from "@/views/home/home-goods.vue";
import homePanel from "@/views/home/home-panel.vue";
import { findGoods } from "@/api/home";
import { useLazyData } from "@/hooks";
// import { ref } from "vue";

export default {
  components: { homePanel, homeGoods },
  setup() {
    // const goodsList = ref([]);
    // findGoods()
    //   .then((res) => {
    //     goodsList.value = res.result;
    //   })
    //   .catch((err) => {});
    const {target , result} = useLazyData(findGoods)
    return { goodsList:result,target };
  },
};
</script>

<style scoped lang="less">
.home-product {
  background: #fff;
  .sub {
    margin-bottom: 2px;
    margin-right: 80px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      display: block;
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        width: 240px;
        height: 66px;
        line-height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        font-weight: normal;
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      display: flex;
      width: 990px;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-bottom: 10px;
        margin-right: 10px;
        &:nth-child(4n) {
          margin-right: 0;
        }
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>