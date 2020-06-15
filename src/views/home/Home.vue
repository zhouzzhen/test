<template>
  <div id='home'>
    <nav-bar class='home-nav'>
      <div slot='center'>购物街</div>
    </nav-bar>
    <tab-control :titles="tabControl"
                 @tabClick="itemClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class='scroll-content' ref='scroll' 
        :proby-type='3' 
        :pull-up-load='true'
        @scroll='scrollPosition' 
        @pullingUp='loadMore'
        > 
      <home-swiper :banners='banners'  @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend :recommends='recommends'></home-recommend>
      <home-feature></home-feature>
      <tab-control ref='tabControl2' :titles="tabControl" @itemClick='itemClick'></tab-control>
      <goods-list :goods='goods[currentType].list'>
      </goods-list>
    </scroll>  
    <back-top @click.native='backTopClick' v-show='isBackTopShow'></back-top><!--普通元素可以监听事件，组件能直接监听事件么？必须在click后添加.native-->
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backtop/BackTop'

  import HomeSwiper from './childCnps/HomeSwiper'
  import HomeRecommend from './childCnps/HomeRecommend'
  import HomeFeature from './childCnps/HomeFeature'

  import * as Func from 'network/home'
  import {debounce} from 'common/utils'
  
  export default{
    name:'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data(){
      return {
        //result:null,
        banners:null,
        recommends:null,
        tabControl:{'pop':'流行','new':'新款','sell':'精选'},
        currentType:'pop',
        isBackTopShow:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        goods:{
          'pop':{page:0,list:[
            {
              price:20,cfav:30,title:'黑魔',
              show:{
                img:'https://s18.mogucdn.com/mlcdn/c45406/180421_2142chbfj8hgad5l5564hi0blkh28_640x960.jpg_300x400.v1cAC.40.webp'
              }
            },
            {
              price:20,cfav:30,title:'黑魔',
              show:{
                img:'https://s18.mogucdn.com/mlcdn/c45406/180421_2142chbfj8hgad5l5564hi0blkh28_640x960.jpg_300x400.v1cAC.40.webp'
              }
            },
            {
              price:20,cfav:30,title:'黑魔',
              show:{
                img:'https://s18.mogucdn.com/mlcdn/c45406/180421_2142chbfj8hgad5l5564hi0blkh28_640x960.jpg_300x400.v1cAC.40.webp'
              }
            },
            {
              price:20,cfav:30,title:'黑魔',
              show:{
                img:'https://s18.mogucdn.com/mlcdn/c45406/180421_2142chbfj8hgad5l5564hi0blkh28_640x960.jpg_300x400.v1cAC.40.webp'
              }
            }
          ]},
          'new':{page:0,list:[
            {
              price:20,cfav:30,title:'黑魔',
              show:{
                img:'https://s18.mogucdn.com/mlcdn/c45406/180421_2142chbfj8hgad5l5564hi0blkh28_640x960.jpg_300x400.v1cAC.40.webp'
              }
            },
            {
              price:20,cfav:30,title:'黑魔',
              show:{
                img:'https://s18.mogucdn.com/mlcdn/c45406/180421_2142chbfj8hgad5l5564hi0blkh28_640x960.jpg_300x400.v1cAC.40.webp'
              }
            },
            {
              price:20,cfav:30,title:'黑魔',
              show:{
                img:'https://s18.mogucdn.com/mlcdn/c45406/180421_2142chbfj8hgad5l5564hi0blkh28_640x960.jpg_300x400.v1cAC.40.webp'
              }
            }
          ]},
          'sell':{page:0,list:[
            {
              price:20,cfav:30,title:'黑魔',
              show:{
                img:'https://s18.mogucdn.com/mlcdn/c45406/180421_2142chbfj8hgad5l5564hi0blkh28_640x960.jpg_300x400.v1cAC.40.webp'
              }
            },
            {
              price:20,cfav:30,title:'黑魔',
              show:{
                img:'https://s18.mogucdn.com/mlcdn/c45406/180421_2142chbfj8hgad5l5564hi0blkh28_640x960.jpg_300x400.v1cAC.40.webp'
              }
            },
            {
              price:20,cfav:30,title:'黑魔',
              show:{
                img:'https://s18.mogucdn.com/mlcdn/c45406/180421_2142chbfj8hgad5l5564hi0blkh28_640x960.jpg_300x400.v1cAC.40.webp'
              }
            },
            {
              price:20,cfav:30,title:'黑魔',
              show:{
                img:'https://s18.mogucdn.com/mlcdn/c45406/180421_2142chbfj8hgad5l5564hi0blkh28_640x960.jpg_300x400.v1cAC.40.webp'
              }
            },
             {
              price:20,cfav:30,title:'黑魔',
              show:{
                img:'https://s18.mogucdn.com/mlcdn/c45406/180421_2142chbfj8hgad5l5564hi0blkh28_640x960.jpg_300x400.v1cAC.40.webp'
              }
            }
          ]}
        }
      }
    },
    methods:{
      //goodlist导航切换
      itemClick(index){
        this.currentType=index;
      },
      scrollPosition(position){
        //console.log(position)
        // 1.判断BackTop是否显示
        this.isBackTopShow=(-position.y)>400;
         // 2.决定tabControl是否吸顶(position: fixed)
        // console.log(this)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      swiperImageLoad(){
        this.tabOffsetTop= this.$refs.tabControl2.$el.offsetTop;
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
      },
      backTopClick(){

        this.$refs.scroll.scrollTo(0,0,1000)
      },
      getHomeMultidata(){
         Func.getHomeMultidata().then(res=>{
          //console.log(res)
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
          //console.log(this.recommends)
        })
      },
      getHomeGoods(type){
        const page=this.goods[type].page+1 
        Func.getHomeGoods(type,page).then(res=>{
          console.log(res);//拿到了pop的第一页30条数据
         // this.goods[type].list.push(...res.data.list);//怎样把一个数组放在一个数组中呢？
         //this.goods[type].page +=1;
          //for(let item of res.data.list)){
          //  this.goods[type].list.push(item)
          //}
          this.$refs.scroll.finishPullUp();
        })
      } 
    },
    created(){
      this.getHomeMultidata(),
      this.getHomeGoods(this.currentType)
      
    },
    mounted(){
      //1.图片加载
      const refresh=debounce(this.$refs.scroll.refresh,1000);
      this.$bus.$on('imageLoad',()=>{
        /* this.$refs.scroll.refresh(); */       
        refresh()
      })
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
  }
</script>
<style scoped>
#home{
  padding-top:44px;
  height:100vh;
}
.home-nav{
  background-color:var(--color-tint);
  color:#fff;

  position:fixed;
  left:0;
  right:0;
  top:0;
  z-index: 9;
}
/* 
//使用better-scroll会让此属性失效，而且此属性浏览器兼容也差
.tab-control{
  position:sticky;// 移动端一般支持此属性，未滚动到指定位置时，值为static,当滚动到指定的位置后position的值为fixed
  top:44px;
  background-color:white;
  z-index:5;
} */
 .tab-control {
    position: relative;
    z-index: 9;
    background-color:white;
  }
.scroll-content{
 /*  height:calc(100%-98px);  */
  overflow:hidden;
  position:absolute;
  top:44px;
  left:0;
  right:0;
  bottom:49px;
}
</style>