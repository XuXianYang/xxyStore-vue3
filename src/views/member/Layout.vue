<template>
  <!-- 个人中心外部容器 -->
  <div class="member">
    <AsideView></AsideView>
    <article class="article">
      <RouterView />
    </article>
  </div>
</template>

<script>
import AsideView from "@/components/app-member-aside.vue";
export default {
  components: { AsideView },
};
</script>

<style scoped lang="less">
.member {
  min-height: 800px;
  width: 1240px;
  margin: 20px auto 0;
  display: flex;
  .article {
    margin-left: 20px;
    width: 1000px;
  }
}
</style>