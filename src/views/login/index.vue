<template>
  <div class="login">
    <loginHeader>欢迎登录</loginHeader>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a
            href="javascript:;"
            :class="{ active: activeIdx === 0 }"
            @click="activeIdx = 0"
            >账户登录</a
          >
          <a
            href="javascript:;"
            :class="{ active: activeIdx === 1 }"
            @click="activeIdx = 1"
            >扫码登录</a
          >
        </nav>
        <!-- 表单 -->
        <loginForm v-if="activeIdx === 0"></loginForm>
        <!-- 二维码 -->
        <div v-if="activeIdx === 1" class="qrcode-box">
          <img src="@/assets/images/qrcode.jpg" alt="" />
          <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
        </div>
      </div>
    </section>
    <loginFooter></loginFooter>
  </div>
</template>

<script>
import loginFooter from "./login-footer.vue";
import loginHeader from "./login-header.vue";
import loginForm from "./login-form.vue";
import { ref } from "vue";
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: "PageLogin",
  components: { loginHeader, loginForm, loginFooter },
  setup() {
    const activeIdx = ref(0);
    
    // 存储回跳地址
    const store = useStore()
    const route = useRoute()
    store.commit('user/setRedirectUrl', route.query.redirectUrl || '/')
    // {"user":{"profile":{"id":"1645822067746144258","account":"demo","avatar":"http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png","mobile":"12022222409","nickname":"test","token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJuYW1lXCI6XCJ0ZXN0XCIsXCJpZFwiOlwiMTY0NTgyMjA2Nzc0NjE0NDI1OFwiLFwidXNlcm5hbWVcIjpcImRlbW9cIn0iLCJpYXQiOjE3MjIyMTk1MzQsImV4cCI6MTcyMjQ3ODczNH0.GcWwN6IpaNY44ww18QrpRqnAtsi-FyMcESvX8t8gcLU"},"redirectUrl":"/"},"cart":{"list":[{"id":"3533018","skuId":"3741000","name":"潮州非遗手作茗家私享精品手拉壶","attrsText":"壶形:茗家私享水平壶（160ml） ","specs":[],"picture":"https://yanxuan-item.nosdn.127.net/8865182862477e4ebdfc07c6b3bc0d51.png","price":"1450.00","nowPrice":"1450.00","nowOriginalPrice":"1450.00","selected":true,"stock":2446,"count":1,"isEffective":true,"discount":null,"isCollect":false,"postFee":6}]}}

    return { activeIdx };
  },
};
</script>

<style scoped lang="less">
.login {
  background-color: #fff;
  .login-section {
    background: url("@/assets/images/login-bg.png") no-repeat center/cover;
    height: 488px;
    position: relative;
    .wrapper {
      background: #fff;
      position: absolute;
      width: 380px;
      min-height: 400px;
      top: 44px;
      left: 50%;
      transform: translate3d(100px, 0, 0);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
      nav {
        display: flex;
        height: 55px;
        border-bottom: 1px solid #f5f5f5;
        padding: 0 40px;
        text-align: right;
        align-items: center;
        a {
          flex: 1;
          line-height: 1;
          display: inline-block;
          font-size: 18px;
          position: relative;
          &:first-child {
            border-right: 1px solid #f5f5f5;
            text-align: left;
          }
          &.active {
            color: @xtxColor;
            font-weight: bold;
          }
        }
      }
      .qrcode-box {
        text-align: center;
        padding-top: 40px;
        p {
          margin-top: 20px;
          a {
            color: @xtxColor;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>