<template>
  <div class="accident-manage blue7 bluetab">
    <div class="table-form-wrap flex-row">
      <div class="inline-title">事故列表</div>
      <div class="btn-wrap">
        <el-button type="primary" icon="el-icon-plus" class="add-btn blue2Btn" @click="addAccident">增加</el-button>
      </div>
    </div>
    <div class="table-wrap">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="120"
        />
        <el-table-column
          prop="luduan"
          label="路段名"
          width="300"
        />
        <el-table-column
          prop="shigudate"
          label="日期"
          width="200"
        />
        <el-table-column
          prop="shigushu"
          label="事故数"
          width="120"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="btn link-btn"
              @click="handleEdit(scope.row)"
            >修改</el-button>
            <el-button
              type="text"
              class="btn link-btn"
              @click="handleDelete(scope.row)"
            >删除</el-button>
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
    <el-dialog :visible.sync="dialogTableVisible" width="640px" :title="dialogTitle">
      <div class="dialog-content">
        <el-form ref="editForm" :model="editForm" :inline="true" :rules="rules" label-width="140px">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="luduan" label="路段名：">
                <el-select v-model="editForm.luduan" placeholder="请选择">
                  <el-option
                    v-for="item in roadGroup"
                    :key="item.id"
                    :label="item.luduan"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="shigushu" label="事故数：">
                <el-input v-model.number="editForm.shigushu" class="" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="date" label="日期：">
                <el-date-picker
                  v-model="editForm.date"
                  type="datetime"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  placeholder="请选择日期"
                  @change="dateChange"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="dialog-btn-wrap">
          <el-button type="primary" class="btn" @click="saveData('editForm')">{{ $t('common.qd') }}</el-button>
          <el-button class="btn transparent-btn" @click="dialogTableVisible=false">{{ $t('common.qx') }}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAccidentList, delAccident, getRoadList, addAccident, editAccident } from '@/api'
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogTitle: '添加事故',
      pathUrl: this.$route.path,
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 20, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], // 每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      tableData: [],
      editForm: {
        luduan: '',
        shigushu: '',
        date: ''
      },
      roadGroup: [],
      rules: {
        luduan: [
          { required: true, message: '请选择路段', trigger: 'change' }
        ],
        shigushu: [
          { required: true, message: '请输入事故数' },
          { type: 'number', message: '事故数必须为数字值' }
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.getData()
    this.getRoadList()
  },
  methods: {
    async getData() {
      const params = {
        pagesize: this.paginations.pageSize,
        pageindex: this.paginations.pageIndex
      }
      const res = await getAccidentList({ pathUrl: this.pathUrl, ...params })
      this.tableData = res.list
      this.paginations.total = res.total
      console.log(res)
    },
    async getRoadList() {
      const res = await getRoadList({ pathUrl: this.pathUrl })
      console.log(res)
      this.roadGroup = res[0]
    },
    saveData(editForm) {
      const _this = this
      this.$refs[editForm].validate(async(valid) => {
        if (valid) {
          const params = {
            pathUrl: _this.pathUrl,
            luduanid: _this.editForm.luduan,
            shigushu: _this.editForm.shigushu,
            date: _this.editForm.date,
            type: ''
          }
          if (_this.editForm.id) {
            params.id = _this.editForm.id
            params.luduan = _this.editForm.luduan
            delete params.luduanid
            await editAccident(params)
            _this.$message.success(_this.$t('common.save'))
          }
          if (!_this.editForm.id) {
            await addAccident(params)
            _this.$message.success(_this.$t('common.addSuccess'))
          }
          _this.getData()
          // eslint-disable-next-line require-atomic-updates
          _this.dialogTableVisible = false
        }
      })
    },
    handleEdit(row) {
      this.editForm.id = row.id
      this.editForm.luduan = row.luduan
      this.editForm.shigushu = row.shigushu
      this.editForm.date = row.shigudate
      this.dialogTableVisible = true
    },
    addAccident() {
      this.clearForm()
      this.dialogTableVisible = true
    },
    clearForm() {
      this.editForm = {
        luduan: '',
        shigushu: '',
        date: ''
      }
    },
    handleDelete(row) {
      this.$confirm(this.$t('other.isdeluser'), this.$t('other.tishi'), {
        confirmButtonText: this.$t('common.qd'),
        cancelButtonText: this.$t('common.qx'),
        type: 'warning'
      }).then(async() => {
        const res = await delAccident({ pathUrl: this.pathUrl, id: row.id })
        this.getData()
        console.log(res)
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
    },
    dateChange(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less" scoped>
.accident-manage{
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

