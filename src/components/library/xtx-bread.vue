<script>
import { h } from "vue";
export default {
  name: "XtxBread",
  //template 标签去除，单文件组件. render函数返回值就是组件内容
  render() {
    // vue2.0 的h函数传参进来的，vue3.0 的h函数导入进来
    // h函数：参数1：标签名字，参数2：标签属性对象，参数3：子节点
    // 遍历插槽中的item，重新渲染组件
    const items = this.$slots.default();
    const dymanicItems = [];
    items.forEach((item, i) => {
      // 对插槽节点进行判断（是XtxBreadItem和Transition才进行组装）
      if (item.type.name === "XtxBreadItem" ||item.type.displayName === "Transition") {
        dymanicItems.push(item);
        if (i < items.length - 1) {
          dymanicItems.push(h("i", { class: "iconfont icon-angle-right" }));
        }
      }
    });
    return h("div", { class: "xtx-bread" }, dymanicItems);
  },
};
</script>

<style lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>