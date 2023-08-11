<template>
  <div class="accident-manage blue7 bluetab">
    <div class="table-form-wrap flex-row">
      <div class="inline-title">{{ $t('accident.sglb') }}</div>
      <div class="search-wrap flex-row">
        <div style="margin:0 20px;">{{$t('accident.ld')}}：
          <el-select v-model="searchForm.luduan" :placeholder="$t('common.select')">
            <el-option v-for="item in roadGroup" :key="item.id" :label="item.luduan" :value="item.id" />
          </el-select>
        </div>
        <div>{{$t('accident.rq')}}：
          <el-date-picker v-model="searchForm.date" type="daterange" range-separator="—" value-format="yyyy-MM-dd"
            :start-placeholder="$t('roadDetail.kaishi')" :end-placeholder="$t('roadDetail.jieshu')" size="mini" />
        </div>
        <div class="btn-wrap">
          <el-button type="primary" size="small" icon="el-icon-plus" class="add-btn blue2Btn" @click="getData">{{ $t("accident.ss") }}
          </el-button>
          <el-button type="primary" size="small" icon="el-icon-plus" class="add-btn blue2Btn" @click="downLoad">{{ $t("accident.dc") }}
          </el-button>
        </div>
      </div>
    </div>
    <div class="table-wrap">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="luduan" :label="$t('accident.ldm')" />
        <el-table-column prop="begin" :label="$t('accident.ksdh')" />
        <el-table-column prop="end" :label="$t('accident.jsdh')" />
        <el-table-column prop="type" :label="$t('accident.ly')" />
        <el-table-column prop="createdate" :label="$t('accident.rq')" />
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
import { getAccidentCount, getRoadList } from '@/api'
import { isArray } from '@/utils/is.js'

export default {
  data () {
    return {
      pathUrl: this.$route.path,
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], // 每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      tableData: [],
      searchForm: {
        date: '',
        luduan: ''
      },
      roadGroup: []
    }
  },
  mounted () {
    this.getData()
    this.getRoadList()
  },
  methods: {
    async getData () {
      let params = {}
      if (isArray(this.searchForm.date))
      {
        params = {
          pagesize: this.paginations.pageSize,
          pageindex: this.paginations.pageIndex,
          id: this.searchForm.luduan || 0,
          begindate: this.searchForm.date[0] || '',
          enddate: this.searchForm.date[1] || ''
        }
      } else
      {
        params = {
          pagesize: this.paginations.pageSize,
          pageindex: this.paginations.pageIndex,
          id: this.searchForm.luduan || 0,
          begindate: '',
          enddate: ''
        }
      }

      const res = await getAccidentCount({ pathUrl: this.pathUrl, ...params })
      this.tableData = res.list
      this.paginations.total = res.total
    },
    async getRoadList () {
      const res = await getRoadList({ pathUrl: this.pathUrl })
      console.log(res)
      this.roadGroup = res[0]
      this.roadGroup.unshift({ luduan: this.$t('common.select'), id: 0 })
    },
    async downLoad () {
      const params = {
        id: this.searchForm.luduan || 0,
        begindate: this.searchForm.date[0] || '',
        enddate: this.searchForm.date[1] || ''
      }
      const userInfo = JSON.parse(sessionStorage.getItem("userinfo") || "")

      window.open(`${process.env.VUE_APP_URL}/index.php/tuopu/report/shiguexport.html?begindate=${params.begindate}&enddate=${params.enddate}&id=${params.id}&uid=${userInfo.id}`)
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
    dateChange (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less" scoped>
.accident-manage {
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

