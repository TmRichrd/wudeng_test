<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer four-border">
        <div class="titleArea rflex">
          <span class="title">{{ $t('login.title') }}</span>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" class="loginForm">
          <el-form-item prop="username" class="login-item">
            <span class="loginTips"><i class="icon icon-user" /></span>
            <el-input v-model="loginForm.username" class="area" type="text" :placeholder="$t('login.username')"
              @keyup.enter.native="submitForm('loginForm')" />
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <span class="loginTips"><i class="icon icon-password" /></span>
            <el-input v-model="loginForm.password" class="area" type="password" :placeholder="$t('login.password')"
              @keyup.enter.native="submitForm('loginForm')" />
          </el-form-item>
          <el-form-item prop="yzmCode" class="login-item">
            <div class="flex-row">
              <span class="loginTips"><i class="icon icon-yzm" /></span>
              <el-input v-model="loginForm.yzmCode" class="area flex1" type="text" :placeholder="$t('login.yzmCode')"
                @keyup.enter.native="submitForm('loginForm')" />
              <div class="yzm-img">
                <yzm-code ref="yzmcode" :value.sync="validCode" />
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">{{ $t('login.btn')
            }}</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
    <div v-if="tech_support" class="footer">{{ $t('login.support') }} ：{{ tech_support }}</div>
  </div>
</template>

<script>
import logoImg from '@/assets/img/logo.png'
import { getTechSupport } from '@/api'
import { setToken } from '@/utils/auth'
import yzmCode from 'cps/yzmCode'
import md5 from "js-md5"

export default {
  components: {
    yzmCode
  },
  data () {
    return {
      authorCode: "",
      tech_support: '',
      validCode: '',
      logo: logoImg,
      loginForm: {
        username: '', // 页面默认用户名
        password: '', // 页面默认密码
        yzmCode: ''
      },
      rules: {
        username: [
          { required: true, message: this.$t('common.input') + this.$t('login.username'), trigger: 'blur' },
          { min: 2, max: 25, message: this.$t('login.length'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('common.input') + this.$t('login.password'), trigger: 'blur' }
        ]
        // yzmCode: [
        //   { required: true, message: '请输入验证码', trigger: 'blur' }
        // ]
      }
    }
  },
  mounted () {
    this.getFootInfo()
  },
  methods: {
    async getFootInfo () {
      const res = await getTechSupport()
      console.log(res)
      this.authorCode = res.authorcode
      this.tech_support = res.system.tech_support
      localStorage.setItem("authorCode", res.authorcode)
    },
    showMessage (type, message) {
      this.$message({
        type: type,
        message: message
      })
    },
    submitForm (loginForm) {
      if (this.validCode !== this.loginForm.yzmCode.toLowerCase())
      {
        this.$message.error(this.$t('login.yzmErr'))
        // 验证码填写错误直接重置，减少用户再次点击操作
        return this.$refs.yzmcode.createdCode()
      }
      this.$refs[loginForm].validate((valid) => {
        if (valid)
        {
          // 密码加密= '###'+md5(md5(authorCode+password))
          const userinfo = {
            username: this.loginForm.username,
            password: '###' + md5(md5(this.authorCode + this.loginForm.password))
            // password: this.loginForm.password
          }
          this.$store.dispatch('Login', userinfo).then(res => {
            console.log(res)
            this.$router.push({ path: '/' })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_page {
  position: absolute;
  width: 100%;
  height: 100%;
  background: @adminBlue5;
  background-image: url('./../assets/images/login_bg.png');
  background-size: cover;
  background-repeat: no-repeat;
}

.form_contianer {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: #0E3482;
  box-shadow: inset 0px 1px 22px 0px #14429E;
  width: 450px;
  right: 149px;
  padding: 37px 64px;
  text-align: center;

  .titleArea {
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 22px;
    width: 100%;
    margin-bottom: 32px;

    .title {
      line-height: 33px;
      font-size: 24px;
      color: #58B3D5;
    }
  }

  .loginForm {
    .submit_btn {
      width: 100%;
      padding: 13px 0;
      font-size: 16px;
    }

    .yzm-img {
      width: 117px;
      height: 50px;
      background: #fff;
      margin-left: 13px;
    }

    .loginTips {
      position: absolute;
      left: 10px;
      z-index: 20;
      // color: #FF7C1A;
      font-size: 18px;
      top: 50%;
      transform: translateY(-50%);

      .icon {
        display: block;
        width: 24px;
        height: 24px;

        &.icon-user {
          background: url('./../assets/images/uname_icon2x.png') no-repeat;
          background-size: 24px;
        }

        &.icon-password {
          background: url('./../assets/images/password_icon2x.png') no-repeat;
          background-size: 24px;
        }

        &.icon-yzm {
          background: url('./../assets/images/yzm_icon2x.png') no-repeat;
          background-size: 24px;
        }
      }
    }
  }
}

@media screen and(max-width:900px) {
  .form_contianer {
    left: 50%;
    top: 50%;
    right: unset;
    transform: translate(-50%, -50%);
  }
}

.manage_tip {
  margin-bottom: 20px;

  .title {
    font-family: cursive;
    font-weight: bold;
    font-size: 26px;
    color: #fff;
  }

  .logo {
    width: 60px;
    height: 60px;
  }
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}

.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}

.loginForm {
  .el-button--primary {
    background-color: @btnPrimary;
    border: 1px solid @btnPrimary;
  }
}

.footer {
  background: none;
  position: absolute;
  bottom: 10px;
  text-align: center;
  width: 100%;
  line-height: 60px;
  font-size: 18px;
  color: #58B3D5;
}
</style>
