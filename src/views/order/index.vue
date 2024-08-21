<template>
  <div class="member-order-page">
    <XtxTabs v-model="activeName" @tab-click="clickTab">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      >
      </XtxTabsPanel>
    </XtxTabs>
    <div class="order-list" v-if="orderList">
      <OrderItem
        v-for="item in orderList"
        :key="item.id"
        :order="item"
        @on-cancel-order="onCancelOrder"
        @deleteOrder="deleteOrder"
        @on-confirm-order="onConfirmOrder"
        @on-order-logistics="onOrderLogistics"
      ></OrderItem>
    </div>
    <div v-if="loading" class="loading"></div>
    <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
    <XtxPagination
      v-if="requestParams.pageSize < total"
      :pages="pages"
      @changePage="changePage"
    ></XtxPagination>
    <Teleport to="#dailog">
      <OrderCancel ref="orderCancelCom"></OrderCancel>
    </Teleport>
    <Teleport to="#dailog">
      <OrderLogistics ref="orderLogistics"></OrderLogistics>
    </Teleport>
  </div>
</template>
<script>
import { ref, reactive, watch } from "vue";
import { orderStatus } from "@/api/constants";
import { findOrderList, delteOrder, confirmOrder } from "@/api/order";
import OrderItem from "@/views/order/order-item.vue";
import OrderCancel from "@/views/order/order-cancel.vue";
import OrderLogistics from "@/views/order/order-logistics.vue"
import Confirm from "@/components/library/Confirm";
import Message from "@/components/library/Message";

export default {
  name: "MemberOrder",
  components: { OrderItem, OrderCancel,OrderLogistics },
  setup() {
    const activeName = ref("all");
    const clickTab = (item) => {
      console.log(item);
      requestParams.orderState = item.index;
      requestParams.page = 1;
    };

    // 查询订单参数
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0,
    });
    const orderList = ref([]);
    const loading = ref(false);
    const total = ref(0);
    const pages = ref(0);

    const getOrderList = () => {
      loading.value = true;
      findOrderList(requestParams).then((res) => {
        orderList.value = res.result.items;
        total.value = res.result.counts;
        pages.value = res.result.pages;
        loading.value = false;
      });
    };

    watch(
      requestParams,
      () => {
        getOrderList();
      },
      { immediate: true }
    );
    // 切换页面
    const changePage = (page) => {
      requestParams.page = page;
    };

    // 删除订单
    const deleteOrder = (order) => {
      Confirm({ text: "确认删除该订单吗" })
        .then(() => {
          return delteOrder([order.id]);
        })
        .then((res) => {
          Message({ text: "订单删除成功", type: "success" });
          getOrderList();
        })
        .catch((err) => {
          Message({ text: "订单删除失败", type: "error" });
        });
    };

    // 确认收货
    const onConfirmOrder = (item) => {
      // item 就是你要确认收货的订单
      Confirm({ text: "您确认收到货吗？确认后货款将会打给卖家。" }).then(() => {
        confirmOrder(item.id).then(() => {
          Message({ text: "确认收货成功", type: "success" });
          // 确认收货后状态变成 待评价
          item.orderState = 4;
        });
      });
    };

    // 查看物流
    const orderLogistics = ref(null);
    const onOrderLogistics = order =>{
      console.log('查看物流',order);
      orderLogistics.value.open(order);
    }

    return {
      activeName,
      clickTab,
      orderStatus,
      orderList,
      loading,
      total,
      pages,
      changePage,
      requestParams,
      ...useCancelOrder(),
      deleteOrder,
      onConfirmOrder,
      onOrderLogistics,
      orderLogistics
    };
  },
};
// 封装逻辑-取消订单
const useCancelOrder = () => {
  const orderCancelCom = ref(null);
  const onCancelOrder = (item) => {
    // item 就是你要取消的订单
    orderCancelCom.value.open(item);
  };
  return { onCancelOrder, orderCancelCom };
};
</script>
<style scoped lang="less">
.order-list {
  background-color: #fff;
  padding: 20px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(@/assets/images/loading.gif)
    no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>