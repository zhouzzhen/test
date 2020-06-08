<template>
  <div class="tab-bar-item" @click='itemClick'>
    <!-- <img src='../../assets/img/tabbar/home.svg' />
    <div>首页</div> -->
    <!--进行属性控制时，最好在插槽外部包一层div进行属性控制，属性写在插槽内可能会被替换-->
    <div v-if='!isActive'>
      <slot name='item-icon'></slot>
    </div>
    <div  v-else>
      <slot name='item-icon-active'></slot>
    </div>
    <div :style='activeStyle'>
      <slot name='item-text' ></slot>
    </div>

  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
       
    };
  },
  methods: {
    itemClick(){
      this.$router.replace(this.path);//浏览器无后退
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path)!== -1
    },
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{};
    }
  }
};
</script>
<style scoped>
  .tab-bar-item{
    flex:1;
    text-align:center;
    height:49px;
    font-size:14px;
  }

  .tab-bar-item img{
    width:24px;
    height:24px;
    vertical-align: middle;
    
  }
</style>