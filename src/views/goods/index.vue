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
          <GoodsSku :goods="goods" @change="changeSku"></GoodsSku>
          <XtxNumberBox label="数量" v-model="num" :max="goods.inventory"></XtxNumberBox>
          <XtxButton type="primary" style="margin-top:20px;">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :id="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs></GoodsTabs>
          <!-- 注意事项 -->
          <GoodsWarn></GoodsWarn>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot></GoodsHot>
          <GoodsHot :type="2"></GoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from "./goods-relevant.vue";
import GoodsImage from "./goods-image.vue";
import GoodsSales from "./goods-sales.vue";
import GoodsName from "./goods-name.vue";
import GoodsSku from "./goods-sku.vue";
import GoodsTabs from "./goods-tabs.vue"
import GoodsHot from "./goods-hot.vue"
import GoodsWarn from "./goods-warn.vue"
import { findGoods } from "@/api/product";
import { useRoute } from "vue-router";
import { ref, watch, nextTick,provide } from "vue";
export default {
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku,GoodsTabs,GoodsHot,GoodsWarn },
  setup() {
    const num = ref(1)
    const goods = getGoodsDetail();
    console.log("商品详情", goods);
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price;
        goods.value.oldPrice = sku.oldPrice;
        goods.value.inventory = sku.inventory;
      }
    };
    // 父组件给子组件共享数据
    provide('goods', goods)
    return { goods, changeSku,num };
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
    }
    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }
}
</style>