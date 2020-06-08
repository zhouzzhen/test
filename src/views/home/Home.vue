<template>
  <div id='home'>
    <nav-bar class='home-nav'>
      <div slot='center'>购物街</div>
    </nav-bar>
    <home-swiper :banners='banners'></home-swiper>
    <home-recommend :recommends='recommends'></home-recommend>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childCnps/HomeSwiper'
  import HomeRecommend from './childCnps/HomeRecommend'
  import * as Func from 'network/home'
  
  export default{
    name:'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend
    },
    data(){
      return {
        //result:null,
        banners:null,
        recommends:null,
      }
    },
    methods:{},
    created(){
       Func.getHomeMultidata().then(res=>{
        //console.log(res)
        //this.result=res
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
        console.log(this.recommends)
      }) 
    }
  }
</script>
<style scoped>
.home-nav{
  background-color:var(--color-tint);
  color:#fff;
}
</style>