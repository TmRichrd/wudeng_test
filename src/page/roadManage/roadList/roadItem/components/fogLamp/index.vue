<template>
  <div class="fog-lamp">
    <div class="inner-form-wrap blue7 form-input">
      <div class="section-title">{{ $t('roadDetail.jbxx') }}</div>
      <el-form ref="baseForm" :label-position="'top'" :model="baseForm" :rules="rules" class="baseForm">
        <el-row :span="24">
          <el-col :span="12">
            <el-form-item prop="direction_left" :label="$t('roadDetail.fxleft')">
              <el-input v-model="baseForm.direction_left" :disabled="enbleEdit" class="area" type="text"
                :placeholder="$t('common.input')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="direction_right" :label="$t('roadDetail.fxright')">
              <el-input v-model="baseForm.direction_right" :disabled="enbleEdit" class="area" type="text"
                :placeholder="$t('common.input')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="12">
            <el-form-item prop="quantity_left" :label="$t('roadDetail.wdsl')">
              <el-input v-model="baseForm.quantity_left" :disabled="enbleEdit" class="area" type="text"
                :placeholder="$t('common.input') + $t('roadDetail.wdsl')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="quantity_right" :label="$t('roadDetail.wdsl')">
              <el-input v-model="baseForm.quantity_right" :disabled="enbleEdit" class="area" type="text"
                :placeholder="$t('common.input') + $t('roadDetail.wdsl')" />
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
    <div class="other-info blue7 bluetab">
      <div class="section-title">{{ $t('roadDetail.ssxs') }}</div>
      <div class="info-wrap">
        <div class="text-info flex-row">
          <div class="left-info info-item">
            <div class="info-top">
              <p>{{ $t('roadDetail.fxleft') }}：{{ direction_left }}</p>
              <p>{{ $t('roadDetail.slleft') }}：{{ quantity_left }}</p>
              <p>{{ $t('roadDetail.zxleft') }}：{{ wudenglonline }}</p>
              <p>{{ $t('roadDetail.gzleft') }}：{{ wudengloffline }}</p>
            </div>
            <div v-if="showTabData == '1'" class="tab-wrap el-scrollbar">
              <el-table :data="wudengl" highlight-current-row style="width:100%">
                <el-table-column prop="light_no" :label="$t('roadDetail.wdbianhao')" align="center" width="150" />
                <el-table-column :label="$t('roadDetail.dianliang')" align="center">
                  <template slot-scope="scope">
                    <div class="elec-wrap">
                      <i class="fa" :class="eleOpt[scope.row.dianliang]" />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="date" :label="$t('roadDetail.ljzt')" align="center" width="120">
                  <template slot-scope="scope">
                    <span v-if="scope.row.State == '1'" class="greenTxt">{{ $t('roadDetail.zaixian') }}</span>
                    <span v-else class="redTxt">{{ $t('roadDetail.lixian') }}</span>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </div>
          <div class="right-info info-item">
            <div class="info-top">
              <p>{{ $t('roadDetail.fxright') }}：{{ direction_right }}</p>
              <p>{{ $t('roadDetail.slright') }}：{{ quantity_right }}</p>
              <p>{{ $t('roadDetail.zxright') }}：{{ wudengronline }}</p>
              <p>{{ $t('roadDetail.gzright') }}：{{ wudengroffline }}</p>
            </div>
            <div v-if="showTabData == '1'" class="tab-wrap el-scrollbar">
              <el-table :data="wudengr" highlight-current-row style="width:100%">
                <el-table-column prop="light_no" :label="$t('roadDetail.wdbianhao')" align="center" width="120" />
                <el-table-column :label="$t('roadDetail.dianliang')" align="center">
                  <template slot-scope="scope">
                    <div class="elec-wrap">
                      <i class="fa" :class="eleOpt[scope.row.dianliang]" />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="date" :label="$t('roadDetail.ljzt')" align="center" width="120">
                  <template slot-scope="scope">
                    <span v-if="scope.row.State == '1'" class="greenTxt">{{ $t('roadDetail.zaixian') }}</span>
                    <span v-else class="redTxt">{{ $t('roadDetail.lixian') }}</span>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <box-param /> -->
  </div>
</template>

<script>

import { getFogLamp, saveFogLamp } from '@/api'
export default {
  name: 'FogLamp',
  data () {
    return {
      eleOpt: {
        '00': 'fa fa-battery-1',
        '01': 'fa fa-battery-2',
        '02': 'fa fa-battery-3',
        '03': 'fa fa-battery-4',
        'f0': 'fa fa-battery-1',
        'f1': 'fa fa-battery-2',
        'f2': 'fa fa-battery-3',
        'f3': 'fa fa-battery-4'
      },
      enbleEdit: true,
      pathUrl: this.$route.path,
      baseForm: {
        direction_left: '',
        quantity_left: '',
        direction_right: '',
        quantity_right: '',
        jizhongqi: ''
      },
      showTabData: 0,
      direction_left: '',
      quantity_left: '',
      direction_right: '',
      quantity_right: '',
      wudengl: [],
      wudengr: [],
      wudenglonline: '',
      wudengloffline: '',
      wudengronline: '',
      wudengroffline: '',
      rules: {
        direction_left: [
          { required: true, message: this.$t('common.input'), trigger: 'blur' }
        ],
        quantity_left: [
          { required: true, message: this.$t('common.input'), trigger: 'blur' },
          { pattern: /\d/, message: this.$t('common.inputNumber'), trigger: 'blur' }
        ],
        direction_right: [
          { required: true, message: this.$t('common.input'), trigger: 'blur' }
        ],
        quantity_right: [
          { required: true, message: this.$t('common.input'), trigger: 'blur' },
          { pattern: /\d/, message: this.$t('common.inputNumber'), trigger: 'blur' }
        ]
      },
      tableData3: []
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
      this.baseForm.jizhongqi = this.$route.meta.id
      this.getData()
    },
    async getData () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.itemId
      }
      const res = await getFogLamp(params)
      this.quantity_left = this.baseForm.quantity_left = res.wudeng && res.wudeng.quantity_left
      this.direction_left = this.baseForm.direction_left = res.wudeng && res.wudeng.direction_left.replace('&gt;', '>') || ''
      this.quantity_right = this.baseForm.quantity_right = res.wudeng && res.wudeng.quantity_right
      this.direction_right = this.baseForm.direction_right = res.wudeng && res.wudeng.direction_right.replace('&gt;', '>') || ''
      this.wudengronline = res.wudengronline
      this.wudengroffline = res.wudengroffline
      this.wudenglonline = res.wudenglonline
      this.wudengloffline = res.wudengloffline
      this.wudengl = res.wudengl
      this.wudengr = res.wudengr
      this.showTabData = res.show
      console.log(res)
    },
    submitForm (editForm) {
      this.$refs[editForm].validate(async (valid) => {
        if (valid)
        {
          const params = {
            pathUrl: this.pathUrl,
            ...this.baseForm
          }
          const res = await saveFogLamp(params)
          console.log(res)
          this.$message.success(this.$t('common.save'))
          this.initPage()
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.fog-lamp {
  .greenTxt {
    color: rgb(55, 185, 55);
  }

  .redTxt {
    color: #f14343;
  }

  .inner-form-wrap {
    .baseForm {
      padding: 40px;
    }

    .submit_btn {
      width: 140px;
    }
  }

  .other-info {
    margin-top: 20px;

    .info-wrap {
      padding: 20px;

      .text-info {
        .info-item {
          padding: 25px 0;
          width: 50%;
          border: 1px solid #274785;

          &:first-child {
            border-right: none;
          }

          .info-top {
            padding: 0 25px
          }

          .tab-wrap {
            max-height: 400px;
            overflow-y: auto;
            border-top: 1px solid #274785;
            margin-top: 20px;
            padding: 25px 25px 0
          }
        }
      }
    }
  }
}

.elec-wrap {
  justify-content: center;
  display: flex;
  line-height: 14px;

  .elec-box {
    width: 136px;
    height: 14px;
    background: #fff;
    border-radius: 14px;

    .elec {
      background: #F7B500;
      height: 100%;
      border-radius: 14px;
    }
  }

  .elec-val {
    margin-left: 14px;
  }
}
</style>

