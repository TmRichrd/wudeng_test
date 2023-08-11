<template>
  <div class="concentrator blue7 bluetab">
    <div class="table-form-wrap flex-row">
      <div class="inline-title">{{ $t('concentrator.jzqlb') }}</div>
      <!-- <div class="btn-wrap">
        <el-button type="primary" icon="el-icon-plus" class="add-btn blue2Btn" @click="submitForm('loginForm')">增加</el-button>
      </div> -->
    </div>
    <div class="table-wrap">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="cid"
          label="ID"
          width="120"
        />
        <el-table-column
          prop="jizhongqi"
          :label="$t('concentrator.jzqbh')"
          width="300"
        />
        <el-table-column :label="$t('common.cz')">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="btn link-btn"
              @click="handleDelete(scope.row)"
            >{{ $t('common.del') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
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
      </div>
    </div>
  </div>
</template>

<script>
import { getConcentratorPageList, delConcentrator } from '@/api'
export default {
  data() {
    return {
      pathUrl: this.$route.path,
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
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const params = {
        pagesize: this.paginations.pageSize,
        pageindex: this.paginations.pageIndex
      }
      const res = await getConcentratorPageList({ pathUrl: this.pathUrl, ...params })
      console.log(res, '0000')
      this.tableData = res.list || []
      this.paginations.total = res.total
      console.log(res)
    },
    handleDelete(row) {
      const _this = this
      this.$confirm(this.$t('other.isdel'), this.$t('other.tishi'), {
        confirmButtonText: this.$t('common.qd'),
        cancelButtonText: this.$t('common.qx'),
        type: 'warning'
      }).then(async() => {
        await delConcentrator({ pathUrl: this.pathUrl, id: row.cid })
        _this.$message.success(_this.$t('common.delSuccess'))
        this.getData()
      })
    },
    // 每页多少条切换
    handleSizeChange(pageSize) {
      this.paginations.pageSize = pageSize
      this.getData()
    },
    // 上下分页
    handleCurrentChange(page) {
      this.paginations.pageIndex = page
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.concentrator{
  .table-form-wrap{
    width: 100%;
    justify-content: space-between;
    padding: 16px 25px;
     border-bottom: 1px solid @adminBlue8;
    .inline-title{
      line-height: 30px;
    }
    .add-btn{
      padding: 0 !important;
      width: 92px;
      height: 32px;
    }

  }
  .table-wrap{
    padding: 30px 20px;
    .link-btn{
      padding:6px 10px !important;
      color: #FFCD44;
    }
  }
}
</style>

