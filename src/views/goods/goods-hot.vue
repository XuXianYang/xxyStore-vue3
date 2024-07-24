<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <ul>
      <li v-for="good in goodsList" :key="good.id">
        <GoodsItem :good="good"></GoodsItem>
      </li>
    </ul>
  </div>
</template>

<script>
import GoodsItem from "@/views/category/goods-item.vue";
import { computed, ref, inject } from "vue";
import { findHotGoods } from "@/api/product";
export default {
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
  components: { GoodsItem },
  setup(props) {
    const titleObj = { 1: "24小时热销榜", 2: "周热销榜", 3: "总热销榜" };
    const title = computed(() => {
      return titleObj[props.type];
    });
    // 接收父组件共享的商品数据
    const goods = inject("goods");
    const goodsList = ref([]);
    findHotGoods({ id: goods.id, type: props.type }).then((res) => {
      goodsList.value = res.result;
    });
    return { title, goodsList };
  },
};
</script>

<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .good-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>