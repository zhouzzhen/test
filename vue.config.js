module.exports = {
  configureWebpack:{
    resolve:{
      alias:{// 路径的别名配置
        /* '@':'src', *//* 已经配置过 */
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  }
}