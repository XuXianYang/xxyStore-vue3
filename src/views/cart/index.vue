<template>
  <div class="xtx-cart-page">
    <div class="container">
      <!-- 顶部面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <!-- 购物车表格 -->
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <XtxCheckbox
                  @change="checkAll"
                  :modelValue="$store.getters['cart/isCheckAll']"
                ></XtxCheckbox>
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <!-- 无商品时提示页面 -->
            <tr v-if="$store.getters['cart/validList'].length === 0">
              <td colspan="6">
                <CartNone />
              </td>
            </tr>
            <tr v-for="item in $store.getters['cart/validList']" :key="item.id">
              <td>
                <XtxCheckbox
                  @change="($event) => checkOne(item.skuId, $event)"
                  :modelValue="item.selected"
                ></XtxCheckbox>
              </td>
              <!-- 商品信息 -->
              <td>
                <div class="goods">
                  <RouterLink :to="`/goods/${item.id}`">
                    <img :src="item.picture" alt="" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ item.name }}
                    </p>
                    <CartSku
                      @change="($event) => updateCartSku(item.skuId, $event)"
                      :skuId="item.skuId"
                      :attrsText="item.attrsText"
                    ></CartSku>
                  </div>
                </div>
              </td>
              <!-- 单价 -->
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
                <p v-if="item.price - item.nowPrice > 0">
                  比加入时降价
                  <span class="red">&yen;{{ item.price - item.nowPrice }}</span>
                </p>
              </td>
              <!-- 数量 -->
              <td class="tc">
                <XtxNumberBox
                  label=""
                  :max="item.stock"
                  :modelValue="item.count"
                  @change="($event) => changeCount(item.skuId, $event)"
                ></XtxNumberBox>
              </td>
              <!-- 小计 -->
              <td class="tc">
                <p class="f16 red">
                  &yen;{{ (item.nowPrice * item.count * 100) / 100 }}
                </p>
              </td>
              <!-- 操作 -->
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p>
                  <a
                    class="green"
                    href="javascript:;"
                    @click="deleteOne(item.skuId)"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 失效商品 -->
          <tbody v-if="$store.getters['cart/invalidList'].length > 0">
            <tr>
              <td colspan="6">
                <h3 class="tit">失效商品</h3>
              </td>
            </tr>
            <tr
              v-for="item in $store.getters['cart/invalidList']"
              :key="item.id"
            >
              <td><XtxCheckbox style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/goods/${item.id}`">
                    <img :src="item.picture" alt="" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{ item.name }}</p>
                    <p class="attr">{{ item.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
              </td>
              <td class="tc">{{ item.count }}</td>
              <td class="tc">
                <p>&yen;{{ (item.nowPrice * 100 * item.count) / 100 }}</p>
              </td>
              <td class="tc">
                <p>
                  <a
                    class="green"
                    href="javascript:;"
                    @click="deleteOne(item.skuId)"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 底部操作栏 -->
      <div class="action">
        <div class="batch">
          <XtxCheckbox
            @change="checkAll"
            :modelValue="$store.getters['cart/isCheckAll']"
          ></XtxCheckbox>
          <a href="javascript:;" @click="batchDeleteCart(false)">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="batchDeleteCart(true)">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ $store.getters["cart/validTotal"] }} 件商品，已选择{{
            $store.getters["cart/selectedTotal"]
          }}件，商品合计：
          <span class="red">¥{{ $store.getters["cart/selectedAmount"] }}</span>
          <XtxButton type="primary" @click="goCheckout">下单结算</XtxButton>
        </div>
      </div>
      <GoodsRelevant></GoodsRelevant>
    </div>
  </div>
</template>

<script>
import CartNone from "@/views/cart/cart-none.vue";
import GoodsRelevant from "@/views/goods/goods-relevant.vue";
import CartSku from "@/views/cart/cart-sku.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Confirm from "@/components/library/Confirm";
import Message from "@/components/library/Message";

export default {
  components: { GoodsRelevant, CartNone, CartSku },
  setup() {
    const store = useStore();
    // 单选商品
    const checkOne = (skuId, selected) => {
      console.log("单选商品：", skuId);
      store.dispatch("cart/updateCart", { skuId, selected });
    };
    // 全选商品
    const checkAll = (selected) => {
      console.log("全选商品：", selected);
      store.dispatch("cart/checkAllCart", selected);
    };
    // 删除单个商品
    const deleteOne = (skuId) => {
      console.log("删除单个商品：", skuId);
      Confirm({ text: "您确定从购物车删除该商品吗？" })
        .then(() => {
          store.dispatch("cart/deleteCart", skuId);
        })
        .catch((e) => {
          console.log("删除单个商品弹框点击取消");
        });
    };
    // isClear：false批量删除,true清空无效商品
    const batchDeleteCart = (isClear) => {
      const list =
        store.getters[isClear ? "cart/invalidList" : "cart/selectedList"];
      if (!list || !list.length) {
        return Message({
          text: `${isClear ? "失效为空，无需要删除" : "选中的商品为空"}`,
        });
      }
      Confirm({
        text: `您确定从购物车删除${isClear ? "失效" : "选中"}的商品吗？`,
      })
        .then(() => {
          store.dispatch("cart/batchDeleteCart", isClear);
        })
        .then(() => {
          Message({
            text: `从购物车删除${isClear ? "失效" : "选中"}的商品成功`,
            type: "success",
          });
          console.log("批量删除商品成功");
        })
        .catch((e) => {
          console.log("批量删除商品弹框点击取消");
        });
    };
    // 修改商品数量
    const changeCount = (skuId, count) => {
      console.log("修改商品数量", count);
      store.dispatch("cart/updateCart", { skuId, count });
    };

    // 更新商品规格信息
    const updateCartSku = (oldSkuId, newSku) => {
      store.dispatch("cart/updateCartSku", { oldSkuId, newSku });
    };

    const router = useRouter();
    // 结算商品
    const goCheckout = () => {
      if (store.getters["cart/validList"].length === 0) {
        return Message({ text: "未选择商品" });
      }

      if (store.state.user.profile.token) {
        // 跳转结算页面
        router.push("/checkout");
      } else {
        Confirm({ text: "下单结算需要登录，您是否去登录？" })
          .then(() => {
            // 此处跳转会由路由守卫拦截
            router.push("/checkout");
          })
          .catch((e) => {});
      }
    };
    console.log("有效商品列表：", store.getters["cart/validList"]);
    return {
      checkOne,
      checkAll,
      deleteOne,
      batchDeleteCart,
      changeCount,
      updateCartSku,
      goCheckout,
    };
  },
};
</script>

<style scoped lang="less">
.xtx-cart-page {
  .container {
    .cart {
      background-color: #fff;
      color: #666;
      table {
        border-spacing: 0;
        border-collapse: collapse;
        line-height: 24px;
        th,
        td {
          padding: 10px;
          border-bottom: 1px solid #f5f5f5;
          &:first-child {
            text-align: left;
            padding-left: 30px;
            color: #999;
          }
        }
        th {
          font-size: 16px;
          font-weight: normal;
          line-height: 50px;
        }
      }
      .tit {
        color: #666;
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
      .tc {
        text-align: center;
        .xtx-numbox {
          margin: 0 auto;
          width: 120px;
        }
      }
      .red {
        color: @priceColor;
      }
      .green {
        color: @xtxColor;
      }
      .f16 {
        font-size: 16px;
      }
      .goods {
        display: flex;
        img {
          width: 100px;
          height: 100px;
        }
        > div {
          padding-top: 20px;
          width: 280px;
          font-size: 16px;
          padding-left: 10px;
          .name {
            margin-bottom: 10px;
          }
        }
        .attr {
          font-size: 14px;
          color: #999;
        }
      }
    }
    .action {
      margin-top: 20px;
      background: #fff;
      height: 80px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      padding: 0 30px;
      .batch {
        .xtx-checkbox {
          color: #999;
        }
        a {
          margin-left: 20px;
        }
      }
      .red {
        font-size: 18px;
        margin-right: 20px;
        font-weight: bold;
        color: @priceColor;
      }
    }
  }
}
</style>