<template>
  <div class="user-list blue7 bluetab">
    <div class="table-form-wrap search-wrap flex-row">
      <!-- <div class="inline-title">事故列表</div> -->
      <div class="flex-row">
        <div style="margin:0 20px;">{{ $t('userList.yhm') }}：
          <el-input v-model="searchForm.user_login" class="" type="text" :placeholder="$t('common.input')" />
        </div>
        <div style="margin:0 20px;">{{ $t('userList.yx') }}：
          <el-input v-model="searchForm.user_email" class="" type="text" :placeholder="$t('common.input')" />
        </div>
        <div class="btn-wrap">
          <el-button type="primary" icon="el-icon-search" class="add-btn blue2Btn" @click="getData">{{ $t('userList.ss')
          }}</el-button>
        </div>
      </div>
      <div class="btn-wrap">
        <el-button type="primary" icon="el-icon-plus" class="add-btn blue2Btn" @click="addUser">{{ $t('userList.tjyh')
        }}</el-button>
      </div>
    </div>
    <div class="table-wrap">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="user_login" :label="$t('userList.yhm')" width="300" />
        <el-table-column prop="last_login_ip" :label="$t('userList.zhdlip')" width="200" />
        <el-table-column :label="$t('userList.zhdlsj')" width="240">
          <template slot-scope="{row}">
            <span v-if="row.last_login_time">
              {{ row.last_login_time | filterLoginTime }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="user_email" :label="$t('userList.yx')" width="120" />
        <el-table-column :label="$t('common.cz')">
          <template slot-scope="scope">
            <el-button type="text" class="btn link-btn" @click="handleEdit(scope.row)">{{ $t('common.edit') }}</el-button>
            <el-button type="text" class="btn link-btn" @click="handleDelete(scope.row)">{{ $t('common.del')
            }}</el-button>
            <el-button type="text" class="btn link-btn" @click="handleBlack(scope.row)">{{ $t('userList.lh')
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
        <el-form ref="editForm" :model="editForm" :inline="true" :rules="rules" label-width="170px">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="user_login" :label="$t('userList.yhm') + '：'">
                <el-input v-model="editForm.user_login" class="" type="text" :placeholder="$t('common.input')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="dialogType == 'add'" :span="24">
              <el-form-item prop="user_pass" :label="$t('userList.mm') + '：'">
                <el-input v-model="editForm.user_pass" class="" type="password" :placeholder="$t('common.input')" />
              </el-form-item>
            </el-col>
            <el-col v-else :span="24">
              <el-form-item prop="edit_pass" :label="$t('userList.mm') + '：'">
                <el-input v-model="editForm.edit_pass" class="" type="password" placeholder="......" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="user_email" :label="$t('userList.yx') + '：'">
                <el-input v-model="editForm.user_email" class="" type="text" :placeholder="$t('common.input')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="company" :label="$t('userList.gsmc') + '：'">
                <el-input v-model="editForm.company" class="" type="text" :placeholder="$t('common.input')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="cat_id" :label="$t('userList.yhsssbz') + '：'">
                <el-select v-model="editForm.cat_id" multiple :placeholder="$t('common.select')">
                  <el-option v-for="item in roadGroup" :key="item.cat_id" :label="item.name" :value="item.cat_id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="role_id" :label="$t('userList.js') + '：'">
                <el-select v-model="editForm.role_id" multiple :placeholder="$t('common.select')">
                  <el-option v-for="item in roleGroup" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
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
  </div>
</template>

<script>
import md5 from "js-md5"
import dayjs from "dayjs"
import { getUserList, delUser, forbidUser, getGroupOpt, addUser, getUserInfoById, editUserInfo } from '@/api'
import { pwdExgValidate } from "@/config/validate.js"
import _ from "lodash"
export default {
  filters: {
    filterLoginTime (val) {
      return dayjs.unix(val).format("YYYY-MM-DD HH:mm:ss")
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (_.trim(value) === '')
      {
        callback(new Error(this.$t('common.input') + this.$t('userList.mm')));
      } else if (!pwdExgValidate.test(value)
        && value !== '')
      {
        callback(new Error(this.$t('common.pwdlength')));
      } else
      {
        callback();
      }
    }
    var validatePassEdit = (rule, value, callback) => {
      if (_.trim(value) === '')
      {
        callback()
      } else
      {
        if (!pwdExgValidate.test(value))
        {
          callback(new Error(this.$t('common.pwdlength')));
        } else
        {
          callback();
        }
      }
    }
    return {
      pathUrl: this.$route.path,
      dialogTableVisible: false,
      dialogTitle: this.$t('userList.tjyh'),
      dialogType: 'add',
      searchForm: {
        user_login: '',
        user_email: ''
      },
      editForm: {
        id: '',
        user_login: '',
        user_pass: '',
        edit_pass: '',
        company: '', // 公司名称
        user_email: '',
        cat_id: [],
        role_id: []
      },
      roadGroup: [],
      roleGroup: [],
      paginations: {
        total: 0, // 总数
        pageIndex: 1, // 当前位于哪页
        pageSize: 10, // 1页显示多少条
        pageSizes: [10], // 每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
      },
      tableData: [],
      rules: {
        user_login: [
          { required: true, message: this.$t('common.input') + this.$t('userList.yhm'), trigger: 'blur' },
          { min: 2, max: 16, message: this.$t('userList.yhmlength'), trigger: 'blur' }
        ],
        user_pass: [
          // { required: true, message: this.$t('common.input') + this.$t('userList.mm'), trigger: 'blur' },
          // { min: 6, max: 16, message: this.$t('userList.mmlength'), trigger: 'blur' }
          { required: true, validator: validatePass, trigger: 'blur' },
        ],
        edit_pass: [
          // { min: 6, max: 16, message: this.$t('userList.mmlength'), trigger: 'blur' }
          { validator: validatePassEdit, trigger: 'blur' }
        ],
        user_email: [
          { required: true, message: this.$t('common.input') + this.$t('userList.yx'), trigger: 'blur' }
        ],
        cat_id: [
          { required: true, message: this.$t('common.select') + this.$t('userList.yhsssbz'), trigger: 'change' }
        ],
        role_id: [
          { required: true, message: this.$t('common.select') + this.$t('userList.js'), trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.getData()
    this.getRoadGroup()
  },
  methods: {
    async getData () {
      const params = {
        user_login: this.searchForm.user_login,
        user_email: this.searchForm.user_email,
        pagesize: this.paginations.pageSize,
        pageindex: this.paginations.pageIndex
      }
      const res = await getUserList({ pathUrl: this.pathUrl, ...params })
      this.paginations.total = res.total
      this.tableData = res.list
    },
    // 删除用户
    handleDelete (row) {
      this.$confirm(this.$t('other.isdeluser'), this.$t('other.tishi'), {
        confirmButtonText: this.$t('common.qd'),
        cancelButtonText: this.$t('common.qx'),
        type: 'warning'
      }).then(async () => {
        const res = await delUser({ pathUrl: this.pathUrl, id: row.id })
        this.getData()
        console.log(res)
      })
    },
    // 拉黑用户
    handleBlack (row) {
      this.$confirm(this.$t('other.isjinyong'), this.$t('other.tishi'), {
        confirmButtonText: this.$t('common.qd'),
        cancelButtonText: this.$t('common.qx'),
        type: 'warning'
      }).then(async () => {
        const res = await forbidUser({ pathUrl: this.pathUrl, id: row.id })
        this.getData()
        console.log(res)
      })
    },
    async getRoadGroup () {
      const res = await getGroupOpt({ pathUrl: this.pathUrl })
      this.roadGroup = res.cates
      this.roleGroup = res.roles
      console.log(res.roles)
    },
    saveData (editForm) {
      this.$refs[editForm].validate(async (valid) => {
        if (valid)
        {
          const authorCode = localStorage.getItem("authorCode") || ''
          const params = {
            pathUrl: this.pathUrl,
            user_email: this.editForm.user_email,
            user_login: this.editForm.user_login,
            company: this.editForm.company,
            user_pass: "",
            cat_id: this.editForm.cat_id.join(','),
            role_id: this.editForm.role_id.join(',')
          }
          if (this.editForm.edit_pass)
          {
            params.user_pass = '###' + md5(md5(authorCode + this.editForm.edit_pass))
          } else if (this.editForm.user_pass)
          {
            params.user_pass = '###' + md5(md5(authorCode + this.editForm.user_pass))
          }
          if (this.editForm.id)
          {
            params.id = this.editForm.id
            const res = await editUserInfo(params)
            console.log(res)
            this.$message.success(this.$t('common.save'))
          } else
          {
            const res = await addUser(params)
            console.log(res)
            this.$message.success(this.$t('common.addSuccess'))
          }
          this.dialogTableVisible = false
          this.getData()
        }
      })
    },
    clearForm () {
      this.editForm = {
        id: '',
        user_login: '',
        user_pass: '',
        user_email: '',
        company: '',
        cat_id: [],
        role_id: []
      }
    },
    addUser () {
      this.clearForm()
      this.dialogTitle = this.$t('userList.tjyh')
      this.dialogType = 'add'
      this.dialogTableVisible = true
    },
    async handleEdit (row) {
      this.clearForm()
      this.dialogType = 'edit'
      this.dialogTitle = this.$t('userList.bjyhxx')
      const params = {
        id: row.id,
        pathUrl: this.pathUrl
      }
      const res = await getUserInfoById(params)
      console.log(res)
      this.editForm = {
        id: row.id,
        user_login: res.user.user_login,
        user_pass: res.user.user_pass,
        user_email: res.user.user_email,
        company: res.user.company,
        cat_id: res.cate_ids,
        role_id: res.role_ids
      }
      this.dialogTableVisible = true
    },
    searchUser () { },
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
.user-list {
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

