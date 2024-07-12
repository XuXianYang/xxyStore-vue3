<template>
  <div class="category-index">
    分类一级菜单页面{{ $route.params.id }}
    <XtxBread>
      <xtx-bread-item to="/">首页</xtx-bread-item>
      <xtx-bread-item to="/category/sub/112345">居家</xtx-bread-item>
      <xtx-bread-item>收纳</xtx-bread-item>
    </XtxBread>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.category-index{
  width: 1240px;
  margin: 0 auto;
}

</style>