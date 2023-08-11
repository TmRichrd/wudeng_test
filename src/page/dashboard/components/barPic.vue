<template>
  <div class="pic-wrap">
    <div :id="id" class="bar-pic" />
  </div>
</template>

<script>
import echarts from 'echarts'
// import echartsTheme from "cps/echarts/theme/westeros.json";
export default {
  name: 'BarPic',
  props: ['barData'],
  data () {
    return {
      id: 'bar-pic',
      myChart: null
    }
  },
  watch: {
    'barData': function (newVal, oldVal) {
      if (this.myChart)
      {
        this.myChart.setOption(this.initOption(), true)
      }
    }
  },
  mounted () {
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
      // const dataArr = []
      // for (var x in this.barData) {
      //   const num = this.barData[x]
      //   dataArr.push(num)
      // }
      const dataArr = this.barData
      const data = {
        color: ['#F7507F', '#0DA3E7'],
        title: {
          text: this.$t('home.roadvisibility'),
          textStyle: {
            fontSize: 16,
            color: '#F5CA7E'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: false,
          right: '3%',
          icon: 'rect',
          textStyle: {
            color: '#0E9DE0'
          }
        },
        grid: {
          left: '2%',
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
          data: [
            '100' + this.$t('home.metre'),
            '300' + this.$t('home.metre'),
            '500' + this.$t('home.metre'),
            '1000' + this.$t('home.metre')]
        },
        yAxis: {
          name: this.$t('home.daynum'),
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
            name: this.$t('home.daynum'),
            type: 'bar',
            stack: this.$t('home.total'),
            barWidth: '20',
            barCategoryGap: '10%',
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
            data: [dataArr.first, dataArr.second, dataArr.third, dataArr.fourth]
          }
        ]
      }
      return data
    }
  }
}
</script>
<style>
.bar-pic {
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

