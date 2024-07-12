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
        <div class="cart">
          <a class="curr" href="#">
            <i class="iconfont icon-cart"></i><em>2</em>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import appHeaderNav from '@/components/app-header-nav.vue';

export default {
  components:{appHeaderNav},
};
</script>

<style scoped lang="less">
.app-header {
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
      justify-content: space-around;
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
      .cart {
        margin-left: 15px;
        width: 50px;
        .curr {
          height: 32px;
          line-height: 32px;
          text-align: center;
          position: relative;
          display: block;
          .icon-cart {
            font-size: 22px;
          }
          em {
            font-style: normal;
            position: absolute;
            left: -5px;
            top: -5px;
            padding: 1px 6px;
            line-height: 1;
            background: @helpColor;
            color: #fff;
            font-size: 12px;
            border-radius: 10px;
            font-family: Arial;
          }
        }
      }
    }
  }
}
</style>