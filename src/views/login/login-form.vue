<template>
  <div class="login-form">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <!-- 三方表单组件 -->
    <!-- Form添加v-slot="{errors}"使用作用域插槽暴露errors错误对象-通过 errors['校验规则名称']取出错误信息，有则显示，无即隐藏 -->
    <Form
      class="form"
      ref="formCom"
      :validation-schema="scheam"
      v-slot="{ errors }"
    >
      <!-- 账号登录 -->
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <!-- Field添加name属性，作用是指定使用schema中哪个校验规则 -->
            <Field
              :class="{ error: errors.account }"
              v-model="form.account"
              name="account"
              type="text"
              placeholder="请输入用户名或手机号"
            />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              :class="{ error: errors.password }"
              v-model="form.password"
              name="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <!-- 短信登录 -->
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.mobile }"
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              :class="{ error: errors.code }"
              v-model="form.code"
              name="code"
              type="text"
              placeholder="请输入验证码"
            />
            <span class="code" @click="sendCode">{{
              time === 0 ? "发送验证码" : `${time}秒后发送`
            }}</span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!-- Field的as属性可以指定为其他标签，也可指定为组件。组件需要支持v-model否则校验不会触发 -->
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </Form>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
      >
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
        />
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { ref, reactive, watch, onUnmounted } from "vue";
import { Form, Field } from "vee-validate";
import schema from "@/utils/vee-validate-schema";
import {
  userAccountLogin,
  userMobileLogin,
  userMobileLoginMsg,
} from "@/api/user";
import Message from "@/components/library/Message";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useIntervalFn } from "@vueuse/core";

export default {
  components: { Form, Field },
  setup() {
    // 表单切换标识
    const isMsgLogin = ref(false);

    // 表单信息对象
    // 账号demo 密码hm#qd@23!
    const form = reactive({
      isAgree: true,
      account: "demo",
      password: "hm#qd@23!",
      mobile: null,
      code: null,
    });

    // 校验规则对象
    const mySchema = {
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree,
    };

    // 表单元素对象
    const formCom = ref(null);

    // 监听表单切换，清空表单
    watch(isMsgLogin, () => {
      // 切换表单，清空数据
      form.isAgree = true;
      form.account = "demo";
      form.password = "hm#qd@23!";
      form.mobile = null;
      form.code = null;
      // 补充校验效果清除，Form组件提供resetForm()
      formCom.value.resetForm();
    });

    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    // 登录按钮点击事件
    const login = async () => {
      // 表单主动校验
      const valid = await formCom.value.validate();
      if (valid) {
        let data = {};
        try {
          if (!isMsgLogin.value) {
            // 账号登录
            data = await userAccountLogin({
              account: form.account,
              password: form.password,
            });
          } else {
            // 验证码登录
            data = await userMobileLogin({
              mobile: form.mobile,
              code: form.code,
            });
          }
          console.log("登录返回用户信息：", data);
          const { id, account, avatar, mobile, nickname, token } = data.result;
          // 登录成功，存储用户信息
          store.commit("user/setUser", {
            id,
            account,
            avatar,
            mobile,
            nickname,
            token,
          });
          store.dispatch("cart/mergeLocalCart").then(() => {
            Message({ type: "success", text: "登录成功" });
            // 登录成功跳转首页
            router.push(route.query.redirectUrl || "/");
          });
        } catch (err) {
          if (err.response.data) {
            Message({ type: "error", text: err.response.data.msg });
            console.log("登录失败：", err.response.data);
          }
        }
      }
    };

    // useIntervalFn(回调函数,执行间隔,是否立即开启),pause 暂停 resume 开始
    const time = ref(0);
    const { pause, resume } = useIntervalFn(
      () => {
        time.value--;
        if (time.value <= 0) {
          pause();
        }
      },
      1000,
      false
    );
    onUnmounted(() => {
      pause();
    });

    // 发送短信验证码
    const sendCode = () => {
      const valid = mySchema.mobile(form.mobile);
      if (valid === true) {
        if (time.value <= 0) {
          userMobileLoginMsg(form.mobile)
            .then((res) => {
              Message({ type: "success", text: "发送成功" });
              time.value = 60;
              resume();
            })
            .catch((err) => {
              if (err.response.data) {
                Message({ type: "error", text: err.response.data.msg });
                console.log("获取验证码失败：", err.response.data);
              }
            });
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError("mobile", valid);
      }
    };
    return {
      isMsgLogin,
      form,
      scheam: mySchema,
      formCom,
      login,
      sendCode,
      time,
    };
  },
};
</script>
  
  <style scoped lang="less">
.login-form {
  background-color: #fff;
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    .form-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        i {
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          width: 34px;
          height: 34px;
          line-height: 34px;
          font-size: 18px;
          color: #fff;
          background-color: #cfcdcd;
        }
        input {
          padding-left: 44px;
          height: 36px;
          border: 1px solid #cfcdcd;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          top: 1px;
          right: 1px;
          width: 90px;
          display: inline-block;
          height: 34px;
          line-height: 34px;
          text-align: center;
          background-color: #f5f5f5;
          color: #666;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
      .agree {
        a {
          color: #069;
        }
      }
    }
    .btn {
      display: block;
      height: 40px;
      width: 100%;
      text-align: center;
      line-height: 40px;
      background-color: @xtxColor;
      color: #fff;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 28px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 15px;
      }
    }
  }
}
</style>