<script lang="jsx">
import { useVModel } from "@vueuse/core";
import { provide,h } from "vue";
export default {
  name: "XtxTabs",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
  setup(props, { emit }) {
    const activeName = useVModel(props, "modelValue", emit);
    // 给xtx-tabs-panel传值
    provide("activeName", activeName);
    // 点击选项卡对应的处理函数
    const tabClick = (name, index) => {
      activeName.value = name;
      // 触发一个点击自定义时间
      emit("tab-click", { name, index });
    };

    return { activeName, tabClick };
  },
  render () {
    // 获取插槽内容
    const panels = this.$slots.default()
    // 动态的panels组件集合
    const dynamicPanels = []
    panels.forEach((item) => {
      // 静态
      if (item.type.name === 'XtxTabsPanel') {
        dynamicPanels.push(item)
      } else {
        // v-for 渲染处来的
        item.children.forEach((item) => {
          dynamicPanels.push(item)
        })
      }
    })
    const nav = (
      <nav>
        {dynamicPanels.map((item, i) => {
          return (
            <a onClick={() => this.tabClick(item.props.name, i)}
               class={{ active: item.props.name === this.activeName }}
               href="javascript:;" >
              {item.props.label}
            </a>
          )
        })}
      </nav>
    )
    return <div class="xtx-tabs">{[nav, dynamicPanels]}</div>
  }
};
</script>
<style scoped lang="less">
.xtx-tabs {
  background-color: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>