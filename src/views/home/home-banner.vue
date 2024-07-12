<template>
  <!-- 首页banner组件 -->
  <div class="homeBanner">
    <XtxCarousel :bannerList="bannerList"></XtxCarousel>
  </div>
</template>

<script>
import { findBanner } from "@/api/home";
import {ref} from "vue";

export default {
  setup(){
    const bannerList = ref([])
    // 获取banner数据列表
    findBanner().then(res=>{
      bannerList.value = res.result
    }).catch(err=>{})
    return {bannerList}
  }
};
</script>

<style scoped lang="less">
.homeBanner {
  position: absolute;
  left: 0;
  top: 0;
  width: 1240px;
  height: 500px;
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>