<template>
  <div class="dashboard">
    <div class="top-bg">
      <span>{{ $t('technologyMantain.xtsbyxzkzl') }}</span>
    </div>
    <div class="data-content">
      <div class="card-wrap">
        <div v-for="(item, index) in cardList" :key="index" class="card-item">
          <div class="num">{{ item.num }}</div>
          <div class="tit">{{ item.name }}</div>
        </div>
      </div>
      <div class="echart-wrap">
        <div class="echart-item four-border">
          <div class="pie-item">
            <pie-pic :id="'jizhongqi'" :title="$t('technologyMantain.jzqzx')" :show-percent="true" :pie-data="pieData" />
          </div>
        </div>
        <div class="echart-item four-border">
          <line-pic :line-data="lineData" />
        </div>

      </div>
      <div class="echart-wrap">
        <div class="echart-item four-border">
          <div class="pie-item has-icon">
            <img v-if="Number(shiguAlarm) > 0" src="./../../../assets/images/alarm_bg.png">
            <img v-else src="./../../../assets/images/normal_bg.png">

          </div>
        </div>
        <div class="echart-item two-pie-wrap four-border">
          <div class="pie-item">
            <pie-pic :id="'pie-two'" :title="$t('technologyMantain.ledzx')" :show-percent="false" :pie-data="pieData2" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getTechnologyData } from '@/api'
import LinePic from './components/linePic.vue'
import PiePic from './components/piePic.vue'
export default {
  name: 'Dashboard',
  components: {
    LinePic,
    PiePic
  },
  data () {
    return {
      pieData: [],
      pieData2: [],
      lineData: [],
      shiguAlarm: '',
      cardList: [
        { name: this.$t('technologyMantain.ld'), num: 0, key: 'totalLuDuan' },
        // { name: this.$t('technologyMantain.qbb'), num: 0, key: 'ledNum' },
        // { name: this.$t('technologyMantain.sxt'), num: 0, key: 'cameraNum' },
        // { name: this.$t('technologyMantain.gbxt'), num: 0, key: 'guangBoNum' },
        { name: this.$t('technologyMantain.jzqzx'), num: 0, key: 'jiZhongQiOnNum' },
        { name: this.$t('technologyMantain.jzqlx'), num: 0, key: 'jiZhongQiOffNum' },
        { name: this.$t('technologyMantain.wdzx'), num: 0, key: 'lightOnNum' },
        { name: this.$t('technologyMantain.wdlx'), num: 0, key: 'lightOffNum' },
        // { name: this.$t('technologyMantain.znjx'), num: 0, key: 'jiXiangNum' }
      ]
    }
  },
  created () {
  },
  mounted () {
    console.log(this.$route.path)
    this.getData()
  },
  methods: {
    async getData () {
      const res = await getTechnologyData({ pathUrl: this.$route.path })
      console.log(res)
      const panleData = res.deviceAll
      this.lineData = res.wudeng || []
      this.shiguAlarm = res.jiaotongshigu
      const ledData = res.led || {}
      this.pieData2 = [
        { name: this.$t('technologyMantain.ledzx'), value: ledData.led_on_num || 0 },
        { name: this.$t('technologyMantain.ledlx'), value: ledData.led_off_num || 0 }
      ]
      this.cardList.forEach(item => {
        if (panleData[item.key])
        {
          item.num = panleData[item.key]
        }
        if (item.key === 'jiZhongQiOnNum' || item.key === 'jiZhongQiOffNum')
        {
          item.value = item.num
          this.pieData.push(item)
          console.log(this.pieData)
        }
      })
    }
  }
}
</script>

<style></style>
<style lang="less" scoped>
.dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  // background-color: @adminBlue6;
  .top-bg {
    text-align: center;
    width: 100%;
    height: 66px;
    background: url('./../../../assets/images/home_top_bg.png') no-repeat left;
    background-size: 100% auto;

    span {
      font-size: 24px;
      line-height: 60px;
      color: #89B2FF;
    }
  }

  .data-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 25px;
    padding: 0 27px;
  }

  .card-wrap {
    width: 100%;
    height: 70.6px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 100px;
    justify-content: space-between;

    .card-item {
      width: 100%;
      height: 70.6px;
      box-shadow: inset 0px 1px 22px 0px #14429E;
      text-align: center;
      padding: 13px;

      .num {
        font-size: 24px;
        line-height: 32px;
        color: @adminTextBlue2;
      }

      .tit {
        line-height: 18px;
        font-size: 12px;
        color: @adminTextBlue3;
      }
    }
  }

  .map-wrap {
    width: 100%;
    flex: 1;
    margin-top: 30px;
    padding: 2px;

    .map {
      width: 100%;
      height: 100%;
    }
  }

  .echart-wrap {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    .echart-item {
      padding: 20px;
      height: calc((100vh - 286px) / 2);
      width: 46%;
      box-shadow: inset 0px 1px 22px 0px #14429E;
    }

    .pie-item {
      width: 100%;
      height: 100%;

      &.has-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        img {
          width: auto;
          height: 100%;
          margin-top: -1.375rem;
        }
      }

    }
  }
}
</style>
