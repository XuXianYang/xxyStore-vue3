<template>
  <div class="goods-comment">
    <!-- 头部 -->
    <div class="header" v-if="comment">
      <div class="data">
        <p>{{ comment.salesCount }}</p>
        <p>人购买</p>
      </div>
      <div class="data">
        <p>{{ comment.praisePercent }}</p>
        <p>好评率</p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="(item, idx) in comment.tags"
            :key="item.title"
            href="javascript:;"
            :class="{ active: currTagIndex === idx }"
            @click="changeTag(idx)"
            >{{ item.title }}({{ item.tagCount }})</a
          >
        </div>
      </div>
    </div>
    <!-- 排序 -->
    <div class="sort">
      <span>排序：</span>
      <a
        @click="changeSort(null)"
        href="javascript:;"
        :class="{ active: reqParams.sortField === null }"
        >默认</a
      >
      <a
        @click="changeSort('praiseCount')"
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        >最热</a
      >
      <a
        @click="changeSort('createTime')"
        href="javascript:;"
        :class="{ active: reqParams.sortField === 'createTime' }"
        >最新</a
      >
    </div>
    <!-- 评价列表 -->
    <div class="list">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{formatNickname(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i+'1'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5-item.score" :key="i+'2'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{formatSpecs(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">
            {{ item.content }}
          </div>
          <GoodsCommentImage v-if="item.pictures&&item.pictures.length" :pictureList="item.pictures"></GoodsCommentImage>
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <XtxPagination :pages="pages" @changePage="changePage"></XtxPagination>
  </div>
</template>

<script>
import { computed, watch, reactive, ref, inject } from "vue";
import { findCommentInfoByGoods, findGoodsCommentList } from "@/api/product";
import GoodsCommentImage from "./goods-comment-image.vue"
export default {
  name: "GoodsComment",
  components:{GoodsCommentImage},
  setup() {
    const goods = inject("goods");

    // 获取评论标签和总数
    const comment = ref(null);
    findCommentInfoByGoods(goods.id).then((res) => {
      res.result.tags.unshift({
        type: "img",
        title: "有图",
        tagCount: res.result.hasPictureCount,
      });
      res.result.tags.unshift({
        type: "all",
        title: "全部评价",
        tagCount: res.result.evaluateCount,
      });
      comment.value = res.result;
    });

    const currTagIndex = ref(0);
    // 切换标签，改变请求参数
    const changeTag = (idx) => {
      currTagIndex.value = idx;
      // 设置有图和标签条件
      const currentTag = comment.value.tags[idx];
      if (currentTag.type === "all") {
        reqParams.hasPicture = false;
        reqParams.tag = null;
      } else if (currentTag.type === "img") {
        reqParams.hasPicture = true;
        reqParams.tag = null;
      } else {
        reqParams.hasPicture = false;
        reqParams.tag = currentTag.title;
      }
      reqParams.page = 1;
    };

    // 筛选条件（请求参数）
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      sortField: null,
    });

    const pages = ref(0)
    const commentList = ref([]);
    // 监听请求参数，重新获取评价列表数据
    watch(
      reqParams,
      async (newVal) => {
        findGoodsCommentList(goods.id, reqParams).then((res) => {
          console.log("评论列表：", res.result);
          commentList.value = res.result.items;
          pages.value = res.result.pages
        });
      },
      { immediate: true }
    );

    // 排序点击事件
    const changeSort = (type) => {
      reqParams.sortField = type;
      reqParams.page = 1;
    };

    // 定义转换数据的函数（对应vue2.0的过滤器）,转换评论的该商品属性
    const formatSpecs = (specs) => {
      return specs
        .reduce((p, c) => `${p} ${c.name}：${c.nameValue}`, "")
        .trim();
    };
    // 转换昵称
    const formatNickname = (nickname) => {
      return nickname.substr(0, 1) + "****" + nickname.substr(-1);
    };

    // 切换页面
    const changePage = page => {
      reqParams.page = page;
    }

    return {
      comment,
      commentList,
      reqParams,
      currTagIndex,
      pages,
      changeTag,
      changePage,
      changeSort,
      formatSpecs,
      formatNickname
    };
  },
};
</script>

<style scoped lang="less">
.goods-comment {
  .header {
    display: flex;
    padding: 30px 0;
    .data {
      width: 150px;
      padding: 20px;
      p {
        text-align: center;
        &:first-child {
          font-size: 32px;
          color: @priceColor;
        }
        &:last-child {
          color: #999;
        }
      }
    }
    .tags {
      display: flex;
      flex: 1;
      border-left: 1px solid #f5f5f5;
      padding-left: 10px;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        flex-wrap: wrap;
        display: flex;
        a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
    .active {
      background-color: @xtxColor;
    }
  }
  .sort {
    display: flex;
    line-height: 30px;
    text-align: center;
    padding: 20px;
    margin: 0 15px;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    span {
      color: #666;
    }
    a {
      margin-left: 5px;
      width: 50px;
      height: 30px;
    }
    .active {
      background-color: @xtxColor;
      color: #fff;
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
        .text {
          color: #666;
          line-height: 24px;
        }
        .time {
          display: flex;
          justify-content: space-between;
          color: #999;
          margin-top: 10px;
          .iconfont{
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>