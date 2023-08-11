<template>
  <div class="screen">
    <div class="inner-form-wrap blue7 form-input">
      <div class="section-title">{{ $t('roadDetail.jbxx') }}</div>
      <el-form ref="baseForm" :label-position="'top'" :model="baseForm" :rules="rules" class="baseForm">
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item prop="jizhongqi" :label="$t('roadDetail.jzqbh') + '：'">
              <el-select v-model="baseForm.jizhongqi" :disabled="enbleEdit" :placeholder="$t('common.select') + $t('roadDetail.bh')">
                <el-option
                  v-for="item in jiZhongQiOpt"
                  :key="item.jizhongqi"
                  :label="item.jizhongqi"
                  :value="item.jizhongqi"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="installplace" :label="$t('roadDetail.azdidian') + '：'">
              <el-input v-model="baseForm.installplace" :disabled="enbleEdit" class="area" type="text" :placeholder="$t('common.input') + $t('addRoad.roadname')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="led_id" :label="$t('roadDetail.pmid') + '：'">
              <el-input v-model="baseForm.led_id" :disabled="enbleEdit" class="area" type="text" :placeholder="$t('common.input') + $t('addRoad.pmid')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="boxSn" :label="$t('roadDetail.znxbh') + '：'">
              <el-input v-model="baseForm.boxSn" :disabled="enbleEdit" class="area" type="text" :placeholder="$t('common.input') + $t('addRoad.znxbh')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24" style="text-align:center">
            <el-button type="primary" class="submit_btn blue2Btn" @click="enbleEdit=false">{{ $t('roadDetail.sz') }}</el-button>
            <el-button type="primary" class="submit_btn blue2Btn" @click="submitForm('baseForm')">{{ $t('roadDetail.bc') }}</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="online-show blue7">
      <div class="section-title">{{ $t('roadDetail.ssxs') }}</div>
      <div class="video-wrap flex-row">
        <div class="area-item">
          <div class="sc-tit">{{ $t('roadDetail.xsck') }}</div>
          <div class="video-item">
            <textarea v-model="lastContent" disabled class="area-inp" rows="5" />
          </div>
        </div>
        <div class="area-item">
          <div class="sc-tit">{{ $t('roadDetail.srck') }}</div>
          <div class="video-item">
            <textarea v-model="editContent" class="area-inp" rows="5" />
          </div>
        </div>
      </div>
      <el-row :span="24">
        <el-col :span="24" style="text-align:center;padding-bottom:25px">
          <el-button type="primary" class="submit_btn blue2Btn" @click="putContent">{{ $t('roadDetail.xfa') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <box-param :addr-info="addrInfo" :box-sn="boxSn" :chonghezha="chonghezha" :device-info="deviceInfo" @getBoxData="getBoxData" />
  </div>
</template>

<script>

import { getScreenInfo, saveScreenInfo, putScreenInfo, getBoxParam } from '@/api'
import BoxParam from './../boxParam/index.vue'
export default {
  name: 'Screen',
  components: {
    BoxParam
  },
  props: {
    itemIndex: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      enbleEdit: true,
      jizhongqiOpt: [],
      baseForm: {
        id: '',
        jizhongqi: '',
        led_id: '',
        set_name: '',
        installplace: '',
        boxSn: ''
      },
      led_id: '',
      lastContent: '',
      editContent: '',
      itemId: '',
      rules: {},
      boxSn: '',
      addrInfo: {},
      deviceInfo: {},
      chonghezha: {}
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.id != from.meta.id) {
        this.initPage()
      }
      console.log(to.meta.id)
      console.log(from.meta.id)
    }
  },
  mounted() {
    this.initPage()
  },
  methods: {
    initPage() {
      this.enbleEdit = true
      this.itemId = this.$route.meta.id
      console.log(this.$route.meta.id)
      this.getData()
    },
    async getData() {
      const params = {
        pathUrl: this.pathUrl,
        id: this.itemId,
        no: this.itemIndex
      }
      const res = await getScreenInfo(params)
      console.log(res)
      this.jiZhongQiOpt = res.jizhongqiall || []
      console.log(this.jiZhongQiOpt)
      this.baseForm.boxSn = res.boxSn
      this.led_id = this.baseForm.led_id = res.led && res.led.led_id
      this.baseForm.id = res.led && res.led.id
      this.baseForm.jizhongqi = res.led && res.led.jizhongqi
      this.baseForm.set_name = res.led && res.led.set_name
      this.baseForm.installplace = res.led && res.led.install_place // 绑定控件安装点值 G.Z 20211210
      this.lastContent = res.lastcontent
      this.boxSn = res.boxSn

      if (this.boxSn) {
        this.getBoxData()
      } else {
        this.addrInfo = {}
        this.deviceInfo = {}
        this.chonghezha = {}
      }
    },
    async getBoxData() {
      const params = {
        pathUrl: this.pathUrl,
        boxSn: this.boxSn
      }
      const res = await getBoxParam(params)
      console.log(res)
      this.addrInfo = res.addr[0]
      this.deviceInfo = res.parameters
      this.chonghezha = res.chonghezha
      this.boxData = res
    },
    async submitForm() {
      const params = {
        id: this.baseForm.id,
        pathUrl: this.pathUrl,
        luduanId: this.itemId,
        jizhongqi: this.baseForm.jizhongqi,
        setname: '',
        installplace: this.baseForm.installplace,
        ledid: this.baseForm.led_id,
        no: this.itemIndex,
        boxSn: this.baseForm.boxSn
      }
      const res = await saveScreenInfo(params)
      this.$message.success(this.$t('common.save'))
      this.initPage()
      console.log(res)
    },
    async putContent() {
      const params = {
        pathUrl: this.pathUrl,
        ledid: this.led_id,
        content: this.editContent
      }
      const res = await putScreenInfo(params)
      console.log(res)
      this.$message.success(this.$t('common.save'))
      this.initPage()
    }
  }
}
</script>

<style lang="less" scoped>
  .inner-form-wrap{
        .baseForm{
        padding: 40px;
      }
      .submit_btn{
        width: 140px;
      }
  }
  .online-show{
    margin-top: 20px;
    .video-wrap{
      padding: 40px;
      .area-item{
        .sc-tit{
           width: 408px;
          text-align: center;
          line-height: 42px;
          color: #fff;
        }
      }
      .video-item{
        width: 408px;
        height: 204px;
        background: rgba(255, 255, 255, .21);
        border-radius: 10px;
        overflow: hidden;
        &:last-child{
          margin-left: 20px;
        }
        .area-inp{
          width: 100%;
          height: 100%;
          background:none;
          color: #fff;
          border: 1px solid #e6e6e6;
          border-radius: 10px;
          overflow: hidden;
          padding: 5px;
        }
      }
    }

  }
</style>

