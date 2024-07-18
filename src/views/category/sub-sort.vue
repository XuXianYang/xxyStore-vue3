<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        href="javascript:;"
        :class="{ active: !sortParams.sortField }"
        @click="changeSort(null)"
      >
        默认排序
      </a>
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
      >
        最新商品
      </a>
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        >最高人气
      </a>
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        >评论最多
      </a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'asc',
          }"
        />
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'desc',
          }"
        />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox @change="changeCheck" v-model="sortParams.inventory"
        >仅显示有货商品</XtxCheckbox
      >
      <XtxCheckbox @change="changeCheck" v-model="sortParams.onlyDiscount"
        >仅显示特惠商品</XtxCheckbox
      >
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup(props, { emit }) {
    // 根据后台需要的参数定义数据对象
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: null, //publishTime,orderNum,price,evaluateNum
      sortMethod: null, //asc为正序 desc为倒序
    });
    const changeSort = (sortField) => {
      if (sortField === "price") {
        sortParams.sortField = sortField;
        // 第一次点击为空，默认设置为倒序
        if (!sortParams.sortMethod) {
          sortParams.sortMethod = "desc";
        } else {
          sortParams.sortMethod === "desc" ? "asc" : "desc";
        }
      } else {
        // 选中结果未改变，停止修改排序参数
        if (sortField === sortParams.sortField) return;
        sortParams.sortField = sortField;
        sortParams.sortMethod = null;
      }
      //   给父组件发送消息
      emit("sort-change", sortParams);
    };
    const changeCheck = () => {
      //   给父组件发送消息
      emit("sort-change", sortParams);
    };
    return { sortParams, changeSort, changeCheck };
  },
};
</script>

<style scoped lang="less">
.sub-sort {
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  .sort {
    display: flex;
    a {
      width: 150px;
      height: 30px;
      line-height: 28px;
      text-align: center;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      padding: 0 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background-color: @xtxColor;
        color: #fff;
        border-color: @xtxColor;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    line-height: 80px;
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>