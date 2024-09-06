<template>
  <div class="order-detail-page" v-if="order">
    <DetailAction :order="order"></DetailAction>
    <DetailSteps :order="order"></DetailSteps>
    <DetailLogistics :order="order"></DetailLogistics>
    <DetailOrderInfo :order="order"></DetailOrderInfo>
  </div>
</template>

<script>
import DetailAction from "@/views/order/detail-action.vue"
import DetailSteps from "@/views/order/detail-steps.vue"
import DetailLogistics from "@/views/order/detail-logistics.vue"
import DetailOrderInfo from "@/views/order/detail-orderinfo.vue"
import { findOrder } from "@/api/order";
import { ref } from "vue";
import { useRoute} from "vue-router"

export default {
  name: 'OrderDetailPage',
  components:{DetailAction,DetailSteps,DetailLogistics,DetailOrderInfo },
 
  setup(){
    const order = ref(null)
    const route = useRoute()
    findOrder(route.params.id).then(res=>{
      console.log("订单详情：",res);
      order.value = res.result
    })

    return { order }
  }
}
</script>

<style scoped lang="less">
.order-detail-page {
  background-color: #fff;
}
</style>