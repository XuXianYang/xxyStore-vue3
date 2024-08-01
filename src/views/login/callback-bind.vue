<template>
  <Form
    class="xtx-form"
    ref="formCom"
    :validation-schema="scheam"
    v-slot="{ errors }"
    autocomplete="off"
  >
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
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
          placeholder="绑定的手机号"
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
          placeholder="短信验证码"
        />
        <span class="code" @click="sendCode">{{
          time === 0 ? "发送验证码" : `${time}秒后发送`
        }}</span>
      </div>
      <div class="error" v-if="errors.code">{{ errors.code }}</div>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即绑定</a>
  </Form>
</template>

<script>
import QC from "qc";
import { ref, reactive, watch, onUnmounted } from "vue";
import { Form, Field } from "vee-validate";
import schema from "@/utils/vee-validate-schema";
import Message from "@/components/library/Message";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useIntervalFn } from "@vueuse/core";
import { userQQBindCode, userQQBindLogin } from "@/api/user";

export default {
  components: { Form, Field },
  props: {
    unionId: {
      type: String,
    },
  },
  setup(props) {
    const nickname = ref("null");
    const avatar = ref("null");
    // 获取QQ用户信息
    if (QC.Login.check()) {
      QC.api("get_user_info").success((res) => {
        console.log("QQ用户信息：", res);
        avatar.value = res.data.figureurl_1;
        nickname.value = res.data.nickname;
      });
    }

    // 表单数据对象
    const form = reactive({
      mobile: null,
      code: null,
    });
    // 校验规则对象
    const mySchema = {
      mobile: schema.mobile,
      code: schema.code,
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
          userQQBindCode(form.mobile)
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
        userQQBindLogin({
          unionId: props.unionId,
          mobile: form.mobile,
          code: form.code,
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
            store.dispatch("cart/mergeLocalCart").then(() => {
              // 2. 跳转到来源页或者首页
              router.push(store.state.user.redirectUrl);
              // 3. 成功提示
              Message({ type: "success", text: "QQ绑定成功" });
            });
          })
          .catch((err) => {
            console.log("登录失败", err);
            Message({ type: "error", text: err.response.data.msg });
          });
      }
    };

    return {
      nickname,
      avatar,
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

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto 25px;
  background: #f2f2f2;
  align-items: center;
  display: flex;
  padding: 0 10px;
  img {
    width: 50px;
    height: 50px;
    background: #f2f2f2;
  }
  p {
    text-align: left;
    padding-left: 10px;
  }
}
</style>