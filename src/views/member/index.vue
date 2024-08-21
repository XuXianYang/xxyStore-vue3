<template>
  <!-- 个人中心首页 -->
  <div>
    <HomeOverview></HomeOverview>
    <HomePanel title="我的收藏">
      <GoodsItem v-for="item in collectList" :key="item.id" :good="item"></GoodsItem>
    </HomePanel>
    <HomePanel title="我的足迹">
      <GoodsItem v-for="i in 4" :key="i" :good="goods"></GoodsItem>
    </HomePanel>
    <GoodsRelevant></GoodsRelevant>
  </div>
</template>

<script>
import HomeOverview from "@/views/member/home-overview.vue";
import HomePanel from "@/views/member/home-panel.vue";
import GoodsRelevant from "@/views/goods/goods-relevant.vue";
import GoodsItem from "@/views/category/goods-item.vue";
import { ref } from "vue";
import { findCollect } from "@/api/index";
export default {
  components: { HomeOverview, HomePanel, GoodsRelevant, GoodsItem },
  setup() {
    const goods = {
      id: "1",
      name: "自煮火锅不排队 麦饭石不粘鸳鸯火锅",
      picture:
        "https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg",
      desc: "清汤鲜香 红汤劲爽",
      price: "159.00",
    };
    const collectList = ref([])
    findCollect({ page: 1, pageSize: 4 }).then((res) => {
      console.log("我的收藏：", res);
      collectList.value = res.result.items
    });
    return { goods,collectList };
  },
};
</script>

<style scoped lang="less">
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>