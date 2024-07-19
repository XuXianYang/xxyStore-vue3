<template>
  <RouterLink class="good-item" :to="`/goods/${good.id}`">
    <img :src="good.picture" alt="" />
    <p class="name ellipsis">{{ good.name }}</p>
    <p class="desc ellipsis">{{ good.desc }}</p>
    <p class="price">&yen;{{ good.price }}</p>
  </RouterLink>
</template>

<script>
export default {
  props: {
    good: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style scoped lang="less">
.good-item {
  display: block;
  text-align: center;
  width: 220px;
  padding: 20px 30px;
  .hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>