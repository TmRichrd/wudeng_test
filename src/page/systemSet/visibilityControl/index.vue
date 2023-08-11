<template>
  <div class="time-control blue7 bluetab">
    <div class="table-form-wrap flex-row">
      <div class="inline-title">{{ $t('visibilityControl.njdlb') }}</div>
      <!-- <div class="btn-wrap">
        <el-button type="primary" icon="el-icon-plus" class="add-btn blue2Btn" @click="submitForm('loginForm')">增加</el-button>
      </div> -->
      <el-button v-if="this.$route.query.jizhongqiId" type="primary" class="btn" @click="backPage">{{ $t('roadSurvey.back') }}</el-button>
    </div>
    <div class="table-wrap">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="grade" :label="$t('visibilityControl.dj')" width="120" />

        <el-table-column :label="$t('visibilityControl.njzm')" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.min }} 到 {{ scope.row.max }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('visibilityControl.gzms')" width="200">
          <template slot-scope="scope">
            <span>{{ workDict.a1[scope.row.model] }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('visibilityControl.ld')" width="200">
          <template slot-scope="scope">
            <span>{{ workDict.a2[scope.row.liangdu] }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('visibilityControl.zkb')" width="120">
          <template slot-scope="scope">
            <span>{{ workDict.a8[scope.row.zhankongbi] }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.cz')">
          <template slot-scope="scope">
            <el-button type="text" class="btn link-btn" @click="handleEdit(scope.row)">{{ $t('common.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="this.$route.query.jizhongqiId" class="btn-wrap">
        <el-button type="primary" class="btn" @click="runRule(1)">{{ $t('other.huifu') }}</el-button>
        <el-button type="primary" class="btn" @click="runRule(0)">{{ $t('other.xiafa') }}</el-button>
      </div>
      <!-- <div class="pagination">
        <el-pagination
          v-if="paginations.total > 0"
          background
          :page-sizes="paginations.pageSizes"
          :page-size="paginations.pageSize"
          :layout="paginations.layout"
          :total="paginations.total"
          :current-page="paginations.pageIndex"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div> -->
    </div>
    <el-dialog :visible.sync="dialogTableVisible" width="640px" :title="$t('visibilityControl.bjnjdyxfa')">
      <div class="dialog-content">
        <el-form ref="editForm" :model="editForm" :rules="rules" :inline="true" label-width="140px">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="max" :label="$t('visibilityControl.njd') + '：'">
                <!-- <el-input v-model="editForm.min" style="width:100px;" type="number" placeholder="请输入" /> -->
                <!-- 至 -->
                <el-input v-model="editForm.max" style="width:200px;" type="number" :placeholder="$t('common.input')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="model" :label="$t('visibilityControl.gzms') + '：'">
                <el-select v-model="editForm.model" :placeholder="$t('common.select')">
                  <el-option v-for="item in modeData" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="liangdu" :label="$t('visibilityControl.ld') + '：'">
                <el-select v-model="editForm.liangdu" :placeholder="$t('common.select')">
                  <el-option v-for="item in lianduData" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="zhankongbi" :label="$t('visibilityControl.zkb') + '：'">
                <el-select v-model="editForm.zhankongbi" :placeholder="$t('common.select')">
                  <el-option v-for="item in zhanData" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="sound_text" :label="$t('visibilityControl.yzbfwz') + '：'">
                <el-input v-model="editForm.sound_text" type="text" :placeholder="$t('common.input')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="led_text" :label="$t('visibilityControl.ledwz') + '：'">
                <el-input v-model="editForm.led_text" type="text" :placeholder="$t('common.input')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="takephoto" :label="$t('visibilityControl.sxtpz') + '：'">
                <el-checkbox v-model="editForm.y" @change="checkChange('y')">{{ $t('visibilityControl.shi') }}</el-checkbox>
                <el-checkbox v-model="editForm.n" @change="checkChange('n')">{{ $t('visibilityControl.fou') }}</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="dialog-btn-wrap">
          <el-button type="primary" class="btn" @click="saveData('editForm')">{{ $t('common.qd') }}</el-button>
          <el-button class="btn" @click="dialogTableVisible = false">{{ $t('common.qx') }}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { getVsibilityList, editCisibility, resetVisibiRule, roadRunModifyResult } from '@/api'
export default {
  data () {
    return {
      pathUrl: this.$route.path,
      dialogTableVisible: false,
      jizhongqiId: this.$route.query.jizhongqiId || 0,
      editForm: {
        grade: '',
        max: '',
        model: '',
        liangdu: '',
        zhankongbi: '',
        sound_text: '',
        led_text: '',
        takephoto: 'N',
        n: true,
        y: false

      },
      paginations: {
        total: 200, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], // 每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      tableData: [],
      workDict: {
        a1: {},
        a2: {},
        a8: {}
      },
      rules: {
        max: [
          { required: true, message: this.$t('common.input'), trigger: 'blur' }
        ],
        model: [
          { required: true, message: this.$t('common.select'), trigger: 'change' }
        ],
        liangdu: [
          { required: true, message: this.$t('common.select'), trigger: 'change' }
        ],
        zhankongbi: [
          { required: true, message: this.$t('common.select'), trigger: 'change' }
        ],
        // sound_text: [
        //   { required: true, message: '请输入', trigger: 'blur' }
        // ],
        // led_text: [
        //   { required: true, message: '请输入', trigger: 'blur' }
        // ],
        takephoto: [
          { required: true, message: this.$t('common.select'), trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    hourOpt () {
      const opt = []
      for (let i = 0; i <= 12; i++)
      {
        opt.push({
          value: i,
          label: i
        })
      }
      return opt
    },
    minuteOpt () {
      const opt = []
      for (let i = 0; i <= 59; i++)
      {
        console.log(i)
        opt.push({
          value: i,
          label: i
        })
      }
      return opt
    },
    modeData () {
      const mode = this.workDict.a1
      const opt = []
      Object.keys(mode).map(item => {
        opt.push({
          value: item,
          label: mode[item]
        })
      })
      return opt
    },
    lianduData () {
      const mode = this.workDict.a2
      const opt = []
      Object.keys(mode).map(item => {
        opt.push({
          value: item,
          label: mode[item]
        })
      })
      return opt
    },
    zhanData () {
      const mode = this.workDict.a8
      const opt = []
      Object.keys(mode).map(item => {
        opt.push({
          value: item,
          label: mode[item]
        })
      })
      return opt
    }
  },
  mounted () {
    console.log(this.$route)
    this.getData()
  },
  methods: {
    async getData () {
      const params = {
        pagesize: this.paginations.pageSize,
        pageindex: this.paginations.pageIndex,
        jizhongqiId: this.jizhongqiId
      }
      const res = await getVsibilityList({ pathUrl: this.pathUrl, ...params })
      this.tableData = res.list
      this.paginations.total = res.total
      this.workDict.a1 = res.gn.a1.data
      this.workDict.a2 = res.gn.a2.data
      this.workDict.a8 = res.gn.a8.data
      console.log(res)
    },
    async runRule (type) {
      const params = {
        ostype: type,
        id: this.jizhongqiId
      }
      try
      {
        const res = await resetVisibiRule(params)
        console.log(res)
        this.awiatResult(res, roadRunModifyResult, 'Y')
      } catch (error)
      {
        this.getData()
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
            this.getData()
          }, 2000)
        } else
        {
          this.$message.error(this.$t('common.error'))
          this.getData()
        }
      }, 1000)
    },
    backPage () {
      this.$router.go(-1)
    },
    handleEdit (row) {
      this.clearForm()
      // eslint-disable-next-line no-unused-vars
      for (const item in row)
      {
        if (row[item])
        {
          this.editForm[item] = row[item]
        }
      }
      if (this.editForm.takephoto == 'Y')
      {
        this.editForm.y = true
        this.editForm.n = false
      }
      console.log(this.editForm)
      this.dialogTableVisible = true
    },
    saveData (editForm) {
      const _this = this
      this.$refs[editForm].validate(async (valid) => {
        if (valid)
        {
          const params = {
            grade: _this.editForm.grade,
            pathUrl: _this.pathUrl,
            max: _this.editForm.max,
            ledtext: _this.editForm.led_text,
            sound_text: _this.editForm.sound_text,
            jizhongqi: _this.jizhongqiId,
            model: _this.editForm.model,
            liangdu: _this.editForm.liangdu,
            zhankongbi: _this.editForm.zhankongbi,
            takephoto: _this.editForm.y ? 'Y' : 'N'
          }
          console.log(params)
          await editCisibility(params)
          _this.$message.success(_this.$t('common.save'))
          _this.getData()
          // eslint-disable-next-line require-atomic-updates
          _this.dialogTableVisible = false
        }
      })
    },
    clearForm () {
      this.editForm = {
        grade: '',
        max: '',
        model: '',
        liangdu: '',
        zhankongbi: '',
        sound_text: '',
        led_text: '',
        takephoto: 'N',
        n: true,
        y: false
      }
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
    },
    checkChange (type) {
      console.log(type)
      if (type === 'y' && this.editForm.y) this.editForm.n = false
      if (type === 'y' && !this.editForm.y) this.editForm.n = true
      if (type === 'n' && this.editForm.n) this.editForm.y = false
      if (type === 'n' && !this.editForm.n) this.editForm.y = true
      // if (this.editForm.forbid) this.editForm.open = false
    }
  }
}
</script>

<style lang="less" scoped>
.time-control {
  .table-form-wrap {
    width: 100%;
    justify-content: space-between;
    padding: 16px 25px;
    border-bottom: 1px solid @adminBlue8;

    .inline-title {
      line-height: 30px;
    }

    .add-btn {
      padding: 0 !important;
      width: 92px;
      height: 32px;
    }

  }

  .table-wrap {
    padding: 30px 20px;

    .link-btn {
      padding: 6px 10px !important;
      color: #FFCD44;
    }
  }
}

.btn-wrap {
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
}

.dialog-btn-wrap {
  width: 100%;
  text-align: right;
}
</style>

