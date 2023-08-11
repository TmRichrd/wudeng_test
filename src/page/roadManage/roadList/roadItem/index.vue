<template>
  <div class="road-item">
    <el-tabs v-model="activeName" class="box-nav" type="border-card">
      <el-tab-pane v-if="permission.jzq && permission.jzq == 1" :label="$t('roadDetail.jzq')" name="concentrator">
        <concentrator v-if="activeName == 'concentrator'" />
      </el-tab-pane>
      <el-tab-pane v-if="permission.jzq && permission.qixiangyi == 1" :label="$t('roadDetail.qxy')" name="meteorological">
        <meteorological v-if="activeName == 'meteorological'" />
      </el-tab-pane>
      <el-tab-pane v-if="permission.jzq && permission.wudeng == 1" label="发光标志" name="fog">
        <fog-lamp v-if="activeName == 'fog'" />
      </el-tab-pane>
      <!-- <el-tab-pane v-if="permission.jzq&&permission.guangbo==1" :label="$t('roadDetail.sy1')" name="sound1">
        <sound-broadcast v-if="activeName=='sound1'" item-index="1" />
      </el-tab-pane>
      <el-tab-pane v-if="permission.jzq&&permission.guangbo==1" :label="$t('roadDetail.sy2')" name="sound2">
        <sound-broadcast v-if="activeName=='sound2'" item-index="2" />
      </el-tab-pane>
      <el-tab-pane v-if="permission.jzq&&permission.screen==1" :label="$t('roadDetail.xsp1')" name="screen1">
        <screen v-if="activeName=='screen1'" item-index="1" />
      </el-tab-pane>
      <el-tab-pane v-if="permission.jzq&&permission.screen==1" :label="$t('roadDetail.xsp2')" name="screen2">
        <screen v-if="activeName=='screen2'" item-index="2" />
      </el-tab-pane>
      <el-tab-pane v-if="permission.jzq&&permission.camera==1" :label="$t('roadDetail.sxt1')" name="camera1">
        <camera v-if="activeName=='camera1'" item-index="1" />
      </el-tab-pane>
      <el-tab-pane v-if="permission.jzq&&permission.camera==1" :label="$t('roadDetail.sxt2')" name="camera2">
        <camera v-if="activeName=='camera2'" item-index="2" />
      </el-tab-pane> -->
      <el-tab-pane v-if="permission.jzq" :label="$t('roadDetail.ldrz')" name="loadLog">
        <road-log v-if="activeName == 'loadLog'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getRoadConcentrator } from '@/api'

import Concentrator from './components/concentrator/index.vue'
import Meteorological from './components/meteorological/index.vue'
import FogLamp from './components/fogLamp/index.vue'
import SoundBroadcast from './components/soundBroadcast/index.vue'
import Screen from './components/screen/index.vue'
import Camera from './components/camera//index.vue'
import RoadLog from './components/roadLog/index.vue'
export default {
  components: {
    Concentrator,
    Meteorological,
    FogLamp,
    SoundBroadcast,
    Screen,
    Camera,
    RoadLog
  },
  data () {
    return {
      activeName: 'concentrator',
      pathUrl: this.$route.path,
      itemId: '',
      permission: {
        camera: 0,
        guangbo: 0,
        jzq: 0,
        qixiangyi: 0,
        screen: 0,
        wudeng: 0
      }
    }
  },
  created () {
    // console.log(this.$route)
  },
  mounted () {
    this.itemId = this.$route.meta.id
    this.getData()
  },
  methods: {
    async getData () {
      const params = {
        pathUrl: this.pathUrl,
        id: this.itemId
      }
      const res = await getRoadConcentrator(params)
      console.log(res.devicePermission)
      this.permission = res.devicePermission
    }
  }
}
</script>

<style lang="less" scoped></style>

