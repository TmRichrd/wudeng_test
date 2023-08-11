<template>
  <div class="menu_left cflex" :style="{width:sidebar.width+'px'}">
    <div class="menu-collapse">
      <i
        class="icon collapse-btn"
        :class="{isHide:isCollapse}"
        @click="handleLefeMenu"
      />
    </div>
    <div
      class="
        menu_page_bottom
        is-scroll-left"
    >
      <el-menu
        ref="menu"
        mode="vertical"
        theme="dark"
        :default-active="$route.path"
        :collapse="isCollapse"
        :unique-opened="true"
        :background-color="menuObj.bgColor"
        :text-color="menuObj.textColor"
        :active-text-color="menuObj.activeTextColor"
        :style="{width:sidebar.width+'px'}"
        @select="selectMenu"
      >
        <template v-for="(item,index) in permission_routers">
          <!--表示 有一级菜单-->
          <router-link v-if="!item.hidden && item.noDropdown" :key="index" :to="item.children[0].path">
            <el-menu-item
              class="dropItem"
              :index="item.children[0].path"
            >
              <!-- <img class="menu-icon" :src="item.meta.icon"> -->
              <span v-if="item.meta.title" slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </router-link>

          <!--表示 有二级或者多级菜单 -->
          <el-submenu v-if="item.children && item.children.length >= 1 && !item.hidden && !item.noDropdown" :key="index" :index="item.path">
            <template slot="title">
              <img class="menu-icon" :src="item.meta.icon">
              <span v-if="item.meta.title" slot="title">{{ item.meta.title }}</span>
            </template>
            <!--直接定位到子路由上，子路由也可以实现导航功能-->
            <router-link v-for="(citem,cindex) in item.children" :key="cindex" :to="getIindex(citem,item,cindex)">
              <el-menu-item
                v-if="citem.noDropdown"
                :index="getIindex(citem,item,cindex)"
              >
                <span slot="title"> {{ citem.meta.title }}</span>
              </el-menu-item>
              <el-submenu v-if="citem.children && citem.children.length >= 1 && !citem.hidden && !citem.noDropdown" :key="cindex" class="child-menu" :index="citem.path">
                <template slot="title">
                  <!-- <icon-svg v-if="citem.meta.icon" :icon-class="citem.meta.icon" /> -->
                  <span v-if="citem.meta.title" slot="title">{{ citem.meta.title }}</span>
                </template>
                <!--直接定位到子路由上，子路由也可以实现导航功能-->
                <router-link v-for="(ccitem,ccindex) in citem.children" :key="ccindex" :to="getIindex(ccitem,item,cindex)">
                  <el-menu-item
                    v-if="!ccitem.hidden"
                    :index="getIindex(ccitem,item,cindex)"
                  >
                    <span slot="title"> {{ ccitem.meta.title }}</span>
                  </el-menu-item>
                </router-link>
              </el-submenu>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import * as mUtils from '@/utils/mUtils'
import logoImg from '@/assets/img/logo.png'

export default {
  name: 'LeftMenu',
  data() {
    return {
      menuObj: {
        bgColor: '#001640',
        textColor: '#ffffff',
        activeTextColor: '#76A1F7'
      },
      logo: logoImg
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'isCollapse',
      'sidebar',
      'menuIndex'
    ])
  },
  created() {
  },
  mounted() {
  },
  methods: {
    selectMenu(e) {
      if (e !== '/roadManage/roadSurvey') return
      const openArr = this.$refs.menu.openedMenus
      if (openArr.indexOf('/roadManage/roadList') === -1) {
        this.$refs.menu.openedMenus.push('/roadManage/roadList')
      }
    },
    getIindex(citem, item, cindex) {
      // return item.path + '/' + citem.path
      return citem.path
    },
    handleLefeMenu() {
      this.$store.dispatch('setLeftCollapse') // 折叠菜单
      this.$store.dispatch('handleLeftMenu') // 改变菜单宽度 170->35/35-170
      this.changeBarDirection = !this.changeBarDirection
    }
  }
}
</script>

<style lang="less">
.menu_left{
    .el-submenu .el-menu-item:hover{
        background: #0A3079 !important;
        color: #76A1F7 !important;
    }
    .el-menu-item.is-active{
        background: #0A3079 !important;
    }
}

</style>
<style lang="less" scoped>
    .menu_left{
        height: 100%;
        overflow-y: auto;
        background:@adminBlue2;
        .menu-icon{
          width: 26px;
          height: 26px;
          margin-right: 6px;
        }
        .menu-collapse{
            width: 100%;
            background:@adminBlue2;
            height: 55px;
            text-align: center;
            .collapse-btn{
                cursor: pointer;
                display: inline-block;
                width: 25px;
                height: 25px;
                margin-top:15px;
                background: url('./../assets/images/collapse_icon2x.png') no-repeat;
                background-size: 25px;
                transition: all 0.3s;
                transform: rotate(180deg);
                &.isHide{
                    transform: rotate(0deg);
                }
            }
        }
        .menu_page_bottom {
            width:100%;
            overflow-y: scroll;
            overflow-x: hidden;
            flex:1;
            z-index: 10;
        }
    }
    .menu_page_top{
        width:100%;
        height: 60px;
        align-items: center;
        justify-content: space-around;
        text-transform: uppercase;
        box-sizing: border-box;
        box-shadow:0px 2px 5px 0px rgba(230,224,224,0.5);
        .closeLogo{
            width:30px;
            height:30px;
        }
        .title{
            font-size: 22px;
            i{
                color:#FF6C60;
            }
        }
    }

</style>
