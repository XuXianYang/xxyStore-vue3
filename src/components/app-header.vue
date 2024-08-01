<template>
  <!-- 公共模块：导航栏组件 -->
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/"></RouterLink>
      </h1>
      <div class="navs">
        <appHeaderNav></appHeaderNav>
        <div class="search">
          <i class="iconfont icon-search"></i>
          <input type="text" placeholder="搜一搜" />
        </div>
        <appHeaderCart></appHeaderCart>
      </div>
    </div>
  </header>
</template>

<script>
import appHeaderNav from '@/components/app-header-nav.vue';
import appHeaderCart from "@/components/app-header-cart.vue"
export default {
  components:{appHeaderNav,appHeaderCart},
};
</script>

<style scoped lang="less">
.app-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
    .logo {
      width: 200px;
      a {
        display: block;
        height: 132px;
        width: 100%;
        text-indent: -9999px;
        background: url(../assets/images/logo.png) no-repeat center 18px /
          contain;
      }
    }
    .navs {
      width: 820px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 40px;
      
      .search {
        width: 170px;
        height: 32px;
        position: relative;
        border-bottom: 1px solid #e7e7e7;
        line-height: 32px;
        background-color: #fff;
        .icon-search {
          font-size: 18px;
          position: absolute;
          left: 10px;
          top: 0;
        }
        input {
          width: 140px;
          padding-left: 5px;
          margin-left: 30px;
          color: #666;
          height: 30px;
        }
      }
    }
  }
}
</style>