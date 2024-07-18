<template>
  <div class="sub-bread">
    <!-- 面包屑 -->
    <XtxBread>
      <xtx-bread-item to="/">首页</xtx-bread-item>
      <xtx-bread-item v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</xtx-bread-item>
      <transition name="fade-right" mode="out-in">
        <xtx-bread-item :key="category.sub.id" v-if="category.sub">{{
          category.sub.name
        }}</xtx-bread-item>
      </transition>
    </XtxBread>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
    name:'SubBread',
    setup(){
        const route = useRoute()
        console.log(route);
        const store = useStore()
        console.log(store);
        const category = computed(()=>{
            const obj = {}
            store.state.category.list.forEach(top => {
                if(top.children){
                    top.children.forEach(sub => {
                        if(sub.id === route.params.id){
                            obj.top = {id:top.id,name:top.name}
                            obj.sub = {id:sub.id,name:sub.name}
                        }
                    })
                }
            });
            return obj
        })
        return { category }
    },
};
</script>

<style>
</style>