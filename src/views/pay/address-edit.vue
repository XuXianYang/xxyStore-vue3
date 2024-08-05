<template>
  <XtxDialog title="添加收货地址" v-model:visible="dialogVisible">
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input
              v-model="formData.receiver"
              class="input"
              placeholder="请输入收货人"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input
              v-model="formData.contact"
              class="input"
              placeholder="请输入手机号"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <XtxCity
              :fullLocation="formData.fullLocation"
              @change="changeCity"
              placeholder="请选择所在地区"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input
              v-model="formData.address"
              class="input"
              placeholder="请输入详细地址"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input
              v-model="formData.postalCode"
              class="input"
              placeholder="请输入邮政编码"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input
              v-model="formData.addressTags"
              class="input"
              placeholder="请输入地址标签，逗号分隔"
            />
          </div>
        </div>
      </div>
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
</template>

<script>
import { ref, reactive } from "vue";
import { addAddress, editAddress } from "@/api/order";
import Message from "@/components/library/Message";

export default {
  setup(props, { emit }) {
    const dialogVisible = ref(false);

    // 父组件直接调用该方法，并传进来待修改的地址对象
    const open = (address) => {
      dialogVisible.value = true;
      for (const key in formData) {
        if (key !== "isDefault") {
          formData[key] = "";
        }
      }

      if (address && address.id.length) {
        for (const key in address) {
          formData[key] = address[key];
        }
      } 
    };

    // 表单数据
    const formData = reactive({
      receiver: "",
      contact: "",
      provinceCode: "",
      cityCode: "",
      countyCode: "",
      address: "",
      postalCode: "",
      addressTags: "",
      isDefault: 0,
      fullLocation: "",
      id: "",
    });

    const comfirm = () => {
      if (formData.id && formData.id.length) {
        // 修改
        editAddress(formData)
          .then((res) => {
            emit("on-success", formData);
            dialogVisible.value = false;
            Message({ text: "修改地址成功", type: "success" });
          })
          .catch((e) => {
            Message({ text: e.response.data.msg, type: "error" });
          });
      } else {
        // 新增
        addAddress(formData)
          .then((res) => {
            formData.id = res.result.id
            emit("on-success", formData);
            dialogVisible.value = false;
            Message({ text: "添加地址成功", type: "success" });
          })
          .catch((e) => {
            Message({ text: e.response.data.msg, type: "error" });
          });
      }
    };

    // 选择地区回调
    const changeCity = (data) => {
      console.log("选择地区：", data);
      formData.provinceCode = data.provinceCode;
      formData.cityCode = data.cityCode;
      formData.countyCode = data.countyCode;
      formData.fullLocation = data.fullLocation;
    };
    return { dialogVisible, comfirm, open, changeCity, formData };
  },
};
</script>

<style scoped lang="less">
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}

.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}

:deep(.xtx-city) {
  width: 320px;
  margin-left: 0;
  .select {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  .option {
    top: 49px;
  }
}
</style>