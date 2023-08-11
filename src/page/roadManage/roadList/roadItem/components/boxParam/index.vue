<template>
  <div class="run-paramer-wrap blue7">
    <div class="section-title">{{ $t('roadDetail.znxgzcs') }}</div>
    <div class="tab-wrap">
      <!-- v-model="activeName" @tab-click="handleClick" -->
      <el-tabs class="line-nav">
        <el-tab-pane :disabled="!Boolean(boxSn)" :label="$t('roadDetail.jxhj')">
          <div v-if="Boolean(boxSn)" class="environment tab-content">
            <div class="box-list">
              <div class="item">
                <div class="tit">{{ $t('roadDetail.dy') }}</div>
                <div class="val">{{ chonghezha.Voltage || '-' }}</div>
              </div>
              <!-- <div class="item">
                <div class="tit">DC</div>
                <div class="val">{{ deviceInfo.Door||'-' }}</div>
              </div> -->
              <!-- <div class="item">
                <div class="tit">照明灯</div>
                <div class="val">{{ deviceInfo.Light||'-' }}</div>
              </div> -->
              <div class="item">
                <div class="tit">{{ $t('roadDetail.dl') }}</div>
                <div class="val">{{ chonghezha.Current || '-' }}</div>
              </div>
              <div class="item">
                <div class="tit">{{ $t('roadDetail.ljcs') }}</div>
                <div class="val">{{ deviceInfo.Thundercnt || '-' }}</div>
              </div>
              <!-- <div class="item">
                <div class="tit">电源</div>
                <div class="val">{{ deviceInfo.Door||'-' }}</div>
              </div> -->
              <div class="item">
                <div class="tit">{{ $t('roadDetail.ddcs') }}</div>
                <div class="val">{{ chonghezha.Vinoffcnt || '-' }}</div>
              </div>
              <!-- <div class="item">
                <div class="tit"> AC24</div>
                <div class="val">{{ deviceInfo.Door||'-' }}</div>
              </div> -->
              <div class="item">
                <div class="tit">{{ $t('roadDetail.gj') }}</div>
                <div v-if="deviceInfo.Alarm == '1'" class="val">{{ $t('roadDetail.shi') }}</div>
                <div v-else class="val">{{ $t('roadDetail.fou') }}</div>
              </div>
              <div class="item">
                <div class="tit">{{ $t('roadDetail.wengdu') }}</div>
                <div class="val">{{ deviceInfo.Temperature || '-' }}{{ $t('roadDetail.du') }}</div>
              </div>
              <div class="item">
                <div class="tit">{{ $t('roadDetail.js') }}</div>
                <div v-if="deviceInfo.Water == '1'" class="val">{{ $t('roadDetail.shi') }}</div>
                <div v-else class="val">{{ $t('roadDetail.fou') }}</div>
              </div>
              <div class="item">
                <div class="tit">{{ $t('roadDetail.ldcs') }}</div>
                <div class="val">{{ chonghezha.Leakerrcnt || '-' }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :disabled="!Boolean(boxSn)" :label="$t('roadDetail.sbzt')">
          <div v-if="Boolean(boxSn)" class="device-status tab-content">
            <div class="box-list">
              <!-- <div class="item">
                <div class="tit">箱门关闭</div>
                <div v-if="deviceInfo.Door=='1'" class="val">否</div>
                <div v-else class="val">是</div>
              </div> -->
              <div class="item">
                <div class="tit">{{ $t('roadDetail.zhuangtai') }}</div>
                <div v-if="deviceInfo.Online == '1'" class="val">{{ $t('roadDetail.zaixian') }}</div>
                <div v-else class="val">{{ $t('roadDetail.lixian') }}</div>
                <!-- <div class="val">{{ deviceInfo.Online||'-' }}</div> -->
              </div>
              <div class="item">
                <div class="tit">{{ $t('roadDetail.xmzhuangtai') }}</div>
                <div v-if="deviceInfo.Door == '1'" class="val">{{ $t('roadDetail.kai') }}</div>
                <div v-else class="val">{{ $t('roadDetail.guan') }}</div>
                <!-- <div class="val">{{ deviceInfo.Door||'-' }}</div> -->
              </div>
              <div class="item">
                <div class="tit">{{ $t('roadDetail.xt') }}</div>
                <div class="val">{{ deviceInfo.Door || '-' }}</div>
              </div>
              <div class="item">
                <div class="tit">{{ $t('roadDetail.waiguasb') }}</div>
                <div class="val">{{ deviceInfo.Door || '-' }}</div>
              </div>
              <div class="item">
                <div class="tit">{{ $t('roadDetail.dianyuan') }}</div>
                <div class="val">{{ deviceInfo.Door || '-' }}</div>
              </div>
              <div class="item">
                <div class="tit">{{ $t('roadDetail.fengshan') }}</div>
                <div v-if="deviceInfo.Fan == '1'" class="val">{{ $t('roadDetail.kai') }}</div>
                <div v-else class="val">{{ $t('roadDetail.guan') }}</div>
                <!-- <div class="val">{{ deviceInfo.Fan||'-' }}</div> -->
              </div>
              <div class="item">
                <div class="tit">{{ $t('roadDetail.xiangdeng') }}</div>
                <div v-if="deviceInfo.LED == '1'" class="val">{{ $t('roadDetail.kai') }}</div>
                <div v-else class="val">{{ $t('roadDetail.guan') }}</div>
              </div>
              <div class="item">
                <div class="tit">{{ $t('roadDetail.jrb') }}</div>
                <div v-if="deviceInfo.Heat == '1'" class="val">{{ $t('roadDetail.shi') }}</div>
                <div v-else class="val">{{ $t('roadDetail.fou') }}</div>
              </div>
              <div class="item">
                <div class="tit">{{ $t('roadDetail.bianhao') }}</div>
                <div class="val">{{ addrInfo.Device_sn || '-' }}</div>
              </div>
              <div class="item">
                <div class="tit">{{ $t('roadDetail.diz') }}</div>
                <div class="val">{{ addrInfo.Complete_addr || '-' }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="告警信息">
          <div class="alarm-info tab-content">机箱环境</div>
        </el-tab-pane>
        <el-tab-pane label="网络状态">
          <div class="net-status tab-content">机箱环境</div>
        </el-tab-pane> -->
        <el-tab-pane :disabled="!Boolean(boxSn)" :label="$t('roadDetail.cz')">
          <div v-if="Boolean(boxSn)" class="opera tab-content">
            <el-tabs v-if="deviceInfo.Dc12Status" class="sub-tab" type="border-card">
              <el-tab-pane :label="$t('roadDetail.dckongzhi')">
                <div class="tip">{{ $t('roadDetail.dczhiliu') }} 12V (Max. 2A)</div>
                <div class="line-opera">
                  <div class="t">DC2</div>
                  <div class="o">
                    <el-button type="primary" :disabled="deviceInfo.Dc12Status[1] == '1'" size="small"
                      class="btn blue2Btn" @click="openSwitch({ dc: 2, type: 'dc12' })">{{ $t('roadDetail.kq') }}</el-button>
                    <el-button type="primary" :disabled="deviceInfo.Dc12Status[1] == '0'" size="small"
                      class="btn  transparent-btn" @click="closeSwitch({ dc: 2, type: 'dc12' })">{{ $t('roadDetail.guanbi') }}</el-button>
                  </div>
                </div>
                <div class="line-opera">
                  <div class="t">DC3</div>
                  <div class="o">
                    <el-button type="primary" size="small" :disabled="deviceInfo.Dc12Status[2] == '1'"
                      class="btn blue2Btn" @click="openSwitch({ dc: 3, type: 'dc12' })">{{ $t('roadDetail.kq') }}</el-button>
                    <el-button type="primary" size="small" :disabled="deviceInfo.Dc12Status[2] == '0'"
                      class="btn  transparent-btn" @click="closeSwitch({ dc: 3, type: 'dc12' })">{{ $t('roadDetail.guanbi') }}</el-button>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('roadDetail.ackongzhi')">
                <div class="tip">{{ $t('roadDetail.acjiaoliu') }} 24V</div>
                <div class="line-opera">
                  <div class="t">AC1</div>
                  <div class="o">
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac24Status[0] == '1'"
                      class="btn blue2Btn" @click="openSwitch({ dc: 1, type: 'ac24' })">{{ $t('roadDetail.kq') }}</el-button>
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac24Status[0] == '0'"
                      class="btn  transparent-btn" @click="closeSwitch({ dc: 1, type: 'ac24' })">{{ $t('roadDetail.guanbi') }}</el-button>
                  </div>
                </div>
                <div class="line-opera">
                  <div class="t">AC2</div>
                  <div class="o">
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac24Status[1] == '1'"
                      class="btn blue2Btn" @click="openSwitch({ dc: 2, type: 'ac24' })">{{ $t('roadDetail.kq') }}</el-button>
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac24Status[1] == '0'"
                      class="btn  transparent-btn" @click="closeSwitch({ dc: 2, type: 'ac24' })">{{ $t('roadDetail.guanbi') }}</el-button>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('roadDetail.ackongzhi220')">
                <div class="tip">{{ $t('roadDetail.acjiaoliu') }} 220V</div>
                <div class="line-opera">
                  <div class="t">AC1</div>
                  <div class="o">
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac220Status[0] == '1'"
                      class="btn blue2Btn" @click="openSwitch({ dc: 1, type: 'ac220' })">{{ $t('roadDetail.kq') }}</el-button>
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac220Status[0] == '0'"
                      class="btn transparent-btn" @click="closeSwitch({ dc: 1, type: 'ac220' })">{{ $t('roadDetail.guanbi') }}</el-button>
                  </div>
                </div>
                <div class="line-opera">
                  <div class="t">AC2</div>
                  <div class="o">
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac220Status[1] == '1'"
                      class="btn blue2Btn" @click="openSwitch({ dc: 2, type: 'ac220' })">{{ $t('roadDetail.kq') }}</el-button>
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac220Status[1] == '0'"
                      class="btn transparent-btn" @click="closeSwitch({ dc: 2, type: 'ac220' })">{{ $t('roadDetail.guanbi') }}</el-button>
                  </div>
                </div>
                <div class="line-opera">
                  <div class="t">AC3</div>
                  <div class="o">
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac220Status[2] == '1'"
                      class="btn blue2Btn" @click="openSwitch({ dc: 3, type: 'ac220' })">{{ $t('roadDetail.kq') }}</el-button>
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac220Status[2] == '0'"
                      class="btn transparent-btn" @click="closeSwitch({ dc: 3, type: 'ac220' })">{{ $t('roadDetail.guanbi') }}</el-button>
                  </div>
                </div>
                <div class="line-opera">
                  <div class="t">AC4</div>
                  <div class="o">
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac220Status[3] == '1'"
                      class="btn blue2Btn" @click="openSwitch({ dc: 4, type: 'ac220' })">{{ $t('roadDetail.kq') }}</el-button>
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac220Status[3] == '0'"
                      class="btn  transparent-btn" @click="closeSwitch({ dc: 4, type: 'ac220' })">{{ $t('roadDetail.guanbi') }}</el-button>
                  </div>
                </div>
                <div class="line-opera">
                  <div class="t">AC6</div>
                  <div class="o">
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac220Status[5] == '1'"
                      class="btn blue2Btn" @click="openSwitch({ dc: 6, type: 'ac220' })">{{ $t('roadDetail.kq') }}</el-button>
                    <el-button type="primary" size="small" :disabled="deviceInfo.Ac220Status[5] == '0'"
                      class="btn  transparent-btn" @click="closeSwitch({ dc: 6, type: 'ac220' })">{{ $t('roadDetail.guanbi') }}</el-button>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { operaBoxElc, getElcResult } from '@/api'
export default {
  name: 'BoxParam',
  props: {
    addrInfo: {
      type: Object,
      default: () => { return {} }
    },
    deviceInfo: {
      type: Object,
      default: () => { return {} }
    },
    chonghezha: {
      type: Object,
      default: () => { return {} }
    },
    boxSn: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      pathUrl: this.$route.path
      // road: this.$route.meta.id
    }
  },
  mounted () {
    console.log(this.addrInfo)
  },
  methods: {
    async openSwitch (item) {
      console.log(item)
      const params = {
        road: item.dc,
        pathUrl: this.pathUrl,
        action: 1,
        dianya: item.type,
        boxSn: this.boxSn
      }
      const res = await operaBoxElc(params)
      console.log(res)
      this.awiatResult(res)
      // this.$message.success('操作成功')
    },
    async closeSwitch (item) {
      const params = {
        road: item.dc,
        pathUrl: this.pathUrl,
        action: 0,
        dianya: item.type,
        boxSn: this.boxSn
      }
      const res = await operaBoxElc(params)
      console.log(res)
      this.awiatResult(res)

      // this.$message.success('操作成功')
    },
    async awiatResult (val) {
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
        const res = await getElcResult(params)
        if (res.RespBit === 100)
        {
          clearInterval(timer)
          setTimeout(() => {
            this.$emit('getBoxData')
            loading.close()
            this.$message.success(this.$t('common.success'))
          }, 2000)
        } else
        {
          this.$message.error(this.$t('common.error'))
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less">
.run-paramer-wrap {
  .sub-tab .el-tabs__nav {
    float: left !important;
  }

  .sub-tab.el-tabs--border-card {
    border: 1px solid rgba(255, 255, 255, .4) !important;
  }
}
</style>
<style lang="less" scoped>
.run-paramer-wrap {
  margin-top: 20px;
  padding-top: 22px;

  .tab-content {
    overflow: hidden;
    padding: 25px;
  }

  .box-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .item {
      font-size: 14px;
      width: 48%;
      display: flex;
      line-height: 30px;
      border-bottom: 1px solid rgba(255, 255, 255, .4);

      &:first-child,
      &:nth-child(2) {
        border-top: 1px solid rgba(255, 255, 255, .4);
      }

      .tit {
        min-width: 120px;
        padding-left: 10px;
        border-right: 1px solid rgba(255, 255, 255, .4);
        border-left: 1px solid rgba(255, 255, 255, .4);
      }

      .val {
        flex: 1;
        border-right: 1px solid rgba(255, 255, 255, .4);
        padding-left: 10px;
      }
    }

    // .item{
    //     width: 128px;
    //     padding: 15px;
    //     float: left;
    //     border: 1px solid #436098;
    //     .tit{
    //         width: 100%;
    //         line-height: 30px;
    //     }
    //     .val{
    //         text-align: center;
    //         line-height: 50px;
    //     }
    // }
  }

  .opera {
    .btn-wrap {
      width: 100%;
      text-align: center;

      &:last-child {
        margin-top: 30px;
      }
    }

    .btn {
      width: 150px;
    }
  }

  .sub-tab {
    line-height: 30px;
    color: #ccc;

    .tip {
      width: 100%;
      padding: 10px 0;
    }

    .line-opera {
      width: 200px;
      float: left;
      line-height: 42px;
      text-align: center;

      .t {
        color: #fff;
      }

      .o {
        button {
          display: block;
          margin: 20px auto;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .btn {
        width: 80px;
      }
    }
  }

}
</style>

