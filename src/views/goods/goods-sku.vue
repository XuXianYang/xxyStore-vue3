<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="sku in item.values" :key="sku.id">
          <img
            v-if="sku.picture"
            :src="sku.picture"
            :class="{ selected: sku.selected,disabled:sku.disabled }"
            @click="clickSpecs(item, sku)"
            :title="sku.name"
            alt=""
          />
          <span
            v-else
            :class="{ selected: sku.selected ,disabled:sku.disabled}"
            @click="clickSpecs(item, sku)"
            >{{ sku.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<script>
import { emit } from "vue";
import getPowerSet from "@/vender/power-set";
const spliter = "★";
// 根据skus数据得到路径字典对象
const getPathMap = (skus) => {
  const pathMap = {};
  skus.forEach((sku) => {
    // 1. 过滤出有库存有效的sku
    if (sku.inventory) {
      // 2. 得到sku属性值数组
      const specs = sku.specs.map((spec) => spec.valueName);
      // 3. 得到sku属性值数组的子集
      const powerSet = getPowerSet(specs);
      // 4. 设置给路径字典对象
      powerSet.forEach((set) => {
        const key = set.join(spliter);
        if (pathMap[key]) {
          // 已经有key往数组追加
          pathMap[key].push(sku.id);
        } else {
          // 没有key设置一个数组
          pathMap[key] = [sku.id];
        }
      });
    }
  });
  return pathMap;
};
// 得到当前选中规格集合
const getSelectedArr = (specs) => {
  const selectedArr = [];
  specs.forEach((spec) => {
    const selectedVal = spec.values.find((val) => val.selected);
    selectedArr.push(selectedVal ? selectedVal.name : undefined);
  });
  return selectedArr;
};
// 更新按钮的禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, i) => {
    const selectedArr = getSelectedArr(specs);
    spec.values.forEach((val) => {
      // 已经选中的按钮不用判断
      if (val.name === selectedArr[i]) return false;
      // 未选中的替换对应的值
      selectedArr[i] = val.name;
      // 过滤无效值得到key
      const key = selectedArr.filter((v) => v).join(spliter);
      // 设置禁用状态
      val.disabled = !pathMap[key];
    });
  });
};
// 初始化选中状态
const initSelectedStatus = (goods, skuId) => {
  const sku = goods.skus.find((sku) => sku.id === skuId);
  if (sku) {
    goods.specs.forEach((spec, i) => {
      const value = sku.specs[i].valueName;
      spec.values.forEach((val) => {
        val.selected = val.name === value;
      });
    });
  }
};
export default {
  name: "GoodsSku",
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] }),
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const pathMap = getPathMap(props.goods.skus);
    console.log('pathMap',pathMap);
    // 根据传入的skuId默认选中规格按钮
    if (props.skuId) {
      initSelectedStatus(props.goods, props.skuId);
    }
    
    // 组件初始化的时候更新禁用状态
    updateDisabledStatus(props.goods.specs, pathMap);

    const clickSpecs = (item, val) => {
      // 排他思想，如果未选中，先全部置为未选中，再把当前选项置为选中
      if (val.disabled) return;
      if (!val.selected) {
        item.values.forEach((bv) => {
          bv.selected = false;
        });
      }
      val.selected = !val.selected;
      // 点击的时候更新禁用状态
      updateDisabledStatus(props.goods.specs, pathMap);

      // 触发change事件将sku数据传递出去
      const selectedArr = getSelectedArr(props.goods.specs).filter((v) => v);
      if (selectedArr.length === props.goods.specs.length) {
        const skuIds = pathMap[selectedArr.join(spliter)];
        const skuObj = props.goods.skus.find((sku) => sku.id === skuIds[0]);
        console.log('sku:',skuObj);
        // 传递
        emit("change", {
          skuId: skuObj.id,
          price: skuObj.price,
          oldPrice: skuObj.oldPrice,
          inventory: skuObj.inventory,
          specsText: skuObj.specs
            .reduce((p, n) => `${p} ${n.name}：${n.valueName}`, "")
            .replace(" ", ""),
        });
      } else {
        emit("change", {});
      }
    };
    return { clickSpecs };
  },
};
</script>

<style scoped lang="less">
.sku-state-mixin() {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 10px;
        margin-bottom: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>