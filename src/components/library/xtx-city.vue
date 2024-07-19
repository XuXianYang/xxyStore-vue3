<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{ active: visible }">
      <span v-if="!fullLocation" class="placeholder">{{ placeholder }}</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span
          @click="changeItem(item)"
          class="ellipsis"
          v-for="item in currList"
          :key="item.code"
          >{{ item.name }}</span
        >
      </template>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";

export default {
  name: "XtxCity",
  props: {
    fullLocation: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      defulat: "请选择配送地址",
    },
  },
  setup(props, { emit }) {
    const loading = ref(false);
    const allCityData = ref([]);
    // 控制展开收起,默认收起
    const visible = ref(false);
    // 选中的省市区数据
    const changeResult = reactive({
      provinceCode: "",
      provinceName: "",
      cityCode: "",
      cityName: "",
      countyCode: "",
      countyName: "",
      fullLocation: "",
    });
    // 切换展开收起
    const toggleDialog = () => {
      if (!visible.value) {
        loading.value = true;
        getCityData().then((res) => {
          allCityData.value = res;
          loading.value = false;
        });

        // 清空选择结果
        for (const key in changeResult) {
          changeResult[key] = "";
        }
      }
      visible.value = !visible.value;
    };

    // 定义计算属性根据点击的省份城市获取对应的列表
    const currList = computed(() => {
      // 默认省一级
      let list = allCityData.value;
      // 可能：市一级
      if (changeResult.provinceCode && changeResult.provinceName) {
        list = list.find((p) => p.code === changeResult.provinceCode).areaList;
      }
      // 可能：县地区一级
      if (changeResult.cityCode && changeResult.cityName) {
        list = list.find((c) => c.code === changeResult.cityCode).areaList;
      }
      return list;
    });

    // 点击其他位置隐藏
    const target = ref(null);
    onClickOutside(target, () => {
      visible.value = false;
    });

    // 点击事件：点击省市区
    const changeItem = (item) => {
      // 省份
      if (item.level === 0) {
        changeResult.provinceCode = item.code;
        changeResult.provinceName = item.name;
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code;
        changeResult.cityName = item.name;
      }
      if (item.level === 2) {
        changeResult.countyCode = item.code;
        changeResult.countyName = item.name;
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`;
        visible.value = false;
        emit("change", changeResult);
      }
    };

    return {
      visible,
      toggleDialog,
      target,
      loading,
      allCityData,
      currList,
      changeItem,
    };
  },
};
// 获取城市数据
const getCityData = () => {
  // 这个位置可能有异常操作，封装成promise
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      // 有缓存
      resolve(window.cityData);
    } else {
      // 无缓存
      const url =
        "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json";
      axios.get(url).then((res) => {
        window.cityData = res.data;
        resolve(window.cityData);
      });
    }
  });
};
</script>

<style scoped lang="less">
.xtx-city {
  margin-left: 5px;
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    position: absolute;
    left: 0;
    top: 29px;
    width: 542px;
    border: 1px solid #e4e4e4;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>