const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //加了之后打包的文件不再有Map文件
  // productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave:false, 
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
