<template>
  <div class="home-page">
    <div class="home-entry">
      <div class="container">
        <!-- banner、左侧分类、新鲜好物、人气推荐、热门品牌、产品区域、最新专题 -->
        <homeBanner></homeBanner>
        <homeCategoryVue></homeCategoryVue>
        <home-new></home-new>
        <homeHot></homeHot>
        <homeBrand></homeBrand>
        <homeProduct></homeProduct>
        <homeSpecial></homeSpecial>
      </div>
    </div>
  </div>
</template>

<script>
import homeCategoryVue from "@/views/home/home-category.vue";
import homeBanner from "@/views/home/home-banner.vue"
import homeNew from "@/views/home/home-new.vue"
import homeHot from "@/views/home/home-hot.vue"
import homeBrand from "@/views/home/home-brand.vue"
import homeProduct from "@/views/home/home-product.vue"
import homeSpecial from "@/views/home/home-special.vue"
export default {
  name: "xtx-home-page",
  components: { homeCategoryVue,homeBanner,homeNew,homeHot,homeBrand,homeProduct,homeSpecial },
};
</script>
<style scoped lang='less'>
.home-page {
  min-height: 1200px;
  width: 1240px;
  margin: 0 auto;
}
</style>
