<template>
  <div class="detail-action">
    <div class="state">
      <span
        class="iconfont"
        :class="[`icon-order-${orderStatus[order.orderState].name}`]"
      ></span>
      <p>{{ orderStatus[order.orderState].label }}</p>
    </div>
    <div class="info">
      <p>订单编号：{{ order.id }}</p>
      <p>下单时间：{{ order.createTime }}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="order.orderState === 1">
        <XtxButton
          @click="$router.push(`/pay?id=${order.id}`)"
          type="primary"
          size="small"
          >立即付款</XtxButton
        >
        <XtxButton type="gray" size="small" @click="onCancelOrder(order)">取消订单</XtxButton>
      </template>
      <!-- 待发货 -->
      <template v-if="order.orderState === 2">
        <XtxButton type="primary" size="small" @click="$router.push(`/checkout?orderId=${order.id}`)">再次购买</XtxButton>
      </template>
      <!-- 待收货 -->
      <template v-if="order.orderState === 3">
        <XtxButton type="primary" size="small" @click="onConfirmOrder(order)">确认收货</XtxButton>
        <XtxButton type="plain" size="small" @click="$router.push(`/checkout?orderId=${order.id}`)">再次购买</XtxButton>
      </template>
      <!-- 待评价 -->
      <template v-if="order.orderState === 4">
        <XtxButton type="primary" size="small" @click="$router.push(`/checkout?orderId=${order.id}`)">再次购买</XtxButton>
        <XtxButton type="plain" size="small">评价商品</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已完成 -->
      <template v-if="order.orderState === 5">
        <XtxButton type="primary" size="small" @click="$router.push(`/checkout?orderId=${order.id}`)">再次购买</XtxButton>
        <XtxButton type="plain" size="small">查看评价</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <!-- 已取消 -->
    </div>
    <!-- 取消订单组件 -->
    <Teleport to="#dailog">
      <OrderCancel ref="orderCancelCom" />
    </Teleport>
  </div>
</template>

<script>
import { orderStatus } from "@/api/constants";
import OrderCancel from "./order-cancel";
import { useCancelOrder, useConfirmOrder } from "./index";
export default {
  components: { OrderCancel },
  props: {
    order: {
      type: Object,
    },
  },
  setup() {
    return { orderStatus ,...useCancelOrder(),...useConfirmOrder()};
  },
};
</script>

<style lang="less" scoped>
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-right: 30px;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    color: #999;
  }
  .btn {
    flex: 1;
    text-align: right;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>