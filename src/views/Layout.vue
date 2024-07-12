<template>
    <appTopnav></appTopnav>
    <appHeader></appHeader>
    <appHeaderSticky></appHeaderSticky>
    <main>
      <!-- 二级路由 -->
      <router-view></router-view>
    </main>
    <appFooter></appFooter>
  </template>

<script>
import appTopnav from '@/components/app-topnav.vue';
import appHeader from '@/components/app-header.vue';
import appFooter from '@/components/app-footer.vue';
import appHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex';

export default {
  name: 'xtx-layout',
  components:{ appTopnav,appHeader,appFooter,appHeaderSticky},
  setup(){
    const store = useStore()
    // 获取分类列表
    store.dispatch('category/getList')
  },
}
</script>

  <style scoped lang='less'></style>
