<template>
  <!-- 公共模块：顶部区域 -->
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <a href="javascript:;" @click="$router.push('/member')"
              ><i class="iconfont icon-user"></i>{{ profile.account }}</a
            >
          </li>
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li>
            <a href="javascript:;" @click="$router.push('/login')">请先登录</a>
          </li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;" @click="$router.push('/member/order')">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "apptopnav",
  setup() {
    const store = useStore();
    const profile = computed(() => {
      return store.state.user.profile;
    });
    const router = useRouter();
    const logout = () => {
      store.commit("user/setUser", {});
      // 清空购物车
      store.commit("cart/setList", []);
      router.push("/login");
    };
    return { profile, logout };
  },
};
</script>

<style scoped lang="less">
.app-topnav {
  background-color: #333;
  .container {
    ul {
      display: flex;
      height: 53px;
      justify-content: flex-end;
      align-items: center;
      li {
        a {
          padding: 0 15px;
          color: #cdcdcd;
          line-height: 1;
          display: inline-block;
          i {
            font-size: 14px;
            margin-right: 2px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
        // 波浪号选择器：选择li元素后面的所有兄弟元素li
        ~ li {
          a {
            border-left: 2px solid #666;
          }
        }
      }
    }
  }
}
</style>