<template>
  <div class="home">
    <head-nav />
    <div ref="menu_right" class="container flex-row flex1" :style="{left:sidebar.width+'px'}">
      <left-menu />
      <div ref="menu_content" class="menu_content el-scrollbar flex1">
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
// import Bread from './bread.vue'
// import FooterNav from './footerNav.vue'
import backTop from 'cps/backTop'

export default {
  name: 'Home',
  components: {
    HeadNav,
    LeftMenu,
    // Bread,
    // FooterNav,
    backTop
  },
  data() {
    return {
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
            background-image: url('./../assets/images/dashboard_bg.png');
            background-size: cover;
            background-repeat: no-repeat;
            padding: 22px 24px;
            background-color: @adminBlue6;
        }
    }
</style>
