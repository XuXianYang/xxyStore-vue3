<template>
  <div class="sub-filter" v-if="filterData">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:;"
          :class="{ active: filterData.selectedBrand === brand.id }"
          v-for="brand in filterData.brands"
          :key="brand.id"
          @click="changeBrand(brand.id)"
          >{{ brand.name }}</a
        >
      </div>
    </div>
    <div
      class="item"
      v-for="properties in filterData.saleProperties"
      :key="properties.id"
    >
      <div class="head">{{ properties.name }}：</div>
      <div class="body">
        <a
          href="javascript:;"
          :class="{ active: properties.selectedProp === prop.id }"
          v-for="prop in properties.properties"
          :key="prop.id"
          @click="changeAttr(properties,prop.id)"
          >{{ prop.name }}</a
        >
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>

<script>
import { findSubCategoryFilter } from "@/api/category";
import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";
export default {
  setup(props, { emit }) {
    const route = useRoute();
    const filterData = ref(null);
    const filterLoading = ref(false);
    // 监听路由对象参数，获取筛选数据
    watch(
      () => route.params.id,
      (newValue, oldValue) => {
        if (route.path === "/category/sub/" + newValue) {
          filterLoading.value = true;
          newValue &&
            findSubCategoryFilter(route.params.id).then((res) => {
              const result = res.result;
              // 品牌全部
              result.selectedBrand = null;
              result.brands.unshift({ id: null, name: "全部" });
              // 销售属性全部
              result.saleProperties.forEach((p) => {
                p.selectedProp = null;
                p.properties.unshift({ id: null, name: "全部" });
              });
              filterData.value = result;
              filterLoading.value = false;
            });
        }
      },
      { immediate: true }
    );

    // 获取筛选后的参数
    const getFilterData = () => {
      const params = {};
      const attr = [];
      params.brandId = filterData.value.selectedBrand;
      filterData.value.saleProperties.forEach((item) => {
        const properties = item.properties.find(
          (attrItem) => attrItem.id === item.selectedProp
        );
        if (properties && properties.id !== undefined) {
          attr.push({ groupName: item.name, propertyName: properties.name });
        }
      });
      if (attr && attr.length) {
        params.attr = attr;
      }
      return params;
    };

    // 选择品牌
    const changeBrand = (brandId) => {
      if (brandId === filterData.value.selectedBrand) return;
      filterData.value.selectedBrand = brandId;
      emit("filter-change", getFilterData());
    };
    // 选中属性
    const changeAttr = (p, attrId) => {
      if (p.selectedProp === attrId) return;
      p.selectedProp = attrId;
      emit("filter-change", getFilterData());
    };
    return { filterData, filterLoading, changeBrand ,changeAttr };
  },
};
</script>

<style scoped lang="less">
.sub-filter {
  background-color: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
  .xtx-skeleton {
    padding: 10px 0;
  }
}
</style>