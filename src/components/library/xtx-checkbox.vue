<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const checked = useVModel(props, "modelValue", emit);
    // const checked = ref(false);
    const changeChecked = () => {
      const newValue = !checked.value;
      checked.value = newValue;

      // 使用useVModel实现双向数据绑定v-model指令
      // 1. 使用props接收modelValue
      // 2. 使用useVModel来包装props中的modelValue属性数据
      // 3. 在使用checked.value就是使用父组件数据
      // 4. 在使用checked.value = '数据' 赋值，触发emit('update:modelvalue', '数据')
      // 让组件支持change事件
      emit("change", newValue);
      // 使用emit通知父组件数据的改变
      //   emit("update:modelValue", checked.value);
    };
    // 使用侦听器，得到父组件传递数据，给checked数据
    watch(
      () => props.modelValue,
      () => {
        checked.value = props.modelValue;
      },
      { immediate: true }
    );
    return { checked, changeChecked };
  },
};
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 15px;
  font-size: 15px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  .icon-unchecked{
    color: #999;
    ~ span {
      color: #999;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 5px;
  }
}
</style>