<template>
  <div class="login-callback">
    <loginHeader>联合登录</loginHeader>
    <section class="login-section" v-if="isBind">
      <div class="unbind">
        <div class="loading"></div>
      </div>
    </section>
    <section class="login-section" v-else>
      <div class="wrapper">
        <nav>
          <a
            href="javascript:;"
            :class="{ active: hasAccount === true }"
            @click="hasAccount = true"
          >
            <i class="iconfont icon-bind"></i>
            <span>已有小兔鲜账号，请绑定手机</span>
          </a>
          <a
            href="javascript:;"
            :class="{ active: hasAccount === false }"
            @click="hasAccount = false"
          >
            <i class="iconfont icon-edit" />
            <span>没有小兔鲜账号，请完善资料</span>
          </a>
        </nav>
        <div class="tab-content" v-if="hasAccount">
          <callbackBind :unionId="unionId"></callbackBind>
        </div>
        <div class="tab-content" v-else>
          <callbackPatch :unionId="unionId"></callbackPatch>
        </div>
      </div>
    </section>
    <loginFooter></loginFooter>
  </div>
</template>

<script>
import loginFooter from "./login-footer.vue";
import loginHeader from "./login-header.vue";
import callbackBind from "./callback-bind.vue";
import callbackPatch from "./callback-patch.vue";
import { ref } from "vue";
import QC from "qc";
import { userQQLogin } from "@/api/user";
import Message from "@/components/library/Message";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: { loginHeader, loginFooter, callbackBind, callbackPatch },
  setup() {
    const hasAccount = ref(false);
    const isBind = ref(true);
    const store = useStore();
    const router = useRouter();
    const unionId = ref(null);

    if (QC.Login.check()) {
      // 检查QQ是否登录
      QC.Login.getMe((openId) => {
        unionId.value = openId;
        userQQLogin(openId)
          .then((data) => {
            console.log("QQ登录结果：", data);

            const { id, account, avatar, mobile, nickname, token } =
              data.result;
            store.commit("user/setUser", {
              id,
              account,
              avatar,
              mobile,
              nickname,
              token,
            });
            store.dispatch("cart/mergeLocalCart").then(() => {
              // 跳转到来源页或者首页
              router.push(store.state.user.redirectUrl);
              Message({ type: "success", text: "QQ登录成功" });
            });
          })
          .catch((e) => {
            Message({ type: "error", text: e.msg });
            console.log("QQ登录失败：", e);
            isBind.value = false;
          });
      });
    }

    return { hasAccount, isBind, unionId };
  },
};
</script>

<style scopde lang="less">
.login-callback {
  background: #f4f4f4;
  .login-section {
    background-color: #fff;
    padding: 40px 50px;
    margin: 20px auto;
    width: 1240px;
    text-align: center;
    position: relative;
    min-height: 600px;
    .unbind {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 25px 0;
      z-index: 99;
      .loading {
        height: 100%;
        background: #fff url(../../assets/images/load.gif) no-repeat center /
          100px 100px;
      }
    }
    .wrapper {
      nav {
        margin: 0 auto;
        width: 700px;
        display: flex;
        height: 40px;
        a {
          text-align: center;
          display: inline-block;
          width: 350px;
          height: 40px;
          line-height: 40px;
          border-bottom: 2px solid #ccc;
          color: #666;
          i {
            font-size: 22px;
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
            margin-left: 4px;
          }
          &.active {
            color: @xtxColor;
            border-color: @xtxColor;
          }
        }
      }
      .tab-content {
        min-height: 600px;
        background: #fff;
      }
    }
  }
}
</style>