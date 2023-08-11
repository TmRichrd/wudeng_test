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
  props: ['id', 'pieData', 'title'],
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
      const data = {
        color: ['#67C23A', '#F7507F', '#D73247', '#E6A438'],
        title: {
          top: '0',
          text: this.title,
          textStyle: {
            fontSize: 14,
            color: '#F5CA7E'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        // legend: {
        //   show: false,
        //   right: '3%',
        //   top: '20%',
        //   icon: 'rect',
        //   textStyle: {
        //     color: '#0E9DE0'
        //   }
        // },
        grid: {
          containLabel: true
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            stack: this.$t('home.total'),
            radius: [0, '50%'],
            center: ['50%', '60%'],
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
            data: [{ value: this.pieData.luduantotal - this.pieData.luduan, name: this.$t('home.normalroad') },
            { value: this.pieData.luduan, name: `${this.$t('other.njdd')}\n${this.$t('other.lds')}` }
            ]
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

