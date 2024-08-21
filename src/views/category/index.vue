<template>
  <div class="category-index">
    <!-- 面包屑 -->
    <XtxBread>
      <xtx-bread-item to="/">首页</xtx-bread-item>
      <!-- 加transition和name属性，以及加上key属性关联ID才会创建和移除 -->
      <!-- 不同的key可以创建移除元素，创造触发动画条件。 -->
      <transition name="fade-right" mode="out-in">
        <xtx-bread-item :key="categoryObj.id">{{ categoryObj.name }}</xtx-bread-item>
      </transition>
    </XtxBread>
    <!-- banner -->
    <XtxCarousel class="banner" :bannerList="bannerList"></XtxCarousel>
    <!-- 所有分类 -->
    <div class="sub-list">
      <h3>全部分类</h3>
      <ul class="topList" v-if="categoryObj.children">
        <li v-for="category in categoryObj.children" :key="category.id">
          <a @click="$router.push(`/category/sub/${category.id}`)">
            <img :src="category.picture" alt="" />
            <p>{{ category.name }}</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="ref-goods" v-for="goods in categoryList" :key="goods.id">
      <div class="head">
        <h3>- {{ goods.name }} -</h3>
        <p class="tag">{{ goods.saleProperties }}</p>
        <XtxMore />
      </div>
      <div class="body" v-if="goods.goods">
        <goodsItem v-for="good in goods.goods" :key="good.id" :good="good" />
      </div>
    </div>
  </div>
</template>

<script>
import { findBanner } from "@/api/home";
import { findTopCategory } from "@/api/category";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import goodsItem from "./goods-item.vue";

export default {
  components: { goodsItem },
  setup() {
    const bannerList = ref([]);
    const route = useRoute();
    const store = useStore();
    // 获取banner数据列表
    findBanner()
      .then((res) => {
        bannerList.value = res.result;
      })
      .catch((err) => {});

    // 获取当前分类信息
    const categoryObj = computed(() => {
      let cate = {};
      const item = store.state.category.list.find(
        (item) => item.id === route.params.id
      );
      if (item) cate = item;
      return cate;
    });

    const categoryList = ref([]);
    // 获取顶部分类详细列表
    const getSubList = () => {
      findTopCategory(route.params.id).then((data) => {
        categoryList.value = data.result.children;
      });
    };
    watch(
      () => route.params.id,
      (newVal) => {
        // 切换到二级类目路由的时候也有ID，也触发了watch导致发送了请求，需要处理
        if(newVal &&route.path === `/category/${newVal}`){
          getSubList();
        }
      },
      { immediate: true }
    );

    return { bannerList, categoryObj, categoryList };
  },
};
</script>

<style scoped lang="less">
.category-index {
  width: 1240px;
  margin: 0 auto;
  .banner {
    height: 500px;
    :v-deep .carousel-btn.prev {
      left: 20px;
    }
  }
  h3 {
    text-align: center;
    font-size: 28px;
    color: #666;
    font-weight: normal;
    line-height: 100px;
  }
  .sub-list {
    background-color: #fff;
    margin-top: 20px;

    .topList {
      display: flex;
      padding: 0 32px;
      overflow: hidden;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>