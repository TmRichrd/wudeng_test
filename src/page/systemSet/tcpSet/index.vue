<template>
  <div class="add-road bread-content">
    <div class="form-wrap">
      <el-form ref="tcpForm" :model="tcpForm" :rules="rules" class="tcpForm" label-width="120px">
        <el-form-item prop="ip" class="login-item" :label="$t('tcpSet.ip') + '：'">
          <el-input v-model="tcpForm.ip" :label="$t('tcpSet.ip') + '：'" class="area" type="text"
            :placeholder="$t('common.input') + $t('tcpSet.ip')" />
        </el-form-item>
        <el-form-item prop="texpPort" class="login-item" :label="$t('tcpSet.text') + '：'">
          <el-input v-model="tcpForm.texpPort" :label="$t('tcpSet.text') + '：'" class="area" type="text"
            :placeholder="$t('common.input') + $t('tcpSet.text')" />
        </el-form-item>
        <el-form-item prop="tcpPort" class="login-item" :label="$t('tcpSet.tcp') + '：'">
          <el-input v-model="tcpForm.tcpPort" :label="$t('tcpSet.tcp') + '：'" class="area" type="text"
            :placeholder="$t('common.input') + $t('tcpSet.tcp')" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn blue2Btn" @click="submitForm('tcpForm')">{{ $t('roadDetail.bc') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getTcpInfo, setTcpInfo } from '@/api'
export default {
  data () {
    return {
      pathUrl: this.$route.path,
      tcpForm: {
        ip: '',
        texpPort: '',
        tcpPort: ''
      },
      rules: {
        ip: [
          { required: true, message: this.$t('common.input') + this.$t('tcpSet.ip'), trigger: 'blur' }
        ],
        texpPort: [
          { required: true, message: this.$t('common.input') + this.$t('tcpSet.text'), trigger: 'blur' }
        ],
        tcpPort: [
          { required: true, message: this.$t('common.input') + this.$t('tcpSet.tcp'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await getTcpInfo({ pathUrl: this.pathUrl })
      console.log(res)
      this.tcpForm.ip = res.ip
      this.tcpForm.texpPort = res.text
      this.tcpForm.tcpPort = res.tcp
    },
    submitForm (tcpForm) {
      this.$refs[tcpForm].validate(async (valid) => {
        if (valid)
        {
          console.log(this.tcpForm)
          const params = {
            ip: this.tcpForm.ip,
            text: this.tcpForm.texpPort,
            tcp: this.tcpForm.tcpPort,
            pathUrl: this.pathUrl
          }
          const res = await setTcpInfo(params)
          this.$message.success(this.$t('common.save'))
          console.log(res)
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
}
</style>

