<template>
  <div class="camera">
    <div class="inner-form-wrap blue7 form-input">
      <div class="section-title">{{ $t('roadDetail.jbxx') }}</div>
      <el-form ref="baseForm" :label-position="'top'" :model="baseForm" :rules="rules" class="baseForm">
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item prop="jizhongqi" :label="$t('roadDetail.jzqbh') + '：'">
              <el-select v-model="baseForm.jizhongqi" :disabled="enbleEdit"
                :placeholder="$t('common.select') + $t('roadDetail.bh')" class="large-select">
                <el-option v-for="item in jiZhongQiOpt" :key="item.jizhongqi" :label="item.jizhongqi"
                  :value="item.jizhongqi" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="appkey" :label="$t('roadDetail.appkey') + '：'">
              <el-input v-model="baseForm.appkey" :disabled="enbleEdit" class="area large-input" type="text"
                :placeholder="$t('common.input')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="appsecret" :label="$t('roadDetail.secret') + '：'">
              <el-input v-model="baseForm.appsecret" :disabled="enbleEdit" class="area large-input" type="text"
                :placeholder="$t('common.input')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item prop="serialno" :label="$t('roadDetail.sxtxlh') + '：'">
              <el-input v-model="baseForm.serialno" :disabled="enbleEdit" class="area large-input" type="text"
                :placeholder="$t('roadDetail.sxplaceholder')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="channelno" :label="$t('roadDetail.tdh') + '：'">
              <el-input v-model="baseForm.channelno" :disabled="enbleEdit" class="area large-input" type="text"
                :placeholder="$t('roadDetail.sxplaceholder')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="boxSn" :label="$t('roadDetail.znxbh') + '：'">
              <el-input v-model="baseForm.boxSn" :disabled="enbleEdit" class="area large-input" type="text"
                :placeholder="$t('common.input')+$t('roadDetail.znxbh')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24" style="text-align:center">
            <el-button type="primary" class="submit_btn blue2Btn" @click="enbleEdit = false">{{ $t('roadDetail.sz')
            }}</el-button>
            <el-button type="primary" class="submit_btn blue2Btn" @click="submitForm('baseForm')">{{ $t('roadDetail.bc')
            }}</el-button>
            <el-button type="primary" class="submit_btn blue2Btn" @click="getCreameUrl">{{ $t('roadDetail.ckzb')
            }}</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="video-info-wrap flex-row">
      <div :class="{ large: isLarge }" class="video-control blue7">
        <div class="section-title flex-split">
          <div>{{ $t('roadDetail.spck') }}</div>
          <el-button type="primary" style="width:120px;height:32px" size="small" class="btn blue2Btn" @click="enlarge">{{
            isLarge ? $t('roadDetail.zxh') : $t('roadDetail.zdh') }}</el-button>
        </div>
        <div class="video-content">
          <div class="video-box">
            <video v-if="videoUrl" id="playVideo" controls playsInline autoplay webkit-playsinline :src="videoUrl" />
          </div>
          <div class="btn-wrap">
            <el-button-group>
              <el-button type="primary" size="small" class="btn blue2Btn" @click="takePhoto">{{ $t('roadDetail.paizhao') }}</el-button>
              <el-button type="primary" size="small" class="btn blue2Btn" @click="operaPhoto(8)">{{ $t('roadDetail.fangda') }}</el-button>
              <el-button type="primary" size="small" class="btn blue2Btn" @click="operaPhoto(9)">{{ $t('roadDetail.suoxiao') }}</el-button>
              <el-button type="primary" size="small" class="btn blue2Btn" @click="operaPhoto(6)">{{ $t('roadDetail.xshang') }}</el-button>
              <el-button type="primary" size="small" class="btn blue2Btn" @click="operaPhoto(1)">{{ $t('roadDetail.xxia') }}</el-button>
              <el-button type="primary" size="small" class="btn blue2Btn" @click="operaPhoto(2)">{{ $t('roadDetail.xzuo') }}</el-button>
              <el-button type="primary" size="small" class="btn blue2Btn" @click="operaPhoto(3)">{{ $t('roadDetail.xyou') }}</el-button>
            </el-button-group>
          </div>
          <div class="btn-wrap">
            <el-button type="primary" style="width:120px" size="small" class="btn blue2Btn"
              @click="addPreDot">{{ $t('roadDetail.tjyzd') }}</el-button>
            <el-button type="primary" style="width:120px" size="small" class="btn blue2Btn"
              @click="rsetPreDot">{{ $t('roadDetail.hfyzd') }}</el-button>
          </div>
        </div>
      </div>
      <div class="video-img-list blue7 bluetab">
        <div class="section-title">{{ $t('roadDetail.imglist') }}</div>
        <div class="tab-wrap">
          <!-- v-loading="loading" -->
          <el-table :data="imgData" highlight-current-row style="width:100%">
            <el-table-column prop="id" label="ID" align="center" />
            <el-table-column prop="luduan" :label="$t('roadDetail.roadName')" align="center" />
            <el-table-column prop="type" :label="$t('roadDetail.njd')" align="center" />
            <el-table-column prop="createtime" :label="$t('roadDetail.cjrq')" align="center" />
            <el-table-column :label="$t('common.cz')">
              <template slot-scope="scope">
                <el-button type="text" class="btn link-btn" @click="handleLook(scope.row)">{{ $t('common.view') }}</el-button>
                <!-- <el-button
                  type="text"
                  class="btn link-btn"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination v-if="paginations.total > 0" background :page-size="paginations.pageSize"
              :layout="paginations.layout" :total="paginations.total" :current-page="paginations.pageIndex"
              @current-change="handleCurrentChange" @size-change="handleSizeChange" />
          </div>
        </div>
      </div>
    </div>
    <box-param :addr-info="addrInfo" :box-sn="boxSn" :chonghezha="chonghezha" :device-info="deviceInfo"
      @getBoxData="getBoxData" />
    <!-- 查看照片 -->
    <el-dialog :visible.sync="showImgFlag" width="680px" :title="$t('roadDetail.viewimg')">
      <div class="dialog-content">
        <div class="img-box">
          <img :src="showImg">
        </div>
        <!-- <div slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap">
            <el-button type="primary" class="btn" @click="saveAuth">确定</el-button>
            <el-button class="btn transparent-btn" @click="dialogTableVisible=false">取消</el-button>
          </div>
        </div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCameraInfo, getJizhognQiList, saveCameraInfo, getPlayUrl, getCreameImageUrl, takeCreamePhoto, creameSetAddr, getBoxParam, addPreDot, resetPreDot } from '@/api'
import BoxParam from './../boxParam/index.vue'
import LinePic from '../../../../../dashboard/components/linePic.vue'
export default {
  name: 'Camera',
  components: {
    BoxParam,
    LinePic
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
      showImgFlag: false,
      isLarge: false,
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 8, // 1页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      pathUrl: this.$route.path,
      videoUrl: '', // 视频播放地址
      jizhongqi: '',
      boxSn: '',
      recordId: null, // 摄像头的记录id G.Z 20211211
      addrInfo: {},
      deviceInfo: {},
      chonghezha: {},
      baseForm: {
        boxSn: '',
        jizhongqi: '',
        appkey: '',
        serialno: '',
        channelno: '',
        appsecret: ''
      },
      rules: {},
      jiZhongQiOpt: [],
      imgData: [],
      showImg: '',
      player: null
    }
  },
  watch: {
    $route (to, from) {
      if (to.meta.id != from.meta.id)
      {
        this.initPage()
        if (this.player)
        {
          this.player.stop()
          this.videoUrl = ''
        }
      }
      console.log(to.meta.id)
      console.log(from.meta.id)
    }
  },
  mounted () {
    this.initPage()
  },
  beforeDestroy () {
    if (this.player)
    {
      this.player.stop()
    }
  },
  methods: {
    initPage () {
      this.enbleEdit = true
      this.itemId = this.$route.meta.id
      console.log(this.$route.meta.id)
      this.getJizhongqiData()
      this.getData()
      this.getImageList()
    },
    async getData () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.itemId,
        no: this.itemIndex
      }
      const res = await getCameraInfo(params)
      this.baseForm.boxSn = res.boxSn
      this.boxSn = res.boxSn
      this.baseForm.appkey = res.appkey
      this.baseForm.appsecret = res.appsecret
      this.baseForm.serialno = res.serialno
      this.baseForm.channelno = res.channelno
      this.baseForm.jizhongqi = res.jizhongqi
      this.jizhongqi = res.jizhongqi
      this.recordId = res.id
      console.log(res)
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
    async enlarge () { // 最大化
      this.isLarge = !this.isLarge
    },
    async addPreDot () {
      const params = {
        pathUrl: this.pathUrl,
        jizhongqi: this.jizhongqi,
        no: this.itemIndex
      }
      const res = await addPreDot(params)
      console.log(res)
      this.$message.success(this.$t('common.success'))
      // this.initPage()
    },
    async rsetPreDot () {
      const params = {
        pathUrl: this.pathUrl,
        jizhongqi: this.jizhongqi,
        no: this.itemIndex
      }
      const res = await resetPreDot(params)
      console.log(res)
      this.$message.success(this.$t('common.success'))
      // this.initPage()
    },
    async getJizhongqiData () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.itemId
      }
      const res = await getJizhognQiList(params)
      this.jiZhongQiOpt = res
      console.log(res)
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
    handleLook (item) {
      this.showImg = item.url
      this.showImgFlag = true
    },
    async submitForm () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.recordId,
        appkey: this.baseForm.appkey,
        no: this.itemIndex,
        boxSn: this.baseForm.boxSn,
        appsecret: this.baseForm.appsecret,
        serialno: this.baseForm.serialno,
        channelno: this.baseForm.channelno,
        jizhongqi: this.baseForm.jizhongqi,
        luduanId: this.itemId
      }
      const res = await saveCameraInfo(params)
      this.$message.success(this.$t('common.save'))
      this.getData()
      console.log(res)
    },
    async getCreameUrl () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.jizhongqi,
        no: this.itemIndex
      }
      const res = await getPlayUrl(params)
      const dateTime = new Date().getTime()
      this.videoUrl = res + '?date=' + dateTime
      // this.videoUrl = 'http://hls01open.ys7.com/openlive/7f3970aeddb44f48855e3a0b508a7ba2.m3u8'
      this.$nextTick(function () {
        this.tranFormVideoUrl()
      })
      // console.log(res)
    },
    tranFormVideoUrl () {
      console.log(window.EZUIKit)
      this.player = new window.EZUIKit.EZUIPlayer('playVideo')
    },
    async getImageList () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.itemId,
        no: this.itemIndex,
        pagesize: this.paginations.pageSize,
        pageindex: this.paginations.pageIndex
      }
      const res = await getCreameImageUrl(params)
      console.log(res)
      this.imgData = res.list || []
      this.paginations.total = res.total
    },
    handleCurrentChange (page) {
      this.paginations.pageIndex = page
      this.getImageList()
    },
    // 每页多少条切换
    handleSizeChange (pageSize) {
      this.paginations.pageSize = pageSize
      this.getImageList()
    },
    async takePhoto () {
      if (!this.jizhongqi)
      {
        this.$message.warning(this.$t('roadDetail.selectjzqother'))
        return
      }
      const params = {
        pathUrl: this.pathUrl,
        jizhongqi: this.jizhongqi,
        no: this.itemIndex
      }
      const res = await takeCreamePhoto(params)
      this.$message.success(this.$t('common.success'))
      this.initPage()
      console.log(res)
    },
    async operaPhoto (type) {
      if (!this.jizhongqi)
      {
        this.$message.warning(this.$t('roadDetail.selectjzqother'))
        return
      }
      const params = {
        pathUrl: this.pathUrl,
        jizhongqi: this.jizhongqi,
        no: this.itemIndex,
        direction: type
      }
      const res = await creameSetAddr(params)
      console.log(res)
      this.$message.success(this.$t('common.success'))
      this.initPage()
    }
  }
}
</script>

<style lang="less" scoped>
.camera {
  position: relative;

  .inner-form-wrap {
    .baseForm {
      padding: 40px;
    }

    .submit_btn {
      width: 140px;
    }
  }

  .img-box {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
    }
  }

  .video-info-wrap {
    margin-top: 20px;

    .video-control {
      &.large {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 99;

        .video-box {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, .21);

          video {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .video-content {
      padding: 20px;
      width: 100%;
      height: calc(100% - 170px);

      .video-box {
        width: 450px;
        height: 284px;
        background: rgba(255, 255, 255, .21);

        video {
          width: 100%;
          height: 100%;
        }
      }

      .btn-wrap {
        text-align: center;
        margin-top: 20px;

        .btn {
          width: 64px;
        }
      }
    }

    .video-img-list {
      flex: 1;
      margin-left: 20px;

      .tab-wrap {
        padding: 20px;

        .link-btn {
          padding: 6px 10px !important;
          color: #FFCD44;
        }

        .pagination {
          width: 100%;
          height: 42px;
          text-align: center;
        }
      }
    }
  }

  .flex-split {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

/deep/.large-input {
  width: 300px !important;
}

/deep/.large-select {
  width: 300px !important;

  .el-input {
    width: 100% !important;
  }
}
</style>

