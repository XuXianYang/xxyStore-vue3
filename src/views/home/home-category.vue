<template>
  <!-- 首页左侧分类组件 -->
  <div class="home-category" @mouseleave="categoryId = null">
    <ul class="menu">
      <li
        v-for="item in menuList"
        :key="item.id"
        @mouseenter="categoryId = item.id"
        :class="{ active: categoryId === item.id }"
      >
        <RouterLink :to="`/category/${item.id}`" class="category">{{
          item.name
        }}</RouterLink>
        <template v-if="item.children">
          <RouterLink
            v-for="child in item.children"
            :key="child.id"
            :to="`/category/sub/${child.id}`"
            class="child"
          >
            {{ child.name }}
          </RouterLink>
        </template>
        <template v-else>
          <XtxSkeleton
            width="60px"
            height="18px"
            style="margin-right: 5px"
            bg="rgba(255,255,255,0.2)"
          />
          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </template>
      </li>
    </ul>
    <div class="layer">
      <h4>
        {{
          currCategory && currCategory.id === "brand" ? "品牌" : "分类"
        }}推荐<small>根据您的购买或浏览记录推荐</small>
      </h4>
      <ul v-if="currCategory && currCategory.goods">
        <li v-for="good in currCategory.goods" :key="good.id">
          <RouterLink :to="`/goods/${good.id}`">
            <img :src="good.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ good.name }}</p>
              <p class="desc ellipsis">{{ good.desc }}</p>
              <p class="price"><i>¥</i>{{ good.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <ul v-else-if="currCategory && currCategory.brands">
        <li class="brand" v-for="brand in currCategory.brands" :key="brand.id">
          <RouterLink to="/">
            <img :src="brand.picture" alt="" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ brand.place }}
              </p>
              <p class="name ellipsis-2">{{ brand.name }}</p>
              <p class="desc ellipsis">{{ brand.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { findBrand } from "@/api/home";

export default {
  setup() {
    // 新增一条数据
    const lastData = reactive({
      id: "brand",
      name: "品牌",
      children: [{ id: "brand-chilren", name: "品牌推荐" }],
      brands: [],
    });
    // 获取品牌数据
    findBrand()
      .then((res) => {
        const list = res.result.filter((item, index) => {
          if (index <= 5) return item;
        });
        lastData.brands = list;
      })
      .catch((err) => {});

    const store = useStore();
    // 从缓存中获取分类列表
    const menuList = computed(() => {
      const list = store.state.category.list.map((item) => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          goods: item.goods,
        };
      });
      list.push(lastData);
      return list;
    });

    // 当前鼠标经过的分类id和对象
    const categoryId = ref(null);
    const currCategory = computed(() => {
      return menuList.value.find((item) => item.id === categoryId.value);
    });
    return { menuList, categoryId, currCategory };
  },
};
</script>

<style scoped lang="less">
.home-category {
  height: 500px;
  width: 250px;
  background-color: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  &:hover {
    .layer {
      display: block;
    }
  }
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    position: absolute;
    left: 250px;
    top: 0;
    background: rgba(255, 255, 255, 0.8);
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background-color: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
      li.brand {
        height: 180px;
        margin-bottom: 30px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 10px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
}
// 骨架动画
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>