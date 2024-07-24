<template>
  <div class="xtx-pagination" v-if="pages > 0">
    <!-- 当前页码是否是1禁用该按钮 -->
    <a
      href="javascript:;"
      :class="{ disabled: myCurrentPage <= 1 }"
      @click="changePage(myCurrentPage - 1)"
      >上一页</a
    >
    <!-- 当前页码是否是1显示该... -->
    <span v-if="pager.start > 1">...</span>
    <!-- 判断当前页面是几，决定几个按钮，选中状态 -->
    <a
      href="javascript:;"
      v-for="i in pager.btnArr"
      :key="i"
      :class="{ active: myCurrentPage === i }"
      @click="changePage(i)"
      >{{ i }}</a
    >
    <!-- 当前页码是否是总页码显示该... -->
    <span v-if="pager.end < pageCount">...</span>
    <!-- 当前页码是否是总页码禁用该按钮 -->
    <a
      href="javascript:;"
      :class="{ disabled: myCurrentPage >= pageCount }"
      @click="changePage(myCurrentPage + 1)"
      >下一页</a
    >
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
export default {
  name: "XtxPagination",
  props: {
    pages: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    // 当前第几页
    const myCurrentPage = ref(1);
    // 按钮个数
    const btnCount = 5;
    // 总页数
    const pageCount = ref(0);

    // 监听传入的值改变
    watch(
      props,
      () => {
        console.log("总页数：", props.pages);
        pageCount.value = props.pages;
      },
      { immediate: true }
    );

    // 计算：起始页码，结束页码，按钮数组
    const pager = computed(() => {
      // 1、计算起始页码和结束页码，理想情况根据当前页码，和按钮个数可得到
      let start = myCurrentPage.value - Math.floor(btnCount / 2);
      let end = start + btnCount - 1;

      // 2、如果起始页码小于1了，需要重新计算
      if (start < 1) {
        start = 1;
        end =
          start + btnCount - 1 > pageCount.value
            ? pageCount.value
            : start + btnCount - 1;
      }

      // 3、如果结束页码大于总页数，需要重新计算
      if (end > pageCount.value) {
        end = pageCount.value;
        start = end - btnCount + 1 < 1 ? 1 : end - btnCount + 1;
      }

      // 处理完毕start和end得到按钮数组
      const btnArr = [];
      for (let i = start; i <= end; i++) {
        btnArr.push(i);
      }
      return { start, end, btnArr };
    });

    // 切换页码
    const changePage = (page) => {
      console.log("切换页码点击:", page);
      // 切换页码在正确范围时，才真正触发；点击当前页面，不触发   
      if (myCurrentPage.value !== page && page>=1 && page<=pageCount.value) {
        console.log("切换页码成功:", page);
        myCurrentPage.value = page;
        emit("changePage", myCurrentPage.value);
      }
    };
    return { pager, myCurrentPage, pageCount, changePage };
  },
};
</script>

<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding: 30px;
  a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  span {
    margin-right: 10px;
  }
}
</style>