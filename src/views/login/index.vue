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