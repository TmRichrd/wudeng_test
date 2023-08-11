<template>
  <div class="concentrator">
    <div class="inner-form-wrap blue7 form-input">
      <div class="section-title">{{ $t('roadDetail.jbxx') }}</div>
      <el-form ref="baseForm" :label-position="'top'" :model="baseForm" :rules="rules" class="baseForm">
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item prop="id" :label="$t('roadDetail.bhxz') + '：'">
              <el-select v-model="baseForm.id" :placeholder="$t('common.select') + $t('roadDetail.bh')"
                :disabled="enbleEdit" @change="jzqChange">
                <el-option v-for="item in jizhongqiOpt" :key="item.cid" :label="item.jizhongqi" :value="item.cid" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="setname" :label="$t('roadDetail.mcsz') + '：'">
              <el-input v-model="baseForm.setname" class="area" :disabled="enbleEdit" type="text"
                :placeholder="$t('common.input') + $t('roadDetail.mcsz')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="location" :label="$t('roadDetail.azdd') + '：'">
              <el-input v-model="baseForm.location" class="area" :disabled="enbleEdit" type="text"
                :placeholder="$t('common.input') + $t('roadDetail.azdd')" />
              <!-- <el-select v-model="baseForm.region" placeholder="请选择编号">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item prop="gps" :label="$t('roadDetail.dtdw') + '：'">
              <!-- <el-input v-model="baseForm.gps" class="area" type="text" placeholder="请输入经纬度" /> -->
              <el-button type="primary" size="small" class="submit_btn blue2Btn" @click="showDot">查看</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('roadDetail.dlqk') + '：'">
              <div class="elec-wrap">
                <!-- <div class="elec-box">
                  <div :style="{width:(baseForm.dianliang?10+Number(baseForm.dianliang):0)+'%'}" class="elec" />
                </div>
                <div class="elec-val">{{ (Number(baseForm.dianliang)||0)+'%' }}</div> -->
                <div v-if="baseForm.dianliang" v-html="eleOpt[baseForm.dianliang]" />
                <div v-else>
                  <i class="fa fa-battery-0 green" />
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="boxSn" :label="$t('roadDetail.znxbh') + '：'">
              <el-input v-model="baseForm.boxSn" :disabled="enbleEdit" class="area" type="text"
                :placeholder="$t('common.input') + $t('roadDetail.znxbh')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24" style="text-align:center">
            <el-button type="primary" class="submit_btn blue2Btn" @click="enbleEdit = false">{{ $t('roadDetail.sz')
            }}</el-button>
            <el-button type="primary" class="submit_btn blue2Btn" @click="submitForm('baseForm')">{{ $t('roadDetail.bc')
            }}</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- inner-form-wrap---end -->
    <div class="run-plan-wrap blue7 form-input">
      <div class="section-title">{{ $t('roadDetail.yxfa') }}</div>
      <div class="work-mode">
        <el-form ref="runForm" :label-position="'top'" :model="runForm" class="runForm">
          <el-row :span="24">
            <el-col :span="8">
              <el-form-item prop="mode" :label="$t('roadDetail.gzms') + '：'">
                <el-select v-model="runForm.mode" :placeholder="$t('common.select') + $t('roadDetail.gzms')">
                  <el-option v-for="item in modeOpt" :key="item.value" :label="item.label" :value="item.value"
                    @click.native="runChange('mode')" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="liangdu" :label="$t('roadDetail.ldxz') + '：'">
                <el-select v-model="runForm.liangdu" :placeholder="$t('common.select') + $t('roadDetail.ldxz')">
                  <el-option v-for="item in liangduOpt" :key="item.value" :label="item.label" :value="item.value"
                    @click.native="runChange('liangdu')" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :label="$t('roadDetail.njdkz') + '：'">
                <!-- <el-input v-model="baseForm.gps" class="area" type="text" placeholder="请输入经纬度" /> -->
                <el-button type="primary" class="submit_btn blue2Btn" style="width:98px" @click="toNjd">{{
                  $t('roadDetail.sz') }}</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :label="$t('roadDetail.sjdkz') + '：'">
                <!-- <el-input v-model="baseForm.gps" class="area" type="text" placeholder="请输入经纬度" /> -->
                <el-button type="primary" class="submit_btn blue2Btn" style="width:98px" @click="toTime">{{
                  $t('roadDetail.sz') }}</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <!-- <el-col :span="8">
              <el-form-item prop="lenVal" :label="$t('roadDetail.wjcd') + '：'">
                <el-select v-model="runForm.lenVal" :placeholder="$t('common.select') + $t('roadDetail.wjcd')">
                  <el-option v-for="item in lengthOpt" :key="item.value" :label="item.label" :value="item.value"
                    @click.native="runChange('jinshi')" />
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item prop="zhankongbi" :label="$t('roadDetail.zkb') + '：'">
                <el-select v-model="runForm.zhankongbi" :placeholder="$t('common.select') + $t('roadDetail.zkb')">
                  <el-option v-for="item in zhankongbiOpt" :key="item.value" :label="item.label" :value="item.value"
                    @click.native="runChange('zhangkong')" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('roadDetail.dqcs') + '：'">
                <!-- <el-input v-model="baseForm.gps" class="area" type="text" placeholder="请输入经纬度" /> -->
                <el-button type="primary" class="submit_btn blue2Btn" @click="getParams">{{ $t('roadDetail.dqcs')
                }}</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="switch-wrap" v-show="false">
        <template v-if="shigu1.length">
          <div v-for="(item, idx) in shigu1" :key="idx" class="line-wrap">
            <span>{{ $t('roadDetail.sguld') }}{{ idx + 1 }}：</span>
            <span>{{ $t('roadDetail.wdbhc') }} </span>
            <el-input v-model="shiguArr[idx].begin" class="samll-input" :placeholder="$t('common.input')" />
            <span> {{ $t('roadDetail.zhi') }} </span>
            <el-input v-model="shiguArr[idx].end" class="samll-input" :placeholder="$t('common.input')" />
            <span class="marl20">
              <el-button v-if="idx == 0" type="primary" :disabled="shiguDisabled0" class="btn blue2Btn"
                @click="openWork(item)">{{ $t('roadDetail.kq') }}</el-button>
              <el-button v-if="idx == 1" type="primary" :disabled="shiguDisabled1" class="btn blue2Btn"
                @click="openWork(item)">{{ $t('roadDetail.kq') }}</el-button>
              <el-button v-if="idx == 0" type="primary"
                :disabled="!shiguDisabled0 || !shiguArr[idx].begin || !shiguArr[idx].end" class="btn transparent-btn"
                @click="closeWork(item)">{{ $t('roadDetail.qx') }}</el-button>
              <el-button v-if="idx == 1" type="primary"
                :disabled="!shiguDisabled1 || !shiguArr[idx].begin || !shiguArr[idx].end" class="btn transparent-btn"
                @click="closeWork(item)">{{ $t('roadDetail.qx') }}</el-button>
            </span>
          </div>
        </template>
        <template v-if="shigong.length">
          <div v-for="(item, idx) in shigong" :key="idx + 2" class="line-wrap">
            <span>{{ $t('roadDetail.sgld') }}{{ idx + 1 }}：</span>
            <span>{{ $t('roadDetail.wdbhc') }} </span>
            <el-input v-model="shigongArr[idx].begin" class="samll-input" :placeholder="$t('common.input')" />
            <span> {{ $t('roadDetail.zhi') }} </span>
            <el-input v-model="shigongArr[idx].end" class="samll-input" :placeholder="$t('common.input')" />
            <span class="marl20">
              <el-button v-if="idx == 0" type="primary" :disabled="shigongDisabled0" class="btn blue2Btn"
                @click="openWork(item)">{{ $t('roadDetail.kq') }}</el-button>
              <el-button v-if="idx == 1" type="primary" :disabled="shigongDisabled1" class="btn blue2Btn"
                @click="openWork(item)">{{ $t('roadDetail.kq') }}</el-button>
              <el-button v-if="idx == 0" type="primary"
                :disabled="!shigongDisabled0 || !shigongArr[idx].begin || !shigongArr[idx].end"
                class="btn transparent-btn" @click="closeWork(item)">{{ $t('roadDetail.qx') }}</el-button>
              <el-button v-if="idx == 1" type="primary"
                :disabled="!shigongDisabled1 || !shigongArr[idx].begin || !shigongArr[idx].end"
                class="btn transparent-btn" @click="closeWork(item)">{{ $t('roadDetail.qx') }}</el-button>
            </span>
          </div>
        </template>
        <template v-if="shigu2.length">
          <div v-for="(item, idx) in shigu2" :key="idx + 4" class="line-wrap">
            <span>{{ $t('roadDetail.sgbj') }}{{ idx + 1 }}：</span>
            <el-input v-model="shigu2Arr[idx].begin" disabled class="samll-input" placeholder="" />
            <span class="marl20">
              <el-button v-if="idx == 0" type="primary" class="btn blue2Btn" :disabled="!shigu2Disabled0"
                @click="closeWork(item)">{{ $t('roadDetail.jc') }}</el-button>
              <el-button v-if="idx == 1" type="primary" class="btn blue2Btn" :disabled="!shigu2Disabled1"
                @click="closeWork(item)">{{ $t('roadDetail.jc') }}</el-button>
            </span>
          </div>
        </template>
      </div>
    </div>
    <!-- <box-param :addr-info="addrInfo" :box-sn="boxSn" :chonghezha="chonghezha" :device-info="deviceInfo"
      @getBoxData="getBoxData" /> -->

    <el-dialog :visible.sync="showMap" width="70%" :title="$t('roadDetail.dtdw')">
      <div class="dialog-content hasPos">
        <el-button v-if="selectGps" type="warning" size="small" class="btn save-gps" @click="saveGps">{{
          $t('roadDetail.qr') }}</el-button>
        <el-button type="warning" size="small" class="btn gps-location" @click="gpsLocation">{{ $t('roadDetail.gpsdw')
        }}</el-button>
        <baidu-map v-if="showMap" class="map" :scroll-wheel-zoom="true" :center="mapCenter" :zoom="12" @click="getGps"
          @ready="mapReady">
          <!-- <bm-marker v-if="baseForm.gps" :position="mapCenter">
            <bm-info-window :show="Boolean(infoIndex===index)" style="font-size:13px" @close="showWindowInfo">
              {{ item.luduan }}<br>
              能见度：{{ item.njd }}
            </bm-info-window>
          </bm-marker> -->
          <bm-marker v-if="selectGps" :position="selectGps" />
        </baidu-map>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoadConcentrator, getJizhognQiList, saveJzqBaseInfo, getParamsData, getBoxParam, roadRunModify, roadRunModifyResult, roadShiguLight, roadShiguLightCancel, setJzqGps, getGpsLocation } from '@/api'
import BoxParam from './../boxParam/index.vue'
export default {
  name: 'Concentrator',
  components: {
    BoxParam
  },
  data () {
    return {
      showMap: false,
      mapCenter: { lng: 113.741390, lat: 23.3003105 },
      selectGps: '', // 用户选择的经纬度
      // showMapInfo:{},
      infoIndex: '',
      enbleEdit: true,
      pathUrl: this.$route.path,
      itemId: '',
      boxSn: '',
      jizhongqiId: '',
      baseForm: {
        luduanid: '',
        id: '',
        setname: '',
        location: '',
        gps: '',
        dianliang: '',
        boxSn: ''
      },
      runForm: {
        mode: '',
        liangdu: '',
        zhankongbi: '',
        lenVal: ''
      },
      shiguArr: [
        {
          begin: '',
          end: '',
          disable: false
        }, {
          begin: '',
          end: '',
          disable: false
        }
      ],
      shigu2Arr: [
        {
          begin: '',
          disable: false
        }, {
          begin: '',
          disable: false
        }
      ],
      shigongArr: [
        {
          begin: '',
          end: '',
          disable: false
        },
        {
          begin: '',
          end: '',
          disable: false
        }
      ],
      addrInfo: {},
      deviceInfo: {},
      chonghezha: {},
      shigu1: [
        { type: 'shigu', idx: 0, begin: '', end: '', status: null, id: '' },
        { type: 'shigu', idx: 1, begin: '', end: '', status: null, id: '' }
      ], // 事故数据
      shigu2: [
        { type: 'shigu', idx: 0, begin: '', status: null, id: '' },
        { type: 'shigu', idx: 1, begin: '', status: null, id: '' }
      ], // 事故数据
      shigong: [
        { type: 'shigong', idx: 0, begin: '', end: '', status: null, id: '' },
        { type: 'shigong', idx: 1, begin: '', end: '', status: null, id: '' }
      ], // 施工数据
      jizhongqiOpt: [],
      rules: {
        setname: [
          { required: true, message: this.$t('common.input') + this.$t('addRoad.roadname'), trigger: 'blur' }
        ]
      },
      modeOpt: [
        {
          "value": "00",
          "label": "自动运行"
        },
        {
          "value": "01",
          "label": "黄灯常亮"
        },
        {
          "value": "02",
          "label": "黄闪30次/分钟"
        },
        {
          "value": "03",
          "label": "黄闪60次/分钟"
        },
        {
          "value": "04",
          "label": "黄闪90次/分钟"
        },
        {
          "value": "05",
          "label": "黄闪120次/分钟"
        },
        {
          "value": "06",
          "label": "防追尾警示"
        },
        // {
        //   "value": "07",
        //   "label": "交通事故警示"
        // },
        {
          "value": "08",
          "label": "安装调试"
        },
        {
          "value": "09",
          "label": "灭灯"
        },
        {
          "value": "0a",
          "label": "顺序流水"
        },
        {
          "value": "0b",
          "label": "逆向流水"
        },
        // {
        //   "value": "0c",
        //   "label": "车辆感应触发启动"
        // },
        // {
        //   "value": "0d",
        //   "label": "红灯常亮"
        // },
        // {
        //   "value": "0e",
        //   "label": "红闪30次/分钟"
        // },
        // {
        //   "value": "0f",
        //   "label": "红闪60次/分钟"
        // },
        // {
        //   "value": "10",
        //   "label": "红闪90次/分钟"
        // },
        // {
        //   "value": "11",
        //   "label": "红闪120次/分钟"
        // }
      ],
      liangduOpt: [],
      zhankongbiOpt: [],
      lengthOpt: []
    }
  },
  computed: {
    shiguDisabled0: function () {
      if (this.shiguArr[0].begin && this.shiguArr[0].end && this.shiguArr[0].begin == this.shigu1[0].begin && this.shiguArr[0].end == this.shigu1[0].end && this.shigu1[0].status == '1')
      {
        return true
      }
      if (!this.shiguArr[0].begin || !this.shiguArr[0].end)
      {
        return true
      }
      return false
    },
    shiguDisabled1: function () {
      if (this.shiguArr[1].begin && this.shiguArr[1].end && this.shiguArr[1].begin == this.shigu1[1].begin && this.shiguArr[1].end == this.shigu1[1].end && this.shigu1[1].status == '1')
      {
        return true
      }
      if (!this.shiguArr[1].begin || !this.shiguArr[1].end)
      {
        return true
      }
      return false
    },
    shigu2Disabled0: function () {
      if (this.shigu2Arr[0].begin && this.shigu2Arr[0].begin == this.shigu2[0].begin && this.shigu2[0].status == '1')
      {
        return true
      }
      return false
    },
    shigu2Disabled1: function () {
      if (this.shigu2Arr[1].begin && this.shigu2Arr[1].begin == this.shigu2[1].begin && this.shigu2[1].status == '1')
      {
        return true
      }
      return false
    },
    shigongDisabled0: function () {
      if (this.shigongArr[0].begin && this.shigongArr[0].end && this.shigongArr[0].begin == this.shigong[0].begin && this.shigongArr[0].end == this.shigong[0].end && this.shigong[0].status == '1')
      {
        return true
      }
      if (!this.shigongArr[0].begin || !this.shigongArr[0].end)
      {
        return true
      }
      return false
    },
    shigongDisabled1: function () {
      if (this.shigongArr[1].begin && this.shigongArr[1].end && this.shigongArr[1].begin == this.shigong[1].begin && this.shigongArr[1].end == this.shigong[1].end && this.shigong[1].status == '1')
      {
        return true
      }
      if (!this.shigongArr[1].begin || !this.shigongArr[1].end)
      {
        return true
      }
      return false
    }
  },
  watch: {
    $route (to, from) {
      if (to.meta.id != from.meta.id)
      {
        console.log(222)
        this.initPage()
      }
      console.log(to.meta.id)
      console.log(from.meta.id)
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    async initPage () {
      this.enbleEdit = true
      this.itemId = this.$route.meta.id
      this.baseForm.luduanid = this.itemId
      console.log(this.$route.meta.id)
      this.getJizhongqiData()
      this.getData()
    },
    mapReady ({ map, BMap }) { // 地图初始化完成-添加自定义样式
      // map.setMapStyle({
      //   styleJson: BMapJson
      // })
      map.setMapStyleV2({ styleId: 'b2a5cf3f2709221ab9a68e0872eec809' })
    },
    async getParams () { // 读取参数
      const params = {
        pathUrl: this.pathUrl,
        id: this.itemId
      }
      console.log(params)
      try
      {
        const res = await getParamsData(params)
        console.log(res)
        this.awiatResult(res, roadRunModifyResult, 'Y')
      } catch (error)
      {
        this.initPage()
      }
    },
    async showDot () {
      await this.initPage()
      // if (!this.baseForm.gps) {
      //   this.$message.error('暂无经纬度信息，无法查看地图')
      //   return
      // }

      if (!this.baseForm.id)
      {
        this.$message.error(this.$t('roadDetail.selectjzq'))
        return
      }
      console.log(this.baseForm.gps)
      if (this.baseForm.gps)
      {
        const dot = this.baseForm.gps.split(',')
        this.transformGps(new window.BMap.Point(dot[0], dot[1]))
      }
      this.showMap = true
    },
    transformGps (pointArr) {
      const self = this
      function translateCallback (data) {
        if (data.status === 0)
        {
          console.log(data)
          var point = new window.BMap.Point(data.points[0].lng, data.points[0].lat)
          console.log(point)
          self.mapCenter = point
          self.selectGps = point
        }
      }
      const convertor = new window.BMap.Convertor()
      convertor.translate([pointArr], 1, 5, translateCallback)
    },
    async saveGps () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.jizhongqiId,
        location: `${this.selectGps.lng},${this.selectGps.lat}`
      }
      console.log(params)
      const res = await setJzqGps(params)
      console.log(res)
      this.$message.success(this.$t('common.save'))
      this.initPage()
      this.showMap = false
    },
    getGps (e) {
      this.selectGps = e.point
    },
    async gpsLocation () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.jizhongqiId
      }
      await getGpsLocation(params)
      this.$message.success(this.$t('roadDetail.dwcg'))
      this.initPage()
      this.showMap = false
    },
    // showWindowInfo(index) {
    //   console.log(index)
    //   this.infoIndex = index
    //   console.log(this.infoIndex)
    // },
    async getData () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.itemId
      }
      const res = await getRoadConcentrator(params)
      console.log(res)
      for (const item in this.baseForm)
      {
        this.baseForm[item] = res.base[item] || ''
      }
      this.jizhongqiId = res.base.id
      this.boxSn = res.base.boxSn
      const gongneng = res.gongnenng
      for (let i = 0; i < 2; i++)
      {
        if (res.tebie.shigong)
        {
          const temp = res.tebie.shigong[i] || {}
          this.shigongArr[i].begin = temp.begin || ''
          this.shigongArr[i].end = temp.end || ''
          this.shigong[i].begin = temp.begin || ''
          this.shigong[i].end = temp.end || ''
          this.shigong[i].status = temp.status || ''
          this.shigong[i].id = temp.id || ''
        }
        if (res.tebie.shigu1)
        {
          const temp = res.tebie.shigu1[i] || {}
          this.shiguArr[i].begin = temp.begin || ''
          this.shiguArr[i].end = temp.end || ''
          this.shigu1[i].begin = temp.begin || ''
          this.shigu1[i].end = temp.end || ''
          this.shigu1[i].status = temp.status || ''
          this.shigu1[i].id = temp.id || ''
        }
        if (!res.tebie.shigu2)
        {
          this.shigu2Arr[i].begin = ''
          this.shigu2[i].status = ''
          this.shigu2[i].id = ''
          this.shigu2[i].begin = ''
        }
        if (res.tebie.shigu2)
        {
          const temp = res.tebie.shigu2[i] || {}
          this.shigu2Arr[i].begin = temp.begin || ''
          this.shigu2[i].status = temp.status || ''
          this.shigu2[i].id = temp.id || ''
          this.shigu2[i].begin = temp.begin || ''
        }
      }
      // this.modeOpt = this.creatOpt(gongneng.a11.data, 'sort')
      this.liangduOpt = this.creatOpt(gongneng.a2.data)
      this.zhankongbiOpt = this.creatOpt(gongneng.a8.data)
      this.lengthOpt = this.creatOpt(gongneng.a3.data)
      // this.eleOpt = gongneng.b7.data[this.$t('roadDetail.dianliang')]
      this.eleOpt = gongneng.b7.data[this.$t('roadDetail.dianliang')]
      console.log(this.eleOpt, 99)
      this.runForm.mode = res.case.gzms
      this.runForm.liangdu = res.case.liangdu
      this.runForm.zhankongbi = res.case.zhankongbi
      this.runForm.lenVal = res.case.qujianchangdu
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
    async getJizhongqiData () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.itemId
      }
      const res = await getJizhognQiList(params)
      this.jizhongqiOpt = res
      console.log(res)
    },
    creatOpt (obj, isSort) {
      if (typeof obj !== 'object') return
      const keys = Object.keys(obj)
      const opt = []
      if (isSort)
      {
        keys.map(item => {
          const newKey = item.split('-')[1]
          opt.push({ value: newKey, label: obj[item] })
        })
      } else
      {
        keys.map(item => {
          opt.push({ value: item, label: obj[item] })
        })
      }

      return opt
    },
    async submitForm (editForm) {
      if (!this.baseForm.id)
      {
        this.$message.error(this.$t('roadDetail.selectjzq'))
        return
      }
      this.$refs[editForm].validate(async (valid) => {
        if (valid)
        {
          const params = {
            pathUrl: this.pathUrl,
            id: this.itemId,
            jzqId: this.baseForm.id,
            setName: this.baseForm.setname,
            location: this.baseForm.location,
            gps: this.baseForm.gps,
            boxSn: this.baseForm.boxSn
          }
          const res = await saveJzqBaseInfo(params)
          this.$message.success(this.$t('common.save'))
          this.initPage()
          this.$store.dispatch('resetRouter')
          console.log(res)
        }
      })
    },
    // 集中器选择触发
    jzqChange (e) {
      console.log(e)
      this.jizhongqiOpt.map(item => {
        if (e === item.cid)
        {
          this.baseForm.id = item.cid
          this.baseForm.setname = item.set_name
          this.baseForm.location = item.location
          this.baseForm.gps = item.gps
          this.baseForm.dianliang = item.dianliang || 0
        }
      })
    },
    async openWork (item) {
      console.log(item)
      const params = {
        jzqId: this.jizhongqiId,
        pathUrl: this.pathUrl,
        begin: '',
        end: '',
        type: item.type
      }
      if (item.type === 'shigu')
      {
        params.begin = this.shiguArr[item.idx].begin
        params.end = this.shiguArr[item.idx].end
      }
      if (item.type === 'shigong')
      {
        params.begin = this.shigongArr[item.idx].begin
        params.end = this.shigongArr[item.idx].end
      }
      console.log(params)
      try
      {
        const res = await roadShiguLight(params)
        console.log(res)
        this.awiatResult(res, roadRunModifyResult, 'Y')
      } catch (error)
      {
        this.initPage()
      }
    },
    async closeWork (item) {
      console.log(item)
      const params = {
        pathUrl: this.pathUrl,
        id: item.id
      }
      try
      {
        const res = await roadShiguLightCancel(params)
        console.log(res)
        this.awiatResult(res, roadRunModifyResult, 'Y')
      } catch (error)
      {
        this.initPage()
      }
    },
    cancelLight (item) {
      console.log(item)
    },
    async runChange (type) {
      console.log(type)
      if (!this.jizhongqiId)
      {
        this.$message.warning(this.$t('roadDetail.selectjzqother'))
        return
      }
      const params = {
        cid: this.jizhongqiId,
        pathUrl: this.pathUrl,
        zhiling: '',
        data: ''
      }
      switch (type)
      {
        case 'mode':
          params.zhiling = 'a1'
          params.data = this.runForm.mode
          break
        case 'liangdu':
          params.zhiling = 'a2'
          params.data = this.runForm.liangdu
          break
        case 'zhangkong':
          params.zhiling = 'a8'
          params.data = this.runForm.zhankongbi
          break
        case 'jinshi':
          params.zhiling = 'a3'
          params.data = this.runForm.lenVal
          break
      }
      console.log(params)
      try
      {
        const res = await roadRunModify(params)
        console.log(res)
        this.awiatResult(res, roadRunModifyResult, 'Y')
      } catch (error)
      {
        this.initPage()
      }
    },
    async awiatResult (val, funName, successCode) {
      const loading = this.$loading({
        lock: true,
        text: this.$t('roadDetail.zhilingzhixing'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const params = {
        pathUrl: this.pathUrl,
        cmd: val
      }
      let count = 0
      const timer = setInterval(async () => {
        count = count + 1
        if (count >= 5)
        {
          clearInterval(timer)
          loading.close()
        }
        const res = await funName(params)
        if (res === successCode)
        {
          clearInterval(timer)
          setTimeout(() => {
            loading.close()
            this.$message.success(this.$t('common.success'))
            this.initPage()
          }, 2000)
        } else
        {
          this.$message.error(this.$t('common.error'))
          this.initPage()
        }
      }, 1000)
    },
    toNjd () {
      if (!this.jizhongqiId)
      {
        this.$message.warning(this.$t('roadDetail.selectjzqother'))
        return
      }
      this.$router.push({ path: '/systemSet/visibilityControl', query: { jizhongqiId: this.jizhongqiId } })
    },
    toTime () {
      if (!this.jizhongqiId)
      {
        this.$message.warning(this.$t('roadDetail.selectjzqother'))
        return
      }
      this.$router.push({ path: '/systemSet/timeControl', query: { jizhongqiId: this.jizhongqiId } })
    }
  }
}
</script>
<style lang="less">
.run-paramer-wrap {
  position: relative;

  .el-tabs__nav {
    float: right;
    margin-right: 100px;
  }

  .section-title {
    // line-height: 40px;
    position: absolute;
    width: 300px;
    left: 0;
    top: 0;
    border-bottom: none;
  }
}

.el-tabs__nav-wrap::after {
  background: @adminBlue8 !important;
}
</style>
<style lang="less" scoped>
.elec-wrap {
  display: flex;
  width: 100%;
  line-height: 20px;

  .elec-box {
    width: 136px;
    height: 20px;
    background: #fff;
    border-radius: 20px;

    .elec {
      background: #F7B500;
      height: 100%;
      border-radius: 20px;
    }
  }

  .elec-val {
    margin-left: 14px;
  }
}

.inner-form-wrap {
  .baseForm {
    padding: 40px;
  }

  .submit_btn {
    width: 140px;
  }
}

.run-plan-wrap {
  margin-top: 20px;

  .work-mode {
    padding: 40px;

    .set-wrap {
      margin-top: 50px;

      .line {
        margin-right: 60px;

        .to-link {
          color: @btnPrimary2;
          cursor: pointer;
          margin-left: 20px;
        }
      }
    }
  }

  .switch-wrap {
    border-top: 1px solid @adminBlue8;
    padding: 40px;

    .line-wrap {
      margin-bottom: 20px;

      .btn {
        width: 90px;
      }
    }
  }
}

.dialog-content {
  width: 100%;
  height: 500px;

  &.hasPos {
    position: relative;
  }

  .save-gps,
  .gps-location {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 999;
  }

  .save-gps {
    left: 10px;
  }

  .gps-location {
    left: 80px;
  }

  .map {
    width: 100%;
    height: 100%;
  }
}
</style>

