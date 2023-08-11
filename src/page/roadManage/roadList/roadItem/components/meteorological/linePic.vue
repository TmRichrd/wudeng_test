<template>
  <div class="pic-wrap">
    <div :id="id" class="line-pic" />
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'LinePic',
  props: ['lineData'],
  data() {
    return {
      id: 'line-pic',
      myChart: null
    }
  },
  watch: {
    'lineData': function (newVal, oldVal) {
      if (this.myChart) {
        this.myChart.setOption(this.initOption(), true)
      }
      if (newVal.length == 0) {
        this.myChart.showLoading({
          text: this.$t('roadDetail.empty'),
          color: '#0A2354',
          textColor: '#fff',
          maskColor: 'transparent',
          zlevel: 0,
        })
      }
    }
  },
  mounted() {
    this.createChart()
  },
  beforeDestroy() {
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
  },
  methods: {
    loading() {
      if (this.myChart) {
        this.myChart.showLoading({
          text: '努力加载中',
          color: '#c23531',
          textColor: '#fff',
          maskColor: 'rgba(255,255,255,.1)',
          zlevel: 0,
        })
      }
    },
    unloading() {
      if (this.myChart) {
        this.myChart.hideLoading()
      }
    },
    createChart() {
      this.$nextTick(() => {
        this.myChart = echarts.init(document.getElementById(this.id))
        this.myChart.showLoading({
          text: '努力加载中',
          color: '#c23531',
          textColor: '#fff',
          maskColor: 'rgba(255,255,255,.1)',
          zlevel: 0,
        })
        this.myChart.setOption(this.initOption())
      })
    },
    initOption() {
      const data = {
        color: ['#F7507F', '#0DA3E7'],
        // title: {
        //   top: '0',
        //   text: '最近一个小时能见度',
        //   textStyle: {
        //     fontSize: 16,
        //     color: '#F5CA7E'
        //   }
        // },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a}{c}米'
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
          left: '4%',
          right: '5%',
          top: '60',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          nameRotate: 30,
          axisLabel: {
            color: '#0E9DE0',
            rotate: 40,
            margin: 16
          },
          axisLine: {
            lineStyle: {
              color: '#0E9DE0'
            }
          },
          type: 'category',
          boundaryGap: false,
          data: this.lineData.map(item => item.date.replace(' ', '\n'))
        },
        yAxis: {
          // name: '能见度，300米以下',
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
        dataZoom: [
          {
            type: 'slider',
            start: 0,
            end: 30,
            textStyle: {
              color: '#fff'
            }
          }
        ],
        noDataLoadingOption: {
          effect: "bubble",
          text: this.$t('roadDetail.empty'),
          effectOption: {
            effect: {
              n: 0
            }
          },
          textStyle: {
            fontSize: 32,
            fontWeight: 'bold'
          }
        },
        series: [
          {
            name: '能见度',
            type: 'line',
            stack: '总量',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#F7507F' // 0% 处的颜色
                }, {
                  offset: 1, color: '#3B2442' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            data: this.lineData.map(item => item.njd)
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

