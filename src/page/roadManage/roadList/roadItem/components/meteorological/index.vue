<template>
  <div class="meteorological">
    <div class="pic-show blue7">
      <div class="section-title">{{ $t('roadDetail.jbxx') }}</div>
      <div class="inp-wrap">
        <div>{{ $t('roadDetail.znxbh') }}：</div>
        <el-input v-model="boxNo" class="area" type="text" :disabled="enbleEdit"
          :placeholder="$t('common.input') + $t('roadDetail.znxbh')" />
        <el-button type="primary" class="submit_btn blue2Btn" @click="enbleEdit = false">{{ $t('roadDetail.sz')
        }}</el-button>
        <el-button type="primary" :disabled="!boxNo" class="submit_btn blue2Btn" @click="bindBox">{{ $t('roadDetail.bc')
        }}</el-button>
      </div>
      <div class="section-title">{{ $t('home.njd') }}：{{ latestNjd }}</div>
      <div class="search-wrap">
        <div>{{ $t('roadDetail.riqi') }}：
          <el-date-picker :picker-options="pickerOptions" :clearable="false" v-model="searchDate" type="daterange"
            range-separator="—" value-format="yyyy-MM-dd" :start-placeholder="$t('roadDetail.kaishi')"
            :end-placeholder="$t('roadDetail.jieshu')" size="mini" />
        </div>
        <div class="btn-wrap">
          <el-button type="primary" size="small" class="add-btn blue2Btn" @click="getData">{{ $t('roadDetail.sous')
          }}</el-button>
        </div>
      </div>
      <div class="echart-wrap">
        <line-pic :line-data="lineData" ref="linePicRef" />
      </div>
      <!-- <box-param :addr-info="addrInfo" :box-sn="boxSn" :chonghezha="chonghezha" :device-info="deviceInfo"
        @getBoxData="getBoxData" /> -->
    </div>
  </div>
</template>

<script>
import LinePic from './linePic.vue'
import { bindRoadBox, getMeteorological, getBoxParam } from '@/api'
import BoxParam from './../boxParam/index.vue'
import dayjs from "dayjs"
export default {
  name: 'Screen',
  components: {
    BoxParam,
    LinePic
  },
  data () {
    return {
      pickerOptions: {
        disabledDate: (time) => {
          // 选中第一个后，后一个前后3个月可选，超出的不可选，超出当前天也不可选，这里的月份按需求设定
          const minTime = new Date(this.startDate).setMonth(new Date(this.startDate).getMonth() - 3)
          const maxTime = new Date(this.startDate).setMonth(new Date(this.startDate).getMonth() + 3)
          return time.getTime() > Date.now() || (this.startDate ? (time.getTime() < minTime || time.getTime() > maxTime) : false)
        },
        onPick: ({ maxDate, minDate }) => {
          this.startDate = minDate && minDate.getTime()
          if (maxDate)
          {
            // 选中后一个时，要把第一个的赋值清空
            this.startDate = ''
          }
        }
      },
      // 设置默认一周值
      searchDate: [
        dayjs().subtract(7, 'day').format("YYYY-MM-DD"),
        dayjs().format("YYYY-MM-DD")
      ],
      startDate: "",
      enbleEdit: true,
      boxNo: '',
      pathUrl: this.$route.path,
      itemId: '',
      boxSn: '',
      lineData: [],
      addrInfo: {},
      deviceInfo: {},
      chonghezha: {},
      latestNjd: ''
    }
  },
  watch: {
    $route (to, from) {
      if (to.meta.id != from.meta.id)
      {
        this.initPage()
      }
    }
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
      this.$refs.linePicRef.loading()
      try
      {
        const params = {
          pathUrl: this.pathUrl,
          id: this.itemId,
          startdate: this.searchDate[0] || '',
          enddate: this.searchDate[1] || ''
        }
        const res = await getMeteorological(params)
        this.boxSn = res.smartBox
        this.boxNo = res.smartBox
        this.latestNjd = res.latestNjd
        this.lineData = res.list || []
        if (this.boxSn)
        {
          this.getBoxData()
        } else
        {
          this.addrInfo = {}
          this.deviceInfo = {}
          this.chonghezha = {}
        }
      } catch (error)
      {

      } finally
      {
        this.$refs.linePicRef.unloading()
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
    async bindBox () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.itemId,
        boxSn: this.boxNo
      }
      const res = await bindRoadBox(params)
      console.log(res)
      this.$message.success(this.$t('common.save'))
      this.initPage()
    }
  }
}
</script>

<style lang="less" scoped>
.meteorological {
  .pic-show {
    margin-top: 20px;

    .search-wrap {
      display: flex;
      justify-content: center;
      padding: 20px;

      .btn-wrap {
        margin-left: 20px;
      }
    }

    .echart-wrap {
      padding: 20px;
      width: 100%;
      height: 400px;
    }
  }

  .inp-wrap {
    display: flex;
    line-height: 40px;
    padding: 30px 21px;

    // border-bottom: 1px solid #274785;
    .area {
      width: 200px;
      margin: 0 30px;
    }
  }
}
</style>

