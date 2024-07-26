<template>
  <Form
    class="xtx-form"
    ref="formCom"
    :validation-schema="scheam"
    v-slot="{ errors }"
    autocomplete="off"
  >
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field
          v-model="form.account"
          name="account"
          :class="{ err: errors.account }"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <div class="error" v-if="errors.account">{{ errors.account }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          v-model="form.mobile"
          name="mobile"
          :class="{ err: errors.mobile }"
          class="input"
          type="text"
          placeholder="请输入手机号"
        />
      </div>
      <div class="error" v-if="errors.mobile">{{ errors.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          v-model="form.code"
          name="code"
          :class="{ err: errors.code }"
          class="input"
          type="text"
          placeholder="请输入验证码"
        />
        <span class="code" @click="sendCode">发送验证码</span>
      </div>
      <div class="error" v-if="errors.code">{{ errors.code }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          v-model="form.password"
          name="password"
          :class="{ err: errors.password }"
          class="input"
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <div class="error" v-if="errors.password">{{ errors.password }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          v-model="form.rePassword"
          name="rePassword"
          :class="{ err: errors.rePassword }"
          class="input"
          type="password"
          placeholder="请确认密码"
        />
      </div>
      <div class="error" v-if="errors.rePassword">{{ errors.rePassword }}</div>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即提交</a>
  </Form>
</template>

<script>
import { ref, reactive, onUnmounted } from "vue";
import { Form, Field } from "vee-validate";
import schema from "@/utils/vee-validate-schema";
import Message from "@/components/library/Message";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useIntervalFn } from "@vueuse/core";
import { userQQPatchCode, userQQPatchLogin } from "@/api/user";

export default {
  components: { Form, Field },
  props: {
    unionId: {
      type: String,
    },
  },
  setup(props) {
    // 表单数据对象
    const form = reactive({
      account: null,
      mobile: null,
      code: null,
      password: null,
      rePassword: null,
    });
    // 校验规则对象
    const mySchema = {
      account: schema.accountApi,
      mobile: schema.mobile,
      code: schema.code,
      password: schema.password,
      rePassword: schema.rePassword,
    };

    // 表单元素对象
    const formCom = ref(null);

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
          userQQPatchCode(form.mobile)
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

    const store = useStore();
    const router = useRouter();

    const submit = async () => {
      const valid = await formCom.value.validate();
      if (valid) {
        userQQPatchLogin({
          unionId: props.unionId,
          ...form,
        })
          .then((data) => {
            console.log("登录结果", res);
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
            // 2. 跳转到来源页或者首页
            router.push(store.state.user.redirectUrl);
            // 3. 成功提示
            Message({ type: "success", text: "QQ绑定成功" });
          })
          .catch((err) => {
            console.log("登录失败", err);
            Message({ type: "error", text: err.response.data.msg });
          });
      }
    };

    return {
      form,
      scheam: mySchema,
      formCom,
      sendCode,
      submit,
      time,
    };
  },
};
</script>

<style>
</style>