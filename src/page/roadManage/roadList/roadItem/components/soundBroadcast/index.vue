<template>
  <div class="sound-broadcast">
    <div class="inner-form-wrap blue7 form-input">
      <div class="section-title">{{ $t('roadDetail.jbxx') }}</div>
      <el-form ref="baseForm" :label-position="'top'" :rules="rules" :model="baseForm" class="baseForm">
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item prop="jizhongqi" :label="$t('roadDetail.jzqbh') + '：'">
              <el-select v-model="baseForm.jizhongqi" :disabled="enbleEdit"
                :placeholder="$t('common.select') + $t('roadDetail.bh')">
                <el-option v-for="item in jiZhongQiOpt" :key="item.jizhongqi" :label="item.jizhongqi"
                  :value="item.jizhongqi" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="boxSn" :label="$t('roadDetail.znxbh') + '：'">
              <el-input v-model="baseForm.boxSn" class="area" :disabled="enbleEdit" type="text"
                :placeholder="$t('common.input') + $t('roadDetail.znxbh')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="installplace" :label="$t('roadDetail.azdidian') + '：'">
              <el-input v-model="baseForm.installplace" :disabled="enbleEdit" class="area" type="text"
                :placeholder="$t('common.input') + $t('addRoad.roadname')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item prop="yinzhu" :label="$t('roadDetail.yzxlh') + '：'">
              <el-input v-model="baseForm.yinzhu" class="area" :disabled="enbleEdit" type="text"
                :placeholder="$t('roadDetail.yzplaceholder')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24" style="text-align:center">
            <el-button type="primary" class="submit_btn blue2Btn" @click="enbleEdit = false">{{ $t('roadDetail.sz') }}</el-button>
            <el-button type="primary" class="submit_btn blue2Btn" @click="submitForm('baseForm')">{{ $t('roadDetail.bc') }}</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <box-param :addr-info="addrInfo" :box-sn="boxSn" :chonghezha="chonghezha" :device-info="deviceInfo"
      @getBoxData="getBoxData" />
  </div>
</template>

<script>
import { getAudioInfo, saveAudioInfo, getBoxParam } from '@/api'
import BoxParam from './../boxParam/index.vue'
export default {
  name: 'SoundBroadcast',
  components: {
    BoxParam
  },
  props: {
    itemIndex: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      enbleEdit: true,
      pathUrl: this.$route.path,
      itemId: '',
      boxSn: '',
      baseForm: {
        id: '',
        jizhongqi: '',
        installplace: '',
        yinzhu: '',
        boxSn: '',
        no: ''
      },
      addrInfo: {},
      deviceInfo: {},
      chonghezha: {},
      jiZhongQiOpt: [],
      rules: {
        jizhongqi: [
          { required: true, message: this.$t('roadDetail.selectjzq'), trigger: 'blur' }
        ],
        yinzhu: [
          { required: true, message: this.$t('common.input') + this.$t('roadDetail.yzxlh'), trigger: 'blur' }
        ]
        // boxSn: [
        //   { required: true, message: '请输入路段名称', trigger: 'blur' }
        // ],
        // no: [
        //   { required: true, message: '请输入路段名称', trigger: 'blur' }
        // ]
      }
    }
  },
  watch: {
    $route (to, from) {
      if (to.meta.id !== from.meta.id)
      {
        console.log(222)
        this.initPage()
      }
      console.log(to.meta.id)
      console.log(from.meta.id)
    }
  },
  created () {
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.enbleEdit = true
      this.itemId = this.$route.meta.id
      this.getData()
    },
    async getData () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.itemId,
        no: this.itemIndex
      }
      const res = await getAudioInfo(params)
      console.log(res)
      this.jiZhongQiOpt = res.jizhongqiall
      // if (res.yinzhu){
      this.baseForm.id = res.yinzhu && res.yinzhu.id // 防止音柱对象是空  G.Z 20211210
      // }
      this.baseForm.jizhongqi = res.jizhongqi
      this.baseForm.yinzhu = res.yinzhu && res.yinzhu.yinzhu // 防止音柱对象是空  G.Z 20211210
      this.baseForm.boxSn = res.boxsn
      this.baseForm.installplace = res.yinzhu && res.yinzhu.installplace
      this.boxSn = res.boxsn
      if (this.boxSn)
      {
        this.getBoxData()
      } else
      {
        this.addrInfo = {}
        this.deviceInfo = {}
        this.chonghezha = {}
      }
    },
    async getBoxData () {
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
    async submitForm () {
      const params = {
        luduanId: this.itemId,
        installplace: this.baseForm.installplace,
        pathUrl: this.pathUrl,
        id: this.baseForm.id,
        jizhongqi: this.baseForm.jizhongqi,
        no: this.itemIndex,
        boxSn: this.baseForm.boxSn,
        yinzhu: this.baseForm.yinzhu
      }
      const res = await saveAudioInfo(params)
      this.$message.success(this.$t('common.save'))
      this.getData()
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.sound-broadcast {
  .inner-form-wrap {
    .baseForm {
      padding: 40px;
    }

    .submit_btn {
      width: 140px;
    }
  }
}
</style>

