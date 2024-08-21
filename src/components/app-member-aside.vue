<template>
  <div class="xtx-member-aside">
    <div class="user-manage">
      <h4>我的账户</h4>
      <div class="links">
        <RouterLink to="/member" exact-active-class="active">个人中心</RouterLink>
        <a href="javascript:;">消息通知</a>
        <a href="javascript:;">个人信息</a>
        <a href="javascript:;">安全设置</a>
        <a href="javascript:;">地址管理</a>
        <a href="javascript:;">我的积分</a>
        <a href="javascript:;">我的足迹</a>
        <a href="javascript:;">邀请有礼</a>
        <a href="javascript:;">幸运抽奖</a>
      </div>
      <h4>交易管理</h4>
      <div class="links">
        <RouterLink to="/member/order" active-class="active">我的订单</RouterLink>
        <a href="javascript:;">优惠券</a>
        <a href="javascript:;">礼品卡</a>
        <a href="javascript:;">评价晒单</a>
        <a href="javascript:;">售后服务</a>
      </div>
      <h4>我的收藏</h4>
      <div class="links">
        <a href="javascript:;">收藏的商品</a>
        <a href="javascript:;">收藏的专题</a>
        <a href="javascript:;">关注的品牌</a>
      </div>
      <h4>帮助中心</h4>
      <div class="links">
        <a href="javascript:;">帮助中心</a>
        <a href="javascript:;">在线客服</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.xtx-member-aside {
  background-color: #fff;
  width: 220px;
  border-radius: 2px;
  .user-manage {
    h4 {
      border-top: 1px solid #f6f6f6;
      font-size: 18px;
      padding: 20px 52px 5px;
      font-weight: normal;
    }
    .links {
      padding: 0 52px 10px;
      a {
        display: block;
        line-height: 1;
        color: #666;
        position: relative;
        padding: 15px 0;
        &::before {
          content: "";
          display: none;
          position: absolute;
          width: 6px;
          height: 6px;
          left: -16px;
          top: 19px;
          background-color: @xtxColor;
          border-radius: 3px;
        }
        &:hover {
          color: @xtxColor;
        }
        &.active {
          color: @xtxColor;

          &:before {
            display: block;
          }
        }
      }
    }
  }
}
</style>