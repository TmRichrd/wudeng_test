<template>
  <div class="roadLog">
    <div class="inner-form-wrap blue7 form-input">
      <div class="section-title">{{ $t('roadDetail.ldrz') }}</div>
      <el-form ref="baseForm" :model="editForm" :rules="rules" class="baseForm">
        <el-row :span="24">
          <el-col :span="24">
            <el-form-item prop="OperateDate" :label="$t('roadDetail.time') + '：'">
              <el-date-picker v-model="editForm.OperateDate" type="datetime" value-format="yyyy-MM-dd hh:mm:ss"
                :placeholder="$t('common.select') + $t('roadDetail.time')" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="OperateContent" :label="$t('roadDetail.content') + '：'">
              <el-input v-model="editForm.OperateContent" maxlength="500" show-word-limit type="textarea" rows="6"
                class="area" :placeholder="$t('common.input') + $t('roadDetail.content')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="24" style="text-align:center">
            <el-button type="primary" class="submit_btn blue2Btn" @click="submitForm('baseForm')">{{ $t('roadDetail.bc')
            }}</el-button>
            <el-button type="primary" class="submit_btn blue2Btn" @click="resetForm">{{ $t('roadDetail.qingkong')
            }}</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="road-info-wrap blue7 bluetab">
      <div class="section-title">{{ $t('roadDetail.ldrz') }}</div>
      <div class="tab-wrap">
        <!-- v-loading="loading" -->
        <el-table :data="tableData" highlight-current-row style="width:100%">
          <el-table-column prop="Id" label="Id" width="60" align="center" />
          <el-table-column prop="OperateDate" :label="$t('roadDetail.time')" width="220" align="center" />
          <el-table-column prop="OperateContent" :label="$t('roadDetail.content')" width="340" align="center" />
          <el-table-column prop="CreateDate" :label="$t('roadDetail.cjrq')" align="center" />
          <el-table-column :label="$t('common.cz')">
            <template slot-scope="scope">
              <el-button type="text" class="btn link-btn" @click="handleEdit(scope.row)">{{ $t('common.edit')
              }}</el-button>
              <el-button type="text" class="btn link-btn" @click="handleDelete(scope.row)">{{ $t('common.del')
              }}</el-button>
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
    <!-- <box-param :addr-info="addrInfo" :box-sn="boxSn" :chonghezha="chonghezha" :device-info="deviceInfo" @getBoxData="getBoxData" /> -->
  </div>
</template>

<script>
import { addLoadLog, delLoadLog, getLoadLogDet, getLoadLogList, editLoadLogList } from '@/api'
// import BoxParam from './../boxParam/index.vue'
// import LinePic from '../../../../../dashboard/components/linePic.vue'
export default {
  name: 'Camera',
  components: {
    // BoxParam,
    // LinePic
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
      tableData: [],
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 8, // 1页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      pathUrl: this.$route.path,
      editForm: {
        OperateDate: '',
        OperateContent: '',
        Id: ''
      },
      rules: {
        OperateDate: [
          { required: true, message: this.$t('roadDetail.timeNotEmpty'), trigger: 'change' }
        ],
        OperateContent: [
          { required: true, message: this.$t('roadDetail.ldrzNotEmpty'), trigger: 'blur' }
        ]
      }
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
  beforeDestroy () {
    if (this.player)
    {
      this.player.stop()
    }
  },
  methods: {
    resetForm () {
      // this.editForm = {
      //   OperateDate: '',
      //   OperateContent: '',
      //   Id: ''
      // }
      this.$refs.baseForm.resetFields()
    },
    initPage () {
      this.itemId = this.$route.meta.id
      this.getLoadLogList()
    },
    async getRoadLogItem () {

    },
    handleEdit (row) {
      this.editForm = {
        OperateDate: row.OperateDate,
        OperateContent: row.OperateContent,
        Id: row.Id
      }
    },
    async handleDelete (row) {
      this.$confirm(this.$t('other.isdelrizhi'), this.$t('other.tishi'), {
        confirmButtonText: this.$t('common.qd'),
        cancelButtonText: this.$t('common.qx'),
        type: 'warning'
      }).then(async () => {
        const res = await delLoadLog({ pathUrl: this.pathUrl, Id: row.Id })
        this.initPage()
        console.log(res)
      })
    },
    async getJizhongqiData () {
      // const params = {
      //   pathUrl: this.pathUrl,
      //   id: this.itemId
      // }
      // const res = await getJizhognQiList(params)
      // this.jiZhongQiOpt = res
      // console.log(res)
    },
    async submitForm (editForm) {
      this.$refs[editForm].validate(async (valid) => {
        if (valid)
        {
          const params = {
            OperateDate: this.editForm.OperateDate,
            OperateContent: this.editForm.OperateContent,
            luduanId: this.itemId
          }
          let resFun = addLoadLog
          if (this.editForm.Id)
          {
            delete params.luduanId
            resFun = editLoadLogList
            params.Id = this.editForm.Id
          }
          const res = await resFun(params)
          this.$message.success(this.$t('common.save'))
          this.resetForm()
          this.initPage()
          console.log(res)
        }
      })
    },
    async getLoadLogList () {
      const params = {
        LuduanId: this.itemId,
        PageSize: this.paginations.pageSize,
        PageIndex: this.paginations.pageIndex
      }
      const res = await getLoadLogList(params)
      console.log(res)
      this.tableData = res.list || []
      this.paginations.total = res.total
    },
    handleCurrentChange (page) {
      this.paginations.pageIndex = page
      this.getLoadLogList()
    },
    // 每页多少条切换
    handleSizeChange (pageSize) {
      this.paginations.pageSize = pageSize
      this.getImageList()
    }
  }
}
</script>

<style lang="less" scoped>
.roadLog {
  position: relative;

  .inner-form-wrap {
    .baseForm {
      padding: 40px;
    }

    .submit_btn {
      width: 140px;
    }
  }

  .area {
    background: none;
    width: 500px;

    ::v-deep .el-textarea__inner {
      color: #fff;
      width: 100%;
      background: none;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
    }

    ::v-deep .el-input__count {
      background: none;
      color: #999;
    }
  }

  .img-box {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
    }
  }

  .road-info-wrap {
    width: 100%;
    margin-top: 20px;
  }
}
</style>

