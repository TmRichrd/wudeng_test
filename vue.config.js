
const TerserPlugin = require('terser-webpack-plugin') // 用于在生成环境剔除debuger和console
const CompressionPlugin = require('compression-webpack-plugin') // gzip压缩,优化http请求,提高加载速度
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 代码分析工具
const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

const env = process.env.NODE_ENV
const target = process.env.VUE_APP_URL // development和production环境是不同的

module.exports = {
  publicPath: '/',
  outputDir: './dist',
  assetsDir: 'static',
  filenameHashing: true, // false 来关闭文件名哈希
  lintOnSave: false, // 关闭eslint
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 3008,
    proxy: {
      '/index.php': {
        target: target,
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  // webpack相关配置
  chainWebpack: (config) => {
    config.entry.app = ['./src/main.js']
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@img', resolve('src/assets/images'))
      .set('cps', resolve('src/components'))
    // 关闭npm run build之后，This can impact web performance 警告
    config.performance
      .set('hints', false)
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
    // 压缩代码
    config.optimization.minimize(true)
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })
    // 对图片进行压缩处理
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        disable: true, // webpack@2.x and newer
        quality: '65-80',
        speed: 4
      })
      .end()
    // 项目文件大小分析
    // config.plugin('webpack-bundle-analyzer')
    //   .use(new BundleAnalyzerPlugin({
    //     openAnalyzer: false, // 是否打开默认浏览器
    //     analyzerPort: 3002
    //   }))
  },
  configureWebpack: config => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === 'production')
    {
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          }
        }
      })
      // 开启gzip压缩
      config.plugins.push(new CompressionPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'), // 匹配文件扩展名
        // threshold: 10240, // 对超过10k的数据进行压缩
        threshold: 5120, // 对超过5k的数据进行压缩
        minRatio: 0.8,
        cache: true, // 是否需要缓存
        deleteOriginalAssets: false // true删除源文件(不建议);false不删除源文件
      }))
    } else
    {
      // 为开发环境修改配置...

    }
  },
  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/style/variables.less')
      ]
    }
  }
}

