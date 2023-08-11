<template>
  <div class="concentrator-group blue7 bluetab">
    <div class="table-form-wrap flex-row">
      <div class="inline-title">{{ $t('concentratorGroup.ldfzlb') }}</div>
      <div class="btn-wrap">
        <el-button type="primary" icon="el-icon-plus" class="add-btn blue2Btn" @click="addGroup">{{
          $t('concentratorGroup.zj') }}</el-button>
      </div>
    </div>
    <div class="table-wrap">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="cat_id" :label="$t('concentratorGroup.bh')" width="200" />
        <el-table-column prop="name" :label="$t('concentratorGroup.fzmc')" />
        <el-table-column :label="$t('common.cz')">
          <template slot-scope="scope">
            <el-button type="text" class="btn link-btn" @click="handleEdit(scope.row)">{{ $t('common.edit') }}</el-button>
            <el-button type="text" class="btn link-btn" @click="handleDelete(scope.row)">{{ $t('common.del')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-if="paginations.total > 0" background :page-sizes="paginations.pageSizes"
          :page-size="paginations.pageSize" :layout="paginations.layout" :total="paginations.total"
          :current-page="paginations.pageIndex" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
      </div>
    </div>
    <el-dialog :visible.sync="dialogTableVisible" width="840px" :title="dialogTitle">
      <div class="inp-line">
        <div class="t">{{ $t('concentratorGroup.fzmc') }}：</div>
        <el-input v-model="editForm.groupName" class="inp" type="text" :placeholder="$t('common.input')" />
      </div>
      <div class="dialog-content">
        <el-transfer ref="transfer" v-model="editForm.rightData" filterable :left-default-checked="[2, 3]"
          :right-default-checked="[1]" :titles="[$t('concentratorGroup.xzld'), $t('concentratorGroup.ytj')]"
          :button-texts="[$t('concentratorGroup.qc'), $t('concentratorGroup.tj')]" :render-content="renderFunc" :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }" :data="groupData">
          <!-- <el-button slot="left-footer" class="transfer-footer" size="small">操作</el-button>
          <el-button slot="right-footer" class="transfer-footer" size="small">操作</el-button> -->
        </el-transfer>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="dialog-btn-wrap">
          <el-button type="primary" class="btn" @click="saveData">{{ $t('common.qd') }}</el-button>
          <el-button class="btn transparent-btn" @click="dialogTableVisible = false">{{ $t('common.qx') }}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoadGroupList, DelRoadGroup, getGroupById, updateGrounp, getAllGroupRoad, addGrounp } from '@/api'

export default {
  name: 'ConcentratorGroup',
  data () {
    return {
      pathUrl: this.$route.path,
      editForm: {
        groupName: '',
        rightData: []
      },
      dialogTitle: this.$t('concentratorGroup.jzqfz'),
      dialogTableVisible: false,
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 10, // 1页显示多少条
        pageSizes: [5, 10, 15, 20], // 每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      groupData: [],
      tableData: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const params = {
        pagesize: this.paginations.pageSize,
        pageindex: this.paginations.pageIndex
      }
      const res = await getRoadGroupList({ pathUrl: this.pathUrl, ...params })
      this.tableData = res.list
      this.paginations.total = res.total
      console.log(res)
    },
    renderFunc (h, option) {
      console.log(option)
      return <span>{option.key} - {option.label}</span>
    },
    async saveData () {
      if (!this.editForm.groupName)
      {
        this.$message.error(this.$t('common.input') + this.$t('roadSurvey.group'))
        return
      }
      const params = {
        pathUrl: this.pathUrl,
        name: this.editForm.groupName,
        luduans: this.editForm.rightData.join(',')
      }
      let res = null
      if (this.editForm.id)
      {
        params.cat_id = this.editForm.id
        res = await updateGrounp(params)
      } else
      {
        res = await addGrounp(params)
      }
      console.log(params)
      console.log(res)
      this.$message.success(this.$t('common.save'))
      this.getData()
      this.dialogTableVisible = false
    },
    async handleEdit (row) {
      this.dialogTableVisible = true
      const params = {
        pathUrl: this.pathUrl,
        id: row.cat_id
      }
      const res = await getGroupById(params)
      this.editForm.groupName = row.name
      this.editForm.id = row.cat_id
      this.groupData = res.weifenzu.map(item => {
        return {
          label: item.luduan,
          key: item.id
        }
      })
      const yifenzu = res.yifenzu.map(item => {
        return {
          label: item.luduan,
          key: item.id
        }
      })
      this.groupData = this.groupData.concat(yifenzu)
      this.editForm.rightData = res.yifenzu.map(item => item.id)
      console.log(this.editForm.rightData)
      console.log(this.groupData)
    },
    async addGroup () {
      this.clearForm()
      this.dialogTableVisible = true
      const res = await getAllGroupRoad({ pathUrl: this.pathUrl })
      this.groupData = res.map(item => {
        return {
          label: item.luduan,
          key: item.id
        }
      })
    },
    clearForm () {
      this.editForm = {
        cat_id: '',
        name: '',
        luduans: ''
      }
    },
    handleDelete (row) {
      this.$confirm(this.$t('other.isdelgroup'), this.$t('other.tishi'), {
        confirmButtonText: this.$t('common.qd'),
        cancelButtonText: this.$t('common.qx'),
        type: 'warning'
      }).then(async () => {
        const res = await DelRoadGroup({ pathUrl: this.pathUrl, id: row.cat_id })
        this.getData()
        console.log(res)
        this.$message.success(this.$t('common.delSuccess'))
      })
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

<style lang="less">
.el-transfer-panel,
.el-transfer-panel__header {
  text-align: left;
  background: @adminBlue4 !important;
  color: #fff !important;
}

.el-checkbox__label,
.el-checkbox__label span {
  color: #fff !important;
}

.el-transfer-panel {
  border: 1px solid rgba(255, 255, 255, .3) !important;
}

.el-transfer-panel__header {
  border-bottom: 1px solid rgba(255, 255, 255, .3) !important;
}

.el-transfer__button {
  padding: 7px 12px;
}

.el-transfer__button.is-disabled {
  color: #333;
  background: #999;
  border-color: #999;
}
</style>
<style lang="less" scoped>
.concentrator-group {
  .dialog-content {
    text-align: center;
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

