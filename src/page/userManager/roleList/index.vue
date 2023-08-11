<template>
  <div class="role-list blue7 bluetab">
    <div class="table-form-wrap flex-row">
      <div class="inline-title">{{ $t('roleList.jslb') }}</div>
      <div class="btn-wrap">
        <el-button type="primary" icon="el-icon-plus" class="add-btn blue2Btn" @click="addRole">{{ $t('roleList.tjjs')
        }}</el-button>
      </div>
    </div>
    <div class="table-wrap">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="name" :label="$t('roleList.jsmc')" width="300" />
        <el-table-column prop="remark" :label="$t('roleList.jsms')" width="200" />
        <el-table-column :label="$t('roleList.zt')" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">{{ $t('roleList.qy') }}</span>
            <span v-else>{{ $t('roleList.jy') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.cz')">
          <template slot-scope="scope">
            <el-button type="text" class="btn link-btn" @click="handleAuthEdit(scope.row)">{{ $t('roleList.qxsz')
            }}</el-button>
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
    <el-dialog :visible.sync="dialogTableVisible" width="640px" :title="dialogTitle">
      <div class="dialog-content">
        <el-form ref="editForm" :model="editForm" :inline="true" :rules="rules" label-width="140px">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="name" :label="$t('roleList.jsmc') + '：'">
                <el-input v-model="editForm.name" class="" type="text" :placeholder="$t('common.input')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="remark" :label="$t('roleList.jsms') + '：'">
                <el-input v-model="editForm.remark" class="" type="text" :placeholder="$t('common.input')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="status" :label="$t('roleList.zt') + '：'">
                <el-checkbox v-model="editForm.open" @change="checkChange('open')">{{ $t('roleList.qy') }}</el-checkbox>
                <el-checkbox v-model="editForm.forbid" @change="checkChange('forbid')">{{ $t('roleList.jy')
                }}</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="dialog-btn-wrap">
          <el-button type="primary" class="btn" @click="saveData('editForm')">{{ $t('common.qd') }}</el-button>
          <el-button class="btn transparent-btn" @click="dialogTableVisible = false">{{ $t('common.qx') }}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 修改角色权限 -->
    <el-dialog :visible.sync="editAuthDiolag" width="640px" :title="dialogTitle">
      <div class="dialog-content">
        <div style="padding:20px 0">
          <el-tree ref="tree" :props="defaultProps" :data="AuthList" show-checkbox node-key="url" />
        </div>
        <div slot="footer" class="dialog-footer">
          <div class="dialog-btn-wrap">
            <el-button type="primary" class="btn" @click="saveAuth">{{ $t('common.qd') }}</el-button>
            <el-button class="btn transparent-btn" @click="editAuthDiolag = false">{{ $t('common.qx') }}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, delRole, getRoleAuth, updateRoleAuth, addRole, getRoleById, updateRole } from '@/api'
export default {
  data () {
    return {
      pathUrl: this.$route.path,
      dialogTableVisible: false,
      editAuthDiolag: false,
      AuthList: [],
      roleUrls: [],
      defaultProps: {
        children: 'children',
        label: function (data) {
          return data.meta.title
        }
        // disabled: "hasChild",  //还可以使用disabled控制节点是否能被选择
      },
      dialogTitle: this.$t('roleList.bjjsxx'),
      editForm: {
        name: '',
        remark: '',
        forbid: false,
        open: true
      },
      currentId: '',
      paginations: {
        total: 200, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 10, // 1页显示多少条
        pageSizes: [10], // 每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      tableData: [],
      rules: {
        name: [
          { required: true, message: this.$t('common.input') + this.$t('roleList.jsmc'), trigger: 'blur' },
          { min: 2, max: 16, message: this.$t('roleList.length'), trigger: 'blur' }
        ],
        remark: [
          { required: true, message: this.$t('common.input') + this.$t('roleList.jsms'), trigger: 'blur' }
        ]
      }
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
      const res = await getRoleList({ pathUrl: this.pathUrl, ...params })
      this.tableData = res.roles
      this.paginations.total = res.total
      console.log(res)
    },
    async getRoleAuth () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.currentId
      }
      const res = await getRoleAuth(params)
      this.AuthList = res.menu
      this.roleUrls = res.roleUrls
      console.log(this.$refs.tree)
      this.$nextTick(() => {
        // this.roleUrls.map(item => {
        //   console.log(item)
        //   this.$refs.tree.setChecked(item, true, false)
        // })
        // this.$refs.tree.setCheckedKeys(this.roleUrls)
        if (this.roleUrls && this.roleUrls.length)
        {
          this.roleUrls.forEach(role => {
            this.$refs.tree.setChecked(role, true)
          })
        }
      })
      console.log(res)
    },
    handleDelete (row) {
      this.$confirm(this.$t('other.isdeluser'), this.$t('other.tishi'), {
        confirmButtonText: this.$t('common.qd'),
        cancelButtonText: this.$t('common.qx'),
        type: 'warning'
      }).then(async () => {
        await delRole({ pathUrl: this.pathUrl, id: row.id })
        this.getData()
        this.$message.success(this.$t('common.delSuccess'))
      })
    },
    blackRole (row) {
      this.$confirm(this.$t('other.isjinyong'), this.$t('other.tishi'), {
        confirmButtonText: this.$t('common.qd'),
        cancelButtonText: this.$t('common.qx'),
        type: 'warning'
      }).then(async () => {
        await this.forbidRole({ pathUrl: this.pathUrl, id: row.id })
        this.getData()
        this.$message.success(this.$t('common.jySuccess'))
      })
    },
    openRole () {

    },
    handleAuthEdit (row) {
      this.currentId = row.id
      this.editAuthDiolag = true
      this.getRoleAuth()
    },
    async saveAuth () {
      const idArr = this.$refs.tree.getCheckedNodes().map(item => item.id)
      const parentIdArr = this.$refs.tree.getHalfCheckedNodes().map(item => item.id)
      const params = {
        menuId: idArr.concat(parentIdArr),
        roleId: this.currentId
      }
      const res = await updateRoleAuth({ pathUrl: this.pathUrl, ...params })
      console.log(res)
      this.$message.success(this.$t('common.editSuccess'))
      this.editAuthDiolag = false
      this.getData()
    },
    checkChange (type) {
      console.log(type)
      if (type === 'open' && this.editForm.open) this.editForm.forbid = false
      if (type === 'open' && !this.editForm.open) this.editForm.forbid = true
      if (type === 'forbid' && this.editForm.forbid) this.editForm.open = false
      if (type === 'forbid' && !this.editForm.forbid) this.editForm.open = true
      // if (this.editForm.forbid) this.editForm.open = false
    },
    saveData (editForm) {
      const _this = this
      this.$refs[editForm].validate(async (valid) => {
        if (valid)
        {
          const params = {
            // header: 'application/x-www-form-urlencoded',
            // header: 'multipart/form-data',
            pathUrl: _this.pathUrl,
            name: _this.editForm.name,
            remark: _this.editForm.remark,
            status: _this.editForm.open ? 1 : 0
          }
          console.log(_this.$refs[editForm])
          if (_this.editForm.id)
          {
            params.id = _this.editForm.id
            await updateRole(params)
            _this.$message.success(_this.$t('common.save'))
          }
          if (!_this.editForm.id)
          {
            await addRole(params)
            _this.$message.success(_this.$t('common.addSuccess'))
          }
          _this.getData()
          // eslint-disable-next-line require-atomic-updates
          _this.dialogTableVisible = false
        }
      })
    },
    clearForm () {
      this.editForm = {
        name: '',
        remark: '',
        forbid: false,
        open: true
      }
    },
    handleEdit (row) {
      this.clearForm()
      this.dialogTitle = this.$t('roleList.bjjsxx')
      this.editForm = {
        id: row.id,
        name: row.name,
        remark: row.remark,
        open: Boolean(row.status),
        forbid: !row.status
      }
      this.dialogTableVisible = true
    },
    addRole () {
      this.clearForm()
      this.dialogTitle = this.$t('roleList.tjjs')
      this.dialogTableVisible = true
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
.role-list {
  .table-form-wrap {
    width: 100%;
    padding: 16px 25px;
    justify-content: space-between;
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
<style lang="less">
.role-list {
  .el-tree {
    color: #fff !important;
    ;
    background: none !important;
  }

  .el-tree-node__label {
    margin-left: 6px;
  }

  .el-tree-node__content {
    background: none !important;
  }

  .el-tree-node__content:hover {
    background: #177DDC !important;
  }

  .is-focusable {
    background: none !important;
  }

  .is-current.is-focusable>.el-tree-node__content {
    background: #177DDC !important;
  }
}
</style>

