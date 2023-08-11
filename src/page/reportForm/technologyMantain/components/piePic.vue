<template>
  <div class="pic-wrap">
    <div :id="id" class="pie-pic" />
  </div>
</template>

<script>
import echarts from 'echarts'
// import echartsTheme from "cps/echarts/theme/westeros.json";
export default {
  name: 'LinePic',
  props: ['id', 'pieData', 'title', 'showPercent'],
  data () {
    return {
      myChart: null
    }
  },
  watch: {
    'pieData': function (newVal, oldVal) {
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
      console.log(this.pieData)
      const data = {
        color: ['#F7507F', '#0DA3E7', '#D73247', '#E6A438'],
        title: {
          top: '0',
          text: this.title,
          textStyle: {
            fontSize: 14,
            color: '#F5CA7E'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        grid: {
          left: '20',
          right: '20',
          top: '20',
          bottom: '20',
          containLabel: true
        },
        series: [
          {
            type: 'pie',
            name: this.title,
            label: {
              formatter: this.showPercent ? '{b}率\n{d}%' : '{b} {c}'
            },
            radius: [0, '50%'],
            data: this.pieData
          }
        ]
      }
      return data
    }
  }
}
</script>
<style>
.pie-pic {
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

