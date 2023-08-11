<template>
  <div class="pic-wrap">
    <div :id="id" class="line-pic" />
  </div>
</template>

<script>
import echarts from 'echarts'
// import echartsTheme from "cps/echarts/theme/westeros.json";
export default {
  name: 'LinePic',
  props: ['lineData'],
  data () {
    return {
      id: 'line-pic',
      myChart: null
    }
  },
  watch: {
    'lineData': function (newVal, oldVal) {
      if (this.myChart)
      {
        this.myChart.setOption(this.initOption(), true)
      }
    }
  },
  mounted () {
    console.log(this.lineData)
    this.createChart()
    window.addEventListener('resize', this.reDraw)
  },
  beforeDestroy () {
    if (!this.myChart)
    {
      return
    }
    this.myChart.dispose()
    this.myChart = null
  },
  methods: {
    reDraw () {
      if (this.myChart)
      {
        this.myChart.resize()
      }
    },
    createChart () {
      this.$nextTick(() => {
        this.myChart = echarts.init(document.getElementById(this.id))
        this.myChart.setOption(this.initOption())
      })
    },
    initOption () {
      const data = {
        color: ['#F7507F', '#0DA3E7'],
        title: {
          top: '0',
          text: this.$t('technologyMantain.wdzxqxt'),
          textStyle: {
            fontSize: 16,
            color: '#F5CA7E'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: false
          // right: '3%',
          // top: '30',
          // icon: 'rect',
          // textStyle: {
          //   color: '#0E9DE0'
          // },
          // data: ['本周次数', '本月次数']
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '60',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          axisLabel: {
            color: '#0E9DE0'
          },
          axisLine: {
            lineStyle: {
              color: '#0E9DE0'
            }
          },
          type: 'category',
          boundaryGap: false,
          data: this.lineData.map(item => item.date)
        },
        yAxis: {
          name: this.$t('technologyMantain.zxs'),
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#0E9DE0'
            }
          },
          axisLabel: {
            color: '#0E9DE0'
          },
          type: 'value'
        },
        series: [
          {
            name: this.$t('technologyMantain.zxs'),
            type: 'line',
            stack: '总量',
            data: this.lineData.map(item => item.online)
          },
          {
            name: this.$t('technologyMantain.zs'),
            type: 'line',
            stack: '总量',
            data: this.lineData.map(item => item.total)
          }
        ]
      }
      return data
    }
  }
}
</script>
<style>
.line-pic {
  width: 100%;
  height: 100%;
}
</style>
<style lang="less" scoped>
.pic-wrap {
  width: 100%;
  height: 100%;

}
</style>

