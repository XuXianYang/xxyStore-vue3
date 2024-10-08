<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>填写订单</XtxBreadItem>
      </XtxBread>
      <div class="wrapper" v-if="checkoutInfo">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <checkoutAddress
            @change="changeAddress"
            :list="checkoutInfo.userAddresses"
          ></checkoutAddress>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in checkoutInfo.goods" :key="item.id">
                <td>
                  <a href="javascropt:;" class="info">
                    <img :src="item.picture" alt="" />
                    <div class="right">
                      <p>{{ item.name }}</p>
                      <p>{{ item.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ item.payPrice }}</td>
                <td>{{ item.count }}</td>
                <td>&yen;{{ item.totalPrice }}</td>
                <td>&yen;{{ item.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;"
            >不限送货时间：周一至周日</a
          >
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color: #999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkoutInfo.summary.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkoutInfo.summary.totalPrice }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkoutInfo.summary.postFee }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">¥{{ checkoutInfo.summary.totalPayPrice }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <XtxButton type="primary" @click="submitOrder">提交订单</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkoutAddress from "@/views/pay/checkout-address.vue";
import {
  findCheckoutInfo,
  createOrder,
  findOrderRepurchase,
} from "@/api/order";
import { ref, reactive } from "vue";
import Message from "@/components/library/Message";
import { useRouter, useRoute } from "vue-router";

export default {
  components: { checkoutAddress },
  setup() {
    const checkoutInfo = ref(null);
    const route = useRoute();
    if (route.query.orderId) {
      findOrderRepurchase(route.query.orderId).then((res) => {
        console.log("再次购买结算信息", res);
        checkoutInfo.value = res.result;
        requestParams.goods = checkoutInfo.value.goods.map((item) => {
          return { skuId: item.skuId, count: item.count };
        });
      });
    } else {
      // 获取结算商品信息
      findCheckoutInfo().then((res) => {
        console.log("结算商品信息：", res);
        checkoutInfo.value = res.result;
        requestParams.goods = checkoutInfo.value.goods.map((item) => {
          return { skuId: item.skuId, count: item.count };
        });
      });
    }

    // 结算提交的字段
    const requestParams = reactive({
      addressId: null,
      deliveryTimeType: 1,
      payType: 1,
      buyerMessage: "",
      goods: [],
    });

    // 切换地址回调
    const changeAddress = (id) => {
      console.log("切换地址：", id);
      requestParams.addressId = id;
    };

    // 提交订单
    const router = useRouter();
    const submitOrder = () => {
      if (!requestParams.addressId) return Message({ text: "请选择收货地址" });
      createOrder(requestParams)
        .then((res) => {
          router.push({ path: "/pay", query: { id: res.result.id } });
          Message({ text: "订单提交成功", type: "success" });
        })
        .catch((e) => {
          Message({ text: e.response.data.msg, type: "error" });
        });
    };
    return { checkoutInfo, changeAddress, submitOrder };
  },
};
</script>

<style scoped lang="less">
.xtx-pay-checkout-page {
  .wrapper {
    background-color: #fff;
    padding: 0 20px;
    .box-title {
      font-weight: normal;
      font-size: 16px;
      line-height: 70px;
      padding-left: 10px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
      .goods {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        .info {
          display: flex;
          text-align: left;
          img {
            width: 70px;
            height: 70px;
            margin-right: 20px;
          }
          .right {
            line-height: 24px;
            p:last-child {
              color: #999;
            }
          }
        }
        tr {
          th {
            background: #f5f5f5;
            font-weight: normal;
          }
          td,
          th {
            text-align: center;
            padding: 20px;
            border-bottom: 1px solid #f5f5f5;
            &:first-child {
              border-left: 1px solid #f5f5f5;
            }
            &:last-child {
              border-right: 1px solid #f5f5f5;
            }
          }
        }
      }
      .my-btn {
        width: 228px;
        height: 50px;
        border: 1px solid #e4e4e4;
        line-height: 48px;
        text-align: center;
        color: #666;
        margin-right: 25px;
        display: inline-block;
        &.active,
        &:hover {
          border-color: @xtxColor;
        }
      }
      .total {
        dl {
          display: flex;
          justify-content: flex-end;
          line-height: 50px;
          dt {
            i {
              display: inline-block;
              width: 2em;
            }
          }
          dd {
            width: 240px;
            text-align: right;
            padding-right: 70px;
            &.price {
              font-size: 20px;
              color: @priceColor;
            }
          }
        }
      }
    }
    .submit {
      text-align: right;
      padding: 60px;
      border-top: 1px solid #f5f5f5;
    }
  }
}
</style>