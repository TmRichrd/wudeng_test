<template>
  <div class="add-road bread-content">
    <div class="form-wrap">
      <el-form ref="roadForm" :model="roadForm" :rules="rules" class="roadForm" label-width="120px">
        <el-form-item prop="roadName" class="login-item" :label="`${$t('addRoad.roadname')}：`">
          <el-input v-model="roadForm.roadName" class="area" type="text"
            :placeholder="$t('common.input') + $t('addRoad.roadname')" />
        </el-form-item>
        <el-form-item prop="description" class="login-item" :label="`${$t('addRoad.roadname')}：`">
          <el-input v-model="roadForm.description" maxlength="250" show-word-limit class="area" rows="5" type="textarea"
            :placeholder="$t('common.input') + $t('addRoad.roadremark')" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn blue2Btn" @click="submitForm('roadForm')">{{ $t('addRoad.save')
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import { addRoad } from '@/api'
export default {
  data () {
    return {
      pathUrl: this.$route.path,
      roadForm: {
        roadName: '',
        description: ''
      },
      rules: {
        roadName: [
          { required: true, message: this.$t('common.input') + this.$t('addRoad.roadname'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {

  },
  methods: {
    submitForm (roadForm) {
      const _this = this
      this.$refs[roadForm].validate(async (valid) => {
        if (valid)
        {
          const params = {
            luduan: this.roadForm.roadName,
            description: this.roadForm.description,
            pathUrl: this.pathUrl
          }
          await addRoad(params)
          _this.$message.success(_this.$t('addRoad.success'))
          await this.$store.dispatch('resetRouter')
          this.roadForm.roadName = ''
          this.roadForm.description = ''
          // location.reload()
          console.log(this.roadForm)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.add-road {
  width: 100%;
  overflow: hidden;

  .form-wrap {
    background: @adminBlue7;
    padding: 22px;

    .submit_btn {
      width: 140px;
      height: 40px;
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
}
</style>

