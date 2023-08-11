<template>
  <div class="road-list bread-content">
    <div class="form-wrap">
      <el-form ref="search-form" :model="roadForm" class="roadForm flex-row" label-width="120px">
        <el-form-item prop="luduanming" class="login-item" :label="$t('roadSurvey.name') + ':'">
          <el-input v-model="roadForm.luduanming" class="area" type="text"
            :placeholder="$t('common.input') + $t('roadSurvey.name')" />
        </el-form-item>
        <el-form-item prop="catId" class="login-item" :label="$t('roadSurvey.group') + ':'">
          <el-select v-model="roadForm.catId" :placeholder="$t('common.select')">
            <el-option v-for="item in groupOpt" :key="item.cat_id" :label="item.name" :value="item.cat_id" />
          </el-select>
        </el-form-item>
        <div class="form-btn-wrap">
          <el-button type="primary" class="submit_btn blue2Btn" @click="submitForm">{{ $t('roadSurvey.search')
          }}</el-button>
          <el-button type="primary" class="submit_btn blue2Btn" @click="lookMap">{{ $t('roadSurvey.map') }}</el-button>
        </div>
      </el-form>
    </div>
    <div v-show="contentType === 1" class="info-wrap">
      <div class="card-wrap flex-row">
        <div v-for="(item, index) in roadList" :key="index" class="card-item">
          <div class="tit-wrap">
            <!-- <div class="road-num">#{{ item.id }}</div> -->
            <div class="road-name">
              <span>{{ item.luduan }}</span>
              <span :class="item.status ? 'green-txt' : 'red-txt'">{{ item.status ? $t('roadSurvey.lj') :
                $t('roadSurvey.dk') }}</span>
            </div>
          </div>
          <ul class="data-list flex-row">
            <!-- <li class="data-item">
              <div class="num">{{ item.camera_num || '-' }}</div>
              <div class="txt">{{$t('roadSurvey.shexiangtou')}}</div>
            </li> -->
            <!-- <li class="data-item">
              <div class="num">{{ item.led_num || '-' }}</div>
              <div class="txt">{{ $t('roadSurvey.xianshiping') }}</div>
            </li> -->
            <!-- <li class="data-item">
              <div class="num">{{ item.jixiang_num || '-' }}</div>
              <div class="txt">{{ $t('roadSurvey.jixiang') }}</div>
            </li> -->
            <!-- <li class="data-item">
              <div class="num">{{ item.yinxiang_num || '-' }}</div>
              <div class="txt">{{ $t('roadSurvey.wangljx') }}</div>
            </li> -->
            <li class="data-item">
              <div class="num">{{ item.wudeng_num || '-' }}</div>
              <!-- <div class="txt">{{ $t('roadSurvey.wd') }}</div> -->
              <div class="txt">发光标志</div>
            </li>
            <li class="data-item">
              <div class="num">{{ item.parameter && item.parameter[0].gzms || '-' }}</div>
              <div class="txt">{{ $t('roadSurvey.work') }}</div>
            </li>
            <li class="data-item">
              <div class="num">{{ item.parameter && item.parameter[0].liangdu || '-' }}</div>
              <div class="txt">{{ $t('roadSurvey.ld') }}</div>
            </li>
            <li class="data-item">
              <div class="num">{{ item.parameter && item.parameter[0].zhankongbi || '-' }}</div>
              <div class="txt">{{ $t('roadSurvey.zkb') }}</div>
            </li>
            <!-- <li class="data-item">
              <div class="num">{{ item.parameter && item.parameter[0].qujianchangdu || '-' }}</div>
              <div class="txt">{{ $t('roadSurvey.cd') }}</div>
            </li> -->
          </ul>
          <!-- <p class="card-tip">区间长度：{{ item.parameter&&item.parameter[0].qujianchangdu||'-' }}</p> -->
          <p class="card-tip">{{ $t('roadSurvey.njd') }}：{{ item.njd || '-' }}</p>
          <div class="card-btn-wrap">
            <el-button type="primary blue2Btn">{{ $t('roadSurvey.baojing') }} ({{ item.warnings }})</el-button>
            <el-button type="primary transparent-btn" @click="goDtail(item)">{{ $t('roadSurvey.view') }}</el-button>
            <el-button type="danger" @click="delRoad(item)">{{ $t('roadSurvey.del') }}</el-button>
          </div>
        </div>
      </div>
      <div class="pagination bluetab">
        <el-pagination v-if="paginations.total > 0" background :page-sizes="paginations.pageSizes"
          :page-size="paginations.pageSize" :layout="paginations.layout" :total="paginations.total"
          :current-page="paginations.pageIndex" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
      </div>
    </div>
    <div v-if="contentType === 2" class="map-wrap four-border">
      <el-button class="exit-btn" type="primary" @click="exitMap">{{ $t('roadSurvey.back') }}</el-button>
      <baidu-map class="map" :scroll-wheel-zoom="true" :center="mapCenter" :zoom="16" @ready="mapReady">
        <template v-for="(item, index) in roadList">
          <bm-marker v-if="item.gps" :key="index" :position="item.gps" @click="showWindowInfo(index)">
            <bm-info-window :show="Boolean(infoIndex === index)" style="font-size:13px" @close="showWindowInfo">
              {{ $t('roadSurvey.ldm') }}：{{ item.luduan }}<br>
              {{ $t('roadSurvey.njd') }}：{{ item.njd }}
            </bm-info-window>
          </bm-marker>
        </template>
      </baidu-map>
    </div>
  </div>
</template>

<script>
import { getRoadSurvey, getRoadGroupList, delRoadById } from '@/api'
export default {
  name: 'RoadSurvey',
  data () {
    return {
      pathUrl: this.$route.path,
      groupOpt: [],
      mapCenter: { lng: 0, lat: 0 },
      markArr: [],
      infoIndex: '',
      roadForm: {
        luduanming: '',
        catId: 0
      },
      contentType: 1, // 1为路段总况2为路段地图
      paginations: {
        total: 100, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], // 每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      roadList: []
    }
  },
  mounted () {
    this.getGroupData()
    this.getData()
  },
  methods: {
    async getData () {
      const params = {
        pagesize: this.paginations.pageSize,
        pageindex: this.paginations.pageIndex,
        ...this.roadForm
      }
      const res = await getRoadSurvey({ pathUrl: this.pathUrl, ...params })
      this.roadList = res.list
      this.roadList.forEach((item, idx) => {
        if (item.gps)
        {
          item.gps = { lng: item.gps.split(',')[0], lat: item.gps.split(',')[1] }
          this.markArr.push(item.gps)
        }
      })
      this.mapCenter = this.markArr[0]
      this.paginations.total = res.total
    },
    async getGroupData () {
      const params = {
        pagesize: 10000,
        pageindex: this.paginations.pageIndex
      }
      const res = await getRoadGroupList({ pathUrl: this.pathUrl, ...params })
      this.groupOpt = res.list
      this.groupOpt.unshift({ cat_id: 0, name: this.$t('common.select') })
    },
    async delRoad (item) {
      try
      {
        this.$confirm(this.$t('other.isdelroad'), this.$t('other.tishi'), {
          confirmButtonText: this.$t('common.qd'),
          cancelButtonText: this.$t('common.qx'),
          type: 'warning'
        }).then(async () => {
          const params = {
            pathUrl: this.pathUrl,
            id: item.id
          }
          const res = await delRoadById(params)
          console.log(res)
          this.getData()
          this.$store.dispatch('resetRouter')
          this.$message.success(this.$t('common.success'))
        })
      } catch (error)
      {
        console.log(error)
      }
    },
    goDtail (item) {
      this.$router.push({ path: `/roadManage/roadList/road${item.id}` })
    },
    submitForm () {
      this.getData()
    },
    lookMap () {
      this.getData()
      this.contentType = 2
    },
    exitMap () {
      this.contentType = 1
    },
    mapReady ({ map, BMap }) { // 地图初始化完成-添加自定义样式
      // map.setMapStyle({
      //   styleJson: BMapJson
      // })
      map.setMapStyleV2({ styleId: 'b2a5cf3f2709221ab9a68e0872eec809' })
    },
    showWindowInfo (index) {
      console.log(index)
      this.infoIndex = index
      console.log(this.infoIndex)
    },
    // 每页多少条切换
    handleSizeChange (pageSize) {
      this.paginations.pageSize = pageSize
      this.getData()
    },
    // 上下分页
    handleCurrentChange (page) {
      this.paginations.pageIndex = page
      this.getData()
    }
  }
}
</script>

<style lang="less">
.road-list {
  .el-form-item {
    margin-bottom: 0 !important;
  }
}
</style>
<style lang="less" scoped>
.road-list {
  width: 100%;
  overflow: hidden;

  .pagination {
    width: 100%;
    text-align: center;
  }

  .submit_btn {
    width: 65px;
    height: 38px;
  }

  .card-wrap::after {
    width: 32%;
    height: 0;
    content: "";
  }

  .card-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 30px;

    .card-item {
      width: 32%;
      min-height: 300px;
      padding: 20px 20px 30px;
      background: @adminBlue7;
      margin-bottom: 30px;

      .green-txt {
        color: chartreuse;
      }

      .red-txt {
        color: #ff0000;
      }

      .tit-wrap {
        display: flex;
        justify-content: space-between;
        width: 100%;
        color: @adminTextOrange;
        font-size: 18px;
        line-height: 28px;
        // .road-num{

        // }
        .road-name {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      &.active {
        border-top: 4px solid @adminBlue;
      }

      .data-list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 30px;

        .data-item {
          text-align: center;
          width: 33.3%;
          margin-bottom: 30px;

          .num {
            font-size: 14px;
            line-height: 28px;
          }

          .txt {
            font-size: 14px;
            line-height: 28px;
          }
        }
      }

      .card-tip {
        width: 100%;
        font-size: 14px;
        margin: 30px 0;
        text-align: center;
      }

      .card-btn-wrap {
        display: flex;
        justify-content: center;
      }
    }
  }

  .map-wrap {
    width: 100%;
    margin-top: 30px;
    position: relative;
    padding: 2px;

    .map {
      width: 100%;
      height: 700px;
    }

    .exit-btn {
      position: absolute;
      z-index: 999;
      left: 10px;
      top: 10px;
    }
  }
}
</style>

