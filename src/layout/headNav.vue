<template>
  <header id="header_container"
          class="head-nav flex-row">
    <div class="left-adv logo">{{ $t('home.title') }}</div>
    <div ref="rightNav"
         class="right-nav flex1">
      <div class="userinfo-right fr">
        <div class="userinfo">
          <el-menu class="el-menu-demo"
                   mode="horizontal">
            <!-- <el-submenu index="1" popper-class="langItem">
                            <template slot="title">
                                <img :src="langLogo" class='langAvatar' alt="">
                            </template>
                            <el-menu-item index="1-1" @click="changeLocale('zh')">
                                <img :src="chinaImg" class='langAvatar' alt="">
                                <span class="intro">中文</span>
                            </el-menu-item>
                            <el-menu-item index="1-2" @click="changeLocale('en')">
                                <img :src="americaImg" class='langAvatar' alt="">
                                <span class="intro">EngList</span>
                            </el-menu-item>
                        </el-submenu> -->

            <el-submenu index="2"
                        popper-class="infoItem">
              <template slot="title">
                <img :src="avatar"
                     class="avatar"
                     alt="">
                <div class="welcome">
                  <!-- <span class="name">{{$t('commons.hi')}},</span> -->
                  <span class="name avatarname"> {{ name }}</span>
                </div>
              </template>
              <el-menu-item index="2-2"
                            @click="setDialogInfo('pass')">{{ $t('common.changepwd') }}</el-menu-item>
              <el-menu-item index="2-3"
                            @click="setDialogInfo('logout')">{{ $t('common.layout') }}</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogTableVisible"
               width="640px"
               :title="$t('other.changepwd')">
      <div class="dialog-content">
        <el-form ref="userForm"
                 :model="userForm"
                 :inline="true"
                 :rules="rules"
                 label-width="140px">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="old_password"
                            :label="$t('other.ymm') + '：'">
                <el-input v-model="userForm.old_password"
                          class=""
                          type="password"
                          :placeholder="$t('common.input')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="password"
                            :label="$t('other.xmm') + '：'">
                <el-input v-model="userForm.password"
                          class=""
                          type="password"
                          :placeholder="$t('common.input')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="re_password"
                            :label="$t('other.mmqr') + '：'">
                <el-input v-model="userForm.re_password"
                          class=""
                          type="password"
                          :placeholder="$t('common.input')" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <div class="dialog-btn-wrap">
          <el-button type="primary"
                     class="btn"
                     @click="saveData('userForm')">{{ $t('common.qd') }}</el-button>
          <el-button class="btn transparent-btn"
                     @click="dialogTableVisible = false">{{ $t('common.qx') }}</el-button>
        </div>
      </div>
    </el-dialog>
  </header>
</template>

<script>

import { editPwd } from '@/api'
import { mapGetters } from 'vuex'
// import * as mUtils from '@/utils/mUtils'
import { setToken, getToken } from '@/utils/auth'
import logoImg from '@/assets/img/logo.png'
import chinaImg from '@/assets/img/china.svg'
import americaImg from '@/assets/img/america.svg'
const avatarImg = require('../assets/images/head_avtor.png')
import md5 from "js-md5"
import { pwdExgValidate } from "@/config/validate"
import _ from "lodash"
export default {
  name: 'HeadNav',
  components: {
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (_.trim(value) === '')
      {
        callback(new Error(this.$t('common.input') + this.$t('other.xmm')));

      } else if (!pwdExgValidate.test(value)
        && value !== '')
      {
        callback(new Error(this.$t('common.pwdlength')));
      } else
      {
        callback();
      }
    }
    return {
      dialogTableVisible: false,
      logo: logoImg,
      langLogo: getToken('langLogo') || americaImg,
      chinaImg: chinaImg,
      americaImg: americaImg,
      avatar: avatarImg,
      name: JSON.parse(sessionStorage.getItem('userinfo')).user_login,
      menu: {
        userBgcolor: '#f0f2f5'
      },
      userForm: {
        old_password: '',
        password: '',
        re_password: ''
      },
      rules: {
        old_password: [
          { required: true, message: this.$t('common.input') + this.$t('other.ymm'), trigger: 'blur' },
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        re_password: [
          { required: true, validator: validatePass, trigger: 'blur' },
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    headNavWidth () {
      return document.body.clientWidth - this.sidebar.width
    }

  },
  created () {
  },
  mounted () {
  },
  methods: {
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    },
    /**
     * 弹出框-修改密码或者系统设置
     * @param {string} cmditem 弹框类型
     */
    setDialogInfo (cmditem) {
      switch (cmditem)
      {
        case 'pass':
          this.dialogTableVisible = true
          break
        case 'logout':
          this.logout()
          break
      }
    },
    saveData (userForm) {
      this.$refs[userForm].validate(async (valid) => {
        if (valid)
        {
          if (this.userForm.password !== this.userForm.re_password)
          {
            this.$message.error(this.$t('other.mmbyz'))
            return
          }
          const authorCode = localStorage.getItem("authorCode") || ''
          const model = {
            old_password: '###' + md5(md5(authorCode + this.userForm.old_password)),
            password: '###' + md5(md5(authorCode + this.userForm.password)),
            re_password: '###' + md5(md5(authorCode + this.userForm.re_password)),
          }
          const res = await editPwd(model)
          this.$message.success(this.$t('other.mmxgcg'))
          this.dialogTableVisible = false
          console.log(res)
        }
      })
    },
    // 切换语言
    changeLocale (type) {
      setToken('lang', type)
      this.$i18n.locale = type
      if (type === 'en')
      {
        this.langLogo = this.americaImg
      } else
      {
        this.langLogo = this.chinaImg
      }
      setToken('langLogo', this.langLogo)
    }
  }
}
</script>

<style lang='less'>
.head-nav {
  .el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 42px;
    line-height: 42px;
  }

  .el-submenu__title:hover {
    background: @adminBlue4 !important;
  }

  .el-submenu {
    color: #fff;
  }
}

.infoItem {
  .el-menu--popup {
    &.el-menu,
    .el-menu-item {
      text-align: center;
      background: @adminBlue3 !important;
      color: #fff !important;
    }

    .el-menu-item:hover {
      background: @adminBlue4 !important;
      color: @adminTextBlue !important;
    }
  }
}
</style>

<style scoped lang='less'>
.head-nav {
  padding: 0 30px;
  width: 100%;
  height: 42px;
  line-height: 42px;
  background: @adminBlue;

  .logo {
    font-size: 14px;
    color: #fff;
  }

  .el-menu-demo {
    background: none;
  }
}

.middle {
  align-items: center;
  border: 1px solid;
}

.userinfo-right {
  padding: 0 10px;
  justify-content: space-between;
}

.userinfo {
  line-height: 42px;
  text-align: right;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}

.langAvatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}

.welcome {
  display: inline-block;
  vertical-align: middle;
  padding: 0 5px;

  .name {
    line-height: 20px;
    text-align: center;
    font-size: 12px;
  }

  .avatarname {
    color: #fff;
    font-weight: bolder;
    font-size: 13px;
  }
}

.username {
  cursor: pointer;
  margin-right: 5px;
}

.border {
  border: 1px solid;
}

.notify-row {
  line-height: 42px;
  flex: 1;

  ul {
    display: flex;
    justify-content: space-around;
  }
}

ul.top-menu > li {
  position: relative;
}
</style>
