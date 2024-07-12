<template>
  <!-- 首页公共面板：大标题、副标题、右侧区域、底部主体区域 -->
  <div class="home-panel">
    <div class="head">
      <h3>
        {{ title }}<small>{{ subTitle }}</small>
      </h3>
      <slot name="right"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="less">
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      margin-left: 6px;
      font-weight: normal;
      height: 35px;
      line-height: 35px;
      small {
        color: #999;
        font-size: 16px;
        margin-left: 20px;
      }
    }
  }
}
</style>