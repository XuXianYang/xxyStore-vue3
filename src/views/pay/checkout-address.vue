<template>
  <div class="checkout-address">
    <div class="text">
      <div class="none" v-if="!showAddress">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-else>
        <li><span>收<i />货<i />人：</span>{{ showAddress.receiver }}</li>
        <li><span>联系方式：</span>{{ showAddress.contact }}</li>
        <li>
          <span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g, "") + showAddress.address}}
        </li>
      </ul>
      <a href="javascript:;" @click="openAddressEdit(showAddress)">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn" @click="openDialog()">切换地址</XtxButton>
      <XtxButton class="btn" @click="openAddressEdit()">添加地址</XtxButton>
    </div>
    <XtxDialog title="切换收货地址" v-model:visible="dialogVisible">
      <div
        class="text item"
        v-for="address in list"
        :key="address.id"
        :class="{
          active: selectedAddress && address.id === selectedAddress.id,
        }"
        @click="selectedAddress = address"
      >
        <ul>
          <li><span>收<i />货<i />人：</span>{{ address.receiver }}</li>
          <li><span>联系方式：</span>{{ address.contact }}</li>
          <li><span>收货地址：</span>{{ address.fullLocation.replace(/ /g, "") + address.address }}</li>
        </ul>
      </div>
      <!-- vue3.0 仅支持v-slot+template写法 -->
      <template v-slot:footer>
        <XtxButton
          @click="dialogVisible = false"
          type="gray"
          style="margin-right: 20px"
          >取消</XtxButton
        >
        <XtxButton @click="comfirm" type="primary">确认</XtxButton>
      </template>
    </XtxDialog>
    <AddressEdit @on-success="successHandler" ref="addressEdit"></AddressEdit>
  </div>
</template>

<script>
import AddressEdit from "./address-edit.vue";
import { ref } from "vue";
export default {
  components: { AddressEdit },
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  setup(props, { emit }) {
    // 遍历获取默认地址
    const showAddress = ref(null);
    if (props.list && props.list.length) {
      const defaultAddress = props.list.find((item) => {
        item.isDefault === 1;
      });
      if (defaultAddress) {
        showAddress.value = defaultAddress;
      } else {
        showAddress.value = props.list[0];
      }
    }

    //把默认地址id通知给父组件
    emit("change", showAddress.value?.id);

    // 显示选择地址列表
    const dialogVisible = ref(false);
    // 选择的地址对象
    const selectedAddress = ref(null);

    // 打开地址列表对话框
    const openDialog = () => {
      dialogVisible.value = true;
      selectedAddress.value = null;
    };

    // 选择地址确定
    const comfirm = () => {
      dialogVisible.value = false;
      showAddress.value = selectedAddress.value;
      // 默认通知一个地址ID给父
      emit("change", showAddress.value?.id);
    };

    // 显示新增修改地址弹框
    const addressEdit = ref(null);
    // 打开新增修改地址弹框
    const openAddressEdit = (address) => {
      addressEdit.value.open(address);
    };

    // 添加修改地址成功回调
    const successHandler = (formData) => {
      console.log("添加修改地址成功回调:", formData);
      const editAddress = props.list.find((item) => item.id === formData.id);
      if (editAddress) {
        for (const key in editAddress) {
          editAddress[key] = formData[key];
        }
      } else {
        const jsonStr = JSON.stringify(formData);
        const addressObj = JSON.parse(jsonStr);
        props.list.unshift(addressObj);
      }
    };

    return {
      showAddress,
      dialogVisible,
      selectedAddress,
      addressEdit,
      openDialog,
      comfirm,
      openAddressEdit,
      successHandler,
    };
  },
};
</script>

<style scoped lang="less">
.checkout-address {
  display: flex;
  align-items: center;
  border: 1px solid #f5f5f5;
  .text {
    display: flex;
    flex: 1;
    min-height: 90px;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
      display: none;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
  .xtx-dialog {
    .text {
      flex: 1;
      min-height: 90px;
      display: flex;
      align-items: center;
      &.item {
        border: 1px solid #f5f5f5;
        margin-bottom: 10px;
        cursor: pointer;
        &.active,
        &:hover {
          border-color: @xtxColor;
          background: lighten(@xtxColor, 50%);
        }
        > ul {
          padding: 10px;
          font-size: 14px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>