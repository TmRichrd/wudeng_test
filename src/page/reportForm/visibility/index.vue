<template>
  <div class="visibility blue7 bluetab">
    <div class="table-form-wrap flex-row">
      <div class="inline-title">{{ $t('visibility.njd') }}</div>
      <div class="search-wrap flex-row">
        <div style="margin:0 20px;">{{ $t('visibility.jzq') }}：
          <el-select v-model="searchForm.sjzq" :placeholder="$t('common.select') + $t('visibility.jzq')" clearable>
            <el-option v-for="item in jzqList" :key="item.jizhongqi" :label="item.jizhongqi" :value="item.jizhongqi" />
          </el-select>
        </div>
        <div>{{ $t('visibility.rq') }}：
          <el-date-picker v-model="searchForm.date" type="daterange" range-separator="—" value-format="yyyy-MM-dd"
            :start-placeholder="$t('roadDetail.kaishi')" :end-placeholder="$t('roadDetail.jieshu')" size="mini" />
        </div>
        <div style="margin:0 20px;">{{ $t('visibility.njd') }}：
          <el-input v-model="searchForm.njd" class="" type="text" :placeholder="$t('common.input')" />
        </div>
        <div class="btn-wrap">
          <el-button type="primary" size="small" icon="el-icon-plus" class="add-btn blue2Btn" @click="getData">{{
            $t('visibility.ss') }}</el-button>
          <el-button type="primary" size="small" icon="el-icon-plus" class="add-btn blue2Btn" @click="downLoad">{{
            $t('visibility.dc') }}</el-button>
        </div>
      </div>
    </div>
    <div v-if="tableData && tableData.length" class="table-wrap">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" :label="$t('visibility.xh')" width="120" />
        <el-table-column prop="jizhongqi" :label="$t('visibility.jzq')" width="" />
        <el-table-column prop="njd" :label="$t('visibility.njd')" width="" />
        <el-table-column prop="date" :label="$t('visibility.rq')" width="" />
      </el-table>
      <div class="pagination">
        <el-pagination v-if="paginations.total > 0" background :page-sizes="paginations.pageSizes"
          :page-size="paginations.pageSize" :layout="paginations.layout" :total="paginations.total"
          :current-page="paginations.pageIndex" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
      </div>
    </div>
    <div v-else class="empty-tip">{{ $t('roadDetail.empty') }}</div>
  </div>
</template>

<script>
import { getReportVisibility, getConcentratorList } from '@/api'
import { isArray } from '@/utils/is.js'
export default {
  data () {
    return {
      pathUrl: this.$route.path,
      searchForm: {
        date: [],
        njd: '',
        sjzq: ''
      },
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], // 每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      tableData: [],
      jzqList: []
    }
  },
  mounted () {
    this.getData()
    this.getJzq()
  },
  methods: {
    async getJzq () {
      const params = {
        pagesize: 100000,
        pageindex: 1
      }
      const res = await getConcentratorList({ pathUrl: this.pathUrl, ...params })
      this.jzqList = res || []
    },
    async getData () {
      let params = {}
      if (isArray(this.searchForm.date))
      {
        params = {
          njd: this.searchForm.njd,
          start: this.searchForm.date[0] || '',
          end: this.searchForm.date[1] || '',
          jizhongqi: this.searchForm.sjzq,
          pagesize: this.paginations.pageSize,
          pageindex: this.paginations.pageIndex
        }
      } else
      {
        params = {
          njd: this.searchForm.njd,
          start: '',
          end: '',
          jizhongqi: this.searchForm.sjzq,
          pagesize: this.paginations.pageSize,
          pageindex: this.paginations.pageIndex
        }
      }
      const res = await getReportVisibility({ pathUrl: this.pathUrl, ...params })
      this.tableData = res.list
      this.paginations.total = res.total


    },
    async downLoad () {
      // const res = await downLoadReportVisibility({ pathUrl: this.pathUrl })
      const params = {
        start: this.searchForm.date[0] || '',
        end: this.searchForm.date[1] || '',
        jizhongqi: this.searchForm.sjzq
      }
      // console.log(res)
      const userInfo = JSON.parse(sessionStorage.getItem("userinfo") || "")
      window.open(`${process.env.VUE_APP_URL}/index.php/tuopu/report/njdlogexport.html?start=${params.start}&end=${params.end}&uid=${userInfo.id}`)
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

<style lang="less" scoped>
.visibility {
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

  .empty-tip {
    font-size: 14px;
    width: 100%;
    line-height: 36px;
    color: #fff;
    text-align: center;
  }

  .table-wrap {
    padding: 30px 20px;

    .link-btn {
      padding: 6px 10px !important;
      color: #FFCD44;
    }
  }
}
</style>

