<template>
  <div class="detail-logistics" v-if="logistics">
    <p>
      <span>{{logistics.list[0].time}}</span>
      <span>{{logistics.list[0].text}}</span>
    </p>
    <a href="javascript:;" @click="onOrderLogistics(order)">查看物流</a>
    <Teleport to="#dailog">
      <OrderLogistics ref="orderLogistics"/>
    </Teleport>
  </div>
</template>

<script>
import { ref } from "vue";
import { logisticsOrder } from "@/api/order";
import OrderLogistics from "@/views/order/order-logistics.vue";
import {useOrderLogistics } from "./index"
export default {
  components: { OrderLogistics },
  props: {
    order: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    const logistics = ref(null);
    // 获取物流列表信息
    logisticsOrder(props.order.id)
      .then((res) => {
        logistics.value = res.result;
        console.log("物流信息：", res);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    return { logistics, ...useOrderLogistics() };
  },
};
</script>

<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>