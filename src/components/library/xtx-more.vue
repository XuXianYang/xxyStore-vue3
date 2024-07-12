<template>
  <!-- 全局组件：查看全部 -->
  <RouterLink :to="path" class="xtx-more">
    <span>查看全部</span>
    <i class="iconfont icon-angle-right"></i>
  </RouterLink>
</template>

<script>
export default {
  name: "XtxMore",
  props: {
    path: {
      type: String,
      default: "/",
    },
  },
};
</script>

<style scoped lang="less">
.xtx-more {
  margin-bottom: 2px;
  a {
    span {
      font-size: 16px;
      color: #999;
      margin-right: 4px;
      vertical-align: middle;
    }
    .iconfont {
      font-size: 14px;
      color: #ccc;
      position: relative;
      top: 2px;
      vertical-align: middle;
    }
  }
  &:hover {
    color: @xtxColor;
  }
}
</style>