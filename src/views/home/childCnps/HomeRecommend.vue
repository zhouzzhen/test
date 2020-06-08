<template>
  <div class='recommend'>
    <div class='recommend-item' v-for='(item,index) in recommends' :key='index'>
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
    
  </div>
</template>
<script>
  export default{
    name:'HomeRecommend',
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
   }
  }
</script>
<style scoped>
.recommend{
  display:flex;
  width:100%;
  padding:10px 0 20px;
  text-align:center;
  font-size:12px;
  border-bottom:8px solid #ddd;
  
}
.recommend-item{
   flex:1; /*均等分*/
}
.recommend img{
  width: 65px;
  height:65px;

}
</style>