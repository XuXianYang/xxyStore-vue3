<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{
          goods.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{
          goods.categories[0].name
        }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures"></GoodsImage>
          <GoodsSales></GoodsSales>
        </div>
        <div class="spec">
          <GoodsName :good="goods"></GoodsName>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">商品+评价</div>
          <!-- 注意事项 -->
          <div class="goods-warn">注意事项</div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">24热榜+专题推荐</div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from "./goods-relevant.vue";
import GoodsImage from "./goods-image.vue"
import GoodsSales from "./goods-sales.vue"
import GoodsName from "./goods-name.vue"
import { findGoods } from "@/api/product";
import { useRoute } from "vue-router";
import { ref, watch, nextTick } from "vue";
export default {
  components: { GoodsRelevant ,GoodsImage,GoodsSales,GoodsName},
  setup() {
    const goods = getGoodsDetail();
    console.log("商品详情", goods);
    return { goods };
  },
};
// 获取商品详情数据
const getGoodsDetail = () => {
  const route = useRoute();
  const goods = ref(null);
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && route.path === `/goods/${newVal}`) {
        findGoods(route.params.id).then((res) => {
          // 让商品数据为null让后使用v-if的组件可以重新销毁和创建
          goods.value = null;
          nextTick(() => {
            goods.value = res.result;
          });
        });
      }
    },
    { immediate: true }
  );
  return goods;
};
</script>

<style scoped lang="less">
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;
    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }
    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }
  .goods-footer {
    display: flex;
    margin-top: 20px;
    .goods-article {
      width: 940px;
      margin-right: 20px;
      .goods-tabs {
        min-height: 600px;
        background: #fff;
      }
      .goods-warn {
        margin-top: 20px;
        min-height: 600px;
        background: #fff;
      }
    }
    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }
}
</style>