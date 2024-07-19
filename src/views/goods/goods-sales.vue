<template>
  <!-- 商品销售属性组件 -->
  <ul class="goods-sales">
    <li class="item">
      <p class="name">销量人气</p>
      <p class="count">200+</p>
      <p class="tag"><i class="iconfont icon-task-filling"></i>销量人气</p>
    </li>
    <li class="item">
      <p class="name">商品评价</p>
      <p class="count">400+</p>
      <p class="tag"><i class="iconfont icon-task-filling"></i>查看评价</p>
    </li>
    <li class="item">
      <p class="name">收藏人气</p>
      <p class="count">600+</p>
      <p class="tag"><i class="iconfont icon-task-filling"></i>收藏商品</p>
    </li>
    <li class="item">
      <p class="name">品牌信息</p>
      <p class="count">苏宁电器</p>
      <p class="tag"><i class="iconfont icon-task-filling"></i>品牌主页</p>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.goods-sales {
  display: flex;
  justify-content: space-evenly;
  width: 400px;
  align-items: center;
  text-align: center;
  height: 140px;
  li {
    flex: 1;
    position: relative;
    ~ li::after {
      position: absolute;
      top: 10px;
      left: 0;
      height: 60px;
      border-left: 1px solid #e4e4e4;
      content: "";
    }
    .name {
      color: #999;
    }
    .count {
      color: @priceColor;
      margin-top: 10px;
    }
    .tag {
      color: #666;
      margin-top: 10px;
      i {
        color: @xtxColor;
        font-size: 14px;
        margin-right: 2px;
      }
      &:hover {
        color: @xtxColor;
        cursor: pointer;
      }
    }
  }
}
</style>