<template>
  <div class="category-sub">
    <subBread></subBread>
    <subFilter @filter-change="changeFilter"></subFilter>
    <div class="goods-list">
      <subSort @sort-change="changeSort"></subSort>
      <div class="body">
        <goodsItem
          v-for="good in goodsList"
          :key="good.id"
          :good="good"
        ></goodsItem>
      </div>
    </div>
    <XtxInfiniteLoading
      :loading="loading"
      :finished="finished"
      @infinite="getGoodsList"
    />
  </div>
</template>

<script>
import subBread from "./sub-bread.vue";
import subFilter from "./sub-filter.vue";
import subSort from "./sub-sort.vue";
import goodsItem from "./goods-item.vue";
import { findSubCategoryGoods } from "@/api/category";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  components: { subBread, subFilter, subSort, goodsItem },
  setup() {
    const route = useRoute();
    const goodsList = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20,
    };
    const getGoodsList = () => {
      loading.value = true;
      reqParams.categoryId = route.params.id;
      findSubCategoryGoods(reqParams).then((res) => {
        if (res.result.items && res.result.items.length) {
          goodsList.value.push(...res.result.items);
          reqParams.page++;
        } else {
          // 加载完毕
          finished.value = true;
        }
        loading.value = false;
      });
    };

    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && route.path === "/category/sub/" + newVal) {
          goodsList.value = [];
          reqParams = {
            page: 1,
            pageSize: 20,
          };
          finished.value = false;
        }
      }
    );

    // 筛选
    const changeFilter = (filterParams) => {
      reqParams = { ...reqParams, ...filterParams };
      reqParams.page = 1;
      goodsList.value = [];
      finished.value = false;
    };
    // 排序
    const changeSort = (sortParams) => {
      reqParams = { ...reqParams, ...sortParams };
      reqParams.page = 1;
      goodsList.value = [];
      finished.value = false;
    };
    return {
      finished,
      loading,
      goodsList,
      getGoodsList,
      changeFilter,
      changeSort,
    };
  },
};
</script>

<style scoped lang="less">
.category-sub {
  width: 1240px;
  margin: 0 auto;
  .goods-list {
    background-color: #fff;
    padding: 0 25px;
    margin-top: 25px;
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 5px;
      .good-item {
        margin-right: 20px;
        margin-bottom: 20px;
        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>