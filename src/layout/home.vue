<template>
  <div class="home">
    <head-nav />
    <div ref="menu_right" class="container flex-row flex1" :style="{left:sidebar.width+'px'}">
      <left-menu />
      <div ref="menu_content" class="menu_content el-scrollbar flex1">
        <bread v-if="routerName!='technologyMantain'" />
        <router-view /><!--页面渲染入口-->
      </div>
      <backTop :ele="$refs.menu_content" />
      <!-- <footerNav></footerNav> -->
    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import HeadNav from './headNav.vue'
import LeftMenu from './leftMenu.vue'
import Bread from './bread.vue'
// import FooterNav from './footerNav.vue'
import backTop from 'cps/backTop'

export default {
  name: 'Home',
  components: {
    HeadNav,
    LeftMenu,
    Bread,
    // FooterNav,
    backTop
  },
  data() {
    return {
      routerName: this.$route.name
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  watch: {

  },
  created() {
  },
  mounted() {
    console.log()
  }
}
</script>
<style scoped lang='less'>
    .home{
        .container{
            overflow: hidden;
        }
        .menu_content{
            position: relative;
            flex: 1;
            overflow: auto;
            width:100%;
            height: 100%;
            padding: 20px 30px;
            background-color: @adminBlue6;
        }
    }
</style>
