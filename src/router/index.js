import Vue from 'vue'

// 导入vue-router
import Router from 'vue-router'
// 动态加载路由
const Home=()=>import('views/home/Home')
const Category=()=>import('views/category/Category')
const Cart=()=>import('views/cart/Cart')
const Profile=()=>import('views/profile/Profile')

// 1、安装插件
Vue.use(Router)

// 2、配置路由映射
const routes=[
  {
    path: '',
    redirect:Home
  },
  {
    path: '/home',
    component:Home,
    meta:'首页'
  },
  {
    path: '/category',
    component:Category,
    meta:'分类'
  },{
    path: '/cart',
    component:Cart,
    meta:'购物车'
  },{
    path: '/profile',
    component:Profile,
    meta:'我的'
  }
]

// 3、创建vue-router实例，并导出
export default new Router({
  routes,
  mode:'history',
})
