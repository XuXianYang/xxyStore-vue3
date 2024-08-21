<template>
  <XtxDialog title="取消订单" v-model:visible="dialogVisible">
    <div class="cancel-info">
      <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
      <p class="tip">请选择取消订单的原因（必选）：</p>
      <div class="btn">
        <a
          href="javascript:;"
          v-for="title in cancelReason"
          :key="title"
          @click="curText = title"
          :class="{ active: curText === title }"
        >
          {{ title }}
        </a>
      </div>
    </div>
    <template v-slot:footer>
      <XtxButton
        @click="dialogVisible = false"
        type="gray"
        style="margin-right: 20px"
        >取消</XtxButton
      >
      <XtxButton @click="submit" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { ref } from "vue";
import { cancelReason } from "@/api/constants";
import Message from "@/components/library/Message";
import { cancelOrder } from "@/api/order";

export default {
  setup() {
    const dialogVisible = ref(false);
    // 选中的取消原因
    const curText = ref("");
    const order = ref(null);

    // 显示弹框
    const open = (item) => {
      order.value = item;
      dialogVisible.value = true;
      curText.value = "";
    };

    const submit = () => {
      if (!curText.value) return Message({ text: "请选择取消订单的原因" });
      cancelOrder(order.value.id, curText.value)
        .then((res) => {
          console.log("取消订单：", res);
          Message({ text: "取消订单成功", type: "success" });
          // 更新订单状态
          order.value.orderState = 6;
          // 关闭对话框
          dialogVisible.value = false;
        })
        .catch((err) => {
          console.log("取消订单err：", err);
          Message({ text: "取消订单失败", type: "error" });
        });
    };

    return { dialogVisible, cancelReason, curText, open, submit };
  },
};
</script>

<style scoped lang="less">
.xtx-dialog ::v-deep .wrapper {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    display: flex;
    flex-wrap: wrap;
    padding-top: 21px;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>