<template>
  <div id="bread_container" class="bread_container">
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item
        v-for="(name,index) in matchedArr"
        :key="index"
      >
        {{ name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  computed: {
    matchedArr() {
      const temp = []; const temps = []
      this.$route.matched.filter((item, index, self) => {
        if (item.meta.title) {
        	const title = item.meta.title
          temp.push(title)
        }
      })
      temp.filter((item, index, self) => {
        if (!temps.includes(item)) {
          temps.push(item)
        }
      })
      return temps
    }
  },
  watch: {

  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}

</script>

<style lang="less">
  .el-breadcrumb__inner{
    color: #fff !important;
  }
	.bread_container{
    color: #fff;
		width: 100%;
		.bars{
			float: left;
            margin: 4px 10px;
			cursor: pointer;
			.isactive{
				-webkit-transform: rotate(90deg);
				transform: rotate(90deg);
				transition: .38s;
				-webkit-transform-origin: 50% 50%;
				transform-origin: 50% 50%;
			}
		}
		.breadcrumb{
			height: 30px;
			line-height: 30px;
			.breadbutton{
				float:left;
				margin:4px 5px 0 0;

			}
		}
	}
</style>

