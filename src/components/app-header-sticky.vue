<template>
  <!-- 公共模块：固定悬浮导航栏 -->
  <div class="app-header-sticky" :class="{show:y>78}">
    <div class="container" v-show="y>78">
      <RouterLink class="logo" to="/"></RouterLink>
      <appHeaderNav></appHeaderNav>
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import appHeaderNav from "@/components/app-header-nav.vue";
// import { onMounted, ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'

export default {
  components: { appHeaderNav },
  setup(){
    // const y = ref(0)
    // onMounted(()=>{
    //     window.onscroll = ()=>{
    //         const scrollTop = document.documentElement.scrollTop
    //         y.value = scrollTop
    //     }
    // })
    // @vueuse/core提供的api可返回当前页面滚动时候蜷曲的距离。x横向，y纵向
    const { y } = useWindowScroll()
    return { y }
  },
};
</script>

<style lang="less" scoped>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
    .logo {
      width: 200px;
      height: 80px;
      background: url(../assets/images/logo.png) no-repeat right 2px;
      background-size: 160px auto;
    }
    .right {
      width: 220px;
      display: flex;
      text-align: center;
      padding-left: 40px;
      border-left: 2px solid @xtxColor;
      a {
        width: 38px;
        margin-right: 40px;
        font-size: 16px;
        line-height: 1;
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>