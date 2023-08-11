<template>
  <div class="opera-wrap blue7 bluetab">
    <div class="table-form-wrap flex-row">
      <div class="inline-title">{{ $t('operationLog.rzlb') }}</div>
      <div class="search-wrap">
        <div>{{ $t('operationLog.rq') }}：
          <el-date-picker v-model="searchForm.date" type="daterange" range-separator="—" value-format="yyyy-MM-dd"
            :start-placeholder="$t('roadDetail.kaishi')" :end-placeholder="$t('roadDetail.jieshu')" size="mini" />
        </div>
        <div class="btn-wrap">
          <el-button type="primary" size="small" icon="el-icon-plus" class="add-btn blue2Btn"
            @click="getData">{{ $t('operationLog.ss') }}</el-button>
          <el-button type="primary" size="small" icon="el-icon-plus" class="add-btn blue2Btn"
            @click="downLoad">{{ $t('operationLog.dc') }}</el-button>
        </div>
      </div>
    </div>
    <div class="table-wrap">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="username" :label="$t('operationLog.yhm')" width="200" />
        <el-table-column prop="object" :label="$t('operationLog.czlx')" width="200" />
        <el-table-column prop="action" :label="$t('operationLog.cznr')" width="200" />
        <el-table-column prop="createdate" :label="$t('operationLog.rq')" width="200" />
        <el-table-column prop="ip" :label="$t('operationLog.ipdz')" width="" />
      </el-table>
      <div class="pagination">
        <el-pagination v-if="paginations.total > 0" background :page-sizes="paginations.pageSizes"
          :page-size="paginations.pageSize" :layout="paginations.layout" :total="paginations.total"
          :current-page="paginations.pageIndex" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
      </div>
    </div>
  </div>
</template>

<script>
import { getReportOpera, downLoadReportOpera } from '@/api'
import { isArray } from '@/utils/is.js'
export default {
  data () {
    return {
      pathUrl: this.$route.path,
      searchForm: {
        date: []
      },
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], // 每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      tableData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      console.log(this.searchForm.date)
      let params = {}
      if (isArray(this.searchForm.date))
      {
        params = {
          start: this.searchForm.date[0] || '',
          end: this.searchForm.date[1] || '',
          pagesize: this.paginations.pageSize,
          pageindex: this.paginations.pageIndex
        }
      } else
      {
        params = {
          start: '',
          end: '',
          pagesize: this.paginations.pageSize,
          pageindex: this.paginations.pageIndex
        }
      }

      const res = await getReportOpera({ pathUrl: this.pathUrl, ...params })
      this.tableData = res.list
      this.paginations.total = res.total
    },
    async downLoad () {
      const params = {
        start: this.searchForm.date[0] || '',
        end: this.searchForm.date[1] || ''
      }
      const userInfo = JSON.parse(sessionStorage.getItem("userinfo") || "")
      window.open(`${process.env.VUE_APP_URL}/index.php/tuopu/report/operatelogexport.html?start=${params.start}&end=${params.end}&uid=${userInfo.id}`)
      // const res = await downLoadReportOpera(params)
      // console.log(res)
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
.opera-wrap {
  .search-wrap {
    margin-left: 200px;
    flex: 1;
    display: flex;
    justify-content: space-between;
  }

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
</style>

