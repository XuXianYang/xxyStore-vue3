<template>
  <div class="order-item">
    <div class="header">
      <span>下单时间：{{ order.createTime }}</span>
      <span>订单编号：{{ order.id }}</span>
      <span class="down-time" v-if="order.orderState === 1">
        <i class="iconfont icon-down-time"></i>
        <b>付款截止：{{ timeText }}</b>
      </span>
      <!-- 已完成 已取消 -->
      <a
        v-if="[5,6].includes(order.orderState)"
        class="del"
        href="javascript:;"
        @click="$emit('deleteOrder', order)"
        >删除</a
      >
    </div>
    <div class="body">
      <div class="column goods">
        <ul>
          <li v-for="goods in order.skus" :key="goods.id">
            <a class="image" href="javascript:;">
              <img :src="goods.image" alt="" />
            </a>
            <div class="info">
              <p class="name ellipsis-2">
                {{ goods.name }}
              </p>
              <p class="attr ellipsis">
                {{ goods.attrsText }}
              </p>
            </div>
            <div class="price">¥{{ goods.realPay }}</div>
            <div class="count">x{{ goods.quantity }}</div>
          </li>
        </ul>
      </div>
      <div class="column state">
        <p>{{ orderStatus[order.orderState].label }}</p>
        <p v-if="order.orderState === 3">
          <a @click="$emit('on-order-logistics', order)" href="javascript:;" class="green">查看物流</a>
        </p>
        <p v-if="order.orderState === 4">
          <a href="javascript:;" class="green">评价商品</a>
        </p>
        <p v-if="order.orderState === 5">
          <a href="javascript:;" class="green">查看评价</a>
        </p>
      </div>
      <div class="column amount">
        <p class="red">¥{{ order.payMoney }}</p>
        <p>（含运费：¥{{ order.postFee }}）</p>
        <p>在线支付</p>
      </div>
      <div class="column action">
        <XtxButton
          @click="$router.push(`/pay?id=${order.id}`)"
          v-if="order.orderState === 1"
          type="primary"
          size="small"
          >立即付款</XtxButton
        >
        <XtxButton @click="$emit('on-confirm-order', order)" v-if="order.orderState === 3" type="primary" size="small"
          >确认收货</XtxButton
        >
        <p>
          <a
            @click="$router.push(`/member/order/${order.id}`)"
            href="javascript:;"
            >查看详情</a
          >
        </p>
        <p v-if="order.orderState === 1">
          <a @click="$emit('on-cancel-order', order)" href="javascript:;"
            >取消订单</a
          >
        </p>
        <p v-if="[2, 3, 4, 5].includes(order.orderState)">
          <a @click="$router.push(`/checkout?orderId=${order.id}`)" href="javascript:;"
            >再次购买</a
          >
        </p>
        <p v-if="[4, 5].includes(order.orderState)">
          <a href="javascript:;">申请售后</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { orderStatus } from "@/api/constants";
import { ref } from "vue";
import { usePayTime } from "@/hooks";
export default {
  props: {
    order: {
      type: Object,
    },
  },
  setup(props) {
    const { start, timeText } = usePayTime();
    start(props.order.countdown);
    return { orderStatus, timeText };
  },
};
</script>

<style scoped lang="less">
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .header {
    padding: 0 20px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    height: 50px;
    .down-time {
      flex: 1;
      text-align: right;
      i {
        vertical-align: middle;
        margin-right: 3px;
      }
      b {
        vertical-align: middle;
        font-weight: normal;
      }
    }
    .del {
      flex: 1;
      text-align: right;
      color: #999;
    }
    span {
      &:first-child {
        margin-right: 20px;
      }
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      &:first-child {
        border-left: none;
      }
      > p {
        padding-top: 10px;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>