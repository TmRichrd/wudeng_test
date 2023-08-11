<template>
  <div class="dashboard">
    <div class="top-bg">
      <span v-if="companyName">{{ companyName }}{{ $t('home.title') }}</span>
      <span v-else>{{ $t('home.title') }}</span>
    </div>
    <div class="data-content">
      <div class="card-wrap">
        <div v-for="(item, index) in cardList" :key="index" class="card-item">
          <div class="num">{{ item.num }}</div>
          <div class="tit">{{ $t(item.name) }}</div>
        </div>
      </div>
      <div class="map-wrap four-border">
        <baidu-map class="map" :scroll-wheel-zoom="true" :center="markArr[0]" :zoom="17" @ready="mapReady">
          <template v-for="(item, index) in dotArr">
            <bm-marker v-if="item.gps" :key="index" :position="item.gps" @dblclick="toDotDetail($event, item)"
              @mouseover="showWindowInfo(index)" @mouseout="showWindowInfo">
              <bm-info-window :show="Boolean(infoIndex === index)" :offset="{ width: '0', height: '40' }" :auto-pan="true"
                style="font-size:13px">
                <div class="map-info-wrap four-border">
                  <div>{{ item.set_name }}</div>
                  <!-- <div>工作模式：{{ item.njd }}</div>
                  <div>亮度：{{ item.njd }}</div> -->
                  <!-- <div>占空比：{{ item.njd }}</div>
                  <div>区间长度：{{ item.njd }}</div> -->
                  <div>{{ $t('home.njd') }} ：{{ item.njd }}</div>
                  <!-- <div>电量：{{ item.njd }}</div>
                  <div>光控等级：{{ item.njd }}</div> -->
                  <div>{{ $t('home.position') }} ：{{ item.location }}</div>
                </div>
              </bm-info-window>
            </bm-marker>
          </template>
        </baidu-map>
        <!-- 样式id:  b2a5cf3f2709221ab9a68e0872eec809 -->
      </div>
      <div class="echart-wrap">
        <div class="echart-item four-border">
          <line-pic :line-data="lineData" />
        </div>
        <div class="echart-item four-border">
          <bar-pic :bar-data="barData" />
        </div>
        <div class="echart-item four-border">
          <pie-pic :id="'pie-one'" :title="$t('home.tenvisibility')" :pie-data="pieData" />
        </div>
        <div class="echart-item four-border">
          <pie-pic :id="'pie-two'" :title="$t('home.thirtyvisibility')" :pie-data="pieData2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIndexInfo } from '@/api'
// import BMapJson from '@/config/BMap.json'
import LinePic from './components/linePic.vue'
import BarPic from './components/barPic.vue'
import PiePic from './components/piePic.vue'
export default {
  name: 'Dashboard',
  components: {
    LinePic,
    BarPic,
    PiePic
  },
  data () {
    return {
      companyName: JSON.parse(sessionStorage.getItem('userinfo') || {}).company, // 公司名称
      markerPoint: { lng: 116.4, lat: 39.9 },
      markArr: [],
      infoIndex: '',
      dotArr: [],
      lineData: [],
      barData: [],
      pieData: [],
      pieData2: [],
      cardList: [
        { name: 'home.road', num: 0, key: 'totalLuDuan' },
        // { name: 'home.board', num: 0, key: 'ledNum' },
        // { name: 'home.camera', num: 0, key: 'cameraNum' },
        // { name: 'home.broadcasting', num: 0, key: 'guangBoNum' },
        { name: 'home.concentrator', num: 0, key: 'jiZhongQi' },
        { name: 'home.fognum', num: 0, key: 'lightNum' },
        // { name: 'home.chassis', num: 0, key: 'jiXiangNum' }
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
      const res = await getIndexInfo({ pathUrl: this.$route.path })
      const panleData = res.item1[0]
      this.cardList.forEach(item => {
        if (panleData[item.key])
        {
          item.num = panleData[item.key]
        }
      })
      this.dotArr = res.item2 || []
      if (this.dotArr && this.dotArr.length)
      {
        this.dotArr.forEach(async (item) => {
          if (item.baidu_gps)
          {
            const dot = item.baidu_gps.split(',')
            const newPoint = await this.transformGps(new window.BMap.Point(dot[0], dot[1]))

            // item.gps = { lng: dot[0], lat: dot[1] }
            // this.markArr.push(item.gps)
            // eslint-disable-next-line require-atomic-updates
            item.gps = newPoint
            this.markArr.push(newPoint)
          }
        })
        if (!this.markArr.length)
        {
          this.markArr = [
            {
              lat: 39.915,
              lng: 116.404
            }
          ]
        }
        console.log(this.dotArr)
        this.markerPoint = this.dotArr[0].gps
      } else
      {
        // 如果初始化没有坐标系就添加一个北京的默认坐标值
        this.markArr = [
          {
            lat: 39.915,
            lng: 116.404
          }
        ]
      }
      this.lineData = res.item3
      this.barData = res.item4[0]
      this.pieData = res.item5[0]
      this.pieData2 = res.item5[1]
      console.log(this.cardList)
      console.log(res)
    },
    transformGps (pointArr) {
      return new Promise(function (resolve, reject) {
        function translateCallback (data) {
          if (data.status === 0)
          {
            var point = new window.BMap.Point(data.points[0].lng, data.points[0].lat)
            resolve(point)
          } else
          {
            resolve(pointArr)
          }
        }
        const convertor = new window.BMap.Convertor()
        convertor.translate([pointArr], 1, 5, translateCallback)
      })
    },
    toDotDetail (event, item) {
      console.log(event.type)
      if (event.type == 'ondblclick' && item.cat_id)
      {
        this.$router.push({ path: `/roadManage/roadList/road${item.cat_id}` })
      }
      console.log(item)
    },
    mapReady ({ BMap, map }) { // 地图初始化完成-添加自定义样式
      // map.setMapStyle({
      //   styleJson: BMapJson
      // })
      map.setMapStyleV2({ styleId: 'b2a5cf3f2709221ab9a68e0872eec809' })
    },
    showWindowInfo (index) {
      console.log(index)
      this.infoIndex = index
      console.log(this.infoIndex)
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

  // overflow: hidden;
  // background-color: @adminBlue6;
  .top-bg {
    text-align: center;
    width: 100%;
    height: 66px;
    background: url('./../../assets/images/home_top_bg.png') no-repeat left;
    background-size: 100% auto;

    span {
      font-size: 24px;
      line-height: 60px;
      color: #89B2FF;
    }
  }

  .data-content {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    padding: 0 27px;
  }

  .card-wrap {
    width: 100%;
    height: 70.6px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    gap: 100px;

    .card-item {
      // width: 100%;
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
    margin-top: 20px;
    padding: 2px;

    .map {
      width: 100%;
      height: 100%;
    }
  }

  .echart-wrap {
    width: 100%;
    height: 21.5vh;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .echart-item {
      padding: 20px;
      height: 100%;
      width: 24%;
      box-shadow: inset 0px 1px 22px 0px #14429E;
    }

    .two-pie-wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .pie-item {
        width: 100%;
        height: 50%;
      }
    }
  }
}
</style>
