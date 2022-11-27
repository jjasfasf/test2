<template>
  <div class="layout">
    <el-container class="container" v-if="state.showMenu">
      <el-aside class="aside">
        <!--系统名称+logo-->
        <div class="head">
          <div>
            <img src="//s.weituibao.com/1582958061265/mlogo.png" alt="logo">
            <span>vue3 admin</span>
          </div>
        </div>
        <!--一条为了美观的线条-->
        <div class="line" />
        <el-menu
          background-color="#222832"
          text-color="#fff" :router="true"
          :default-openeds="state.defaultOpen"
          :default-active="state.currentPath"
        >
          <!--一级栏目-->
          <el-sub-menu index="1">
            <template #title>
              <span>DashBoard</span>
            </template>
            <!--二级栏目-->
            <el-menu-item-group>
              <el-menu-item index="/"><el-icon><Odometer /></el-icon>首页</el-menu-item>
              <el-menu-item index="/add"><el-icon><Plus /></el-icon>添加商品</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>首页配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/swiper"><el-icon><Picture /></el-icon>轮播图配置</el-menu-item>
              <el-menu-item index="/hot"><el-icon><StarFilled /></el-icon>热销商品配置</el-menu-item>
              <el-menu-item index="/new"><el-icon><Sell /></el-icon>新品上线配置</el-menu-item>
             <el-menu-item index="/recommend"><el-icon><ShoppingCart /></el-icon>为你推荐配置</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
                 <span>模块管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/category"><el-icon><Menu/></el-icon>分类管理</el-menu-item>
              <el-menu-item index="/good"><el-icon><Goods /></el-icon>商品管理</el-menu-item>
              <el-menu-item index="/order"><el-icon><List /></el-icon>订单管理</el-menu-item>
              <el-menu-item index="/guest"><el-icon><User /></el-icon>会员管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
              <template #title>
                    <span>系统管理</span>
              </template>
              <el-menu-item-group>
                 <el-menu-item index="/account"><el-icon><Lock /></el-icon>修改密码</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container class="content">
             <Header/>
             <div class="main">
                    <!--将 <router-view></router-view> 移到这里，并且用单标签-->
                      <router-view />
             </div>
             <Footer/>
      </el-container>
    </el-container>
    <el-container v-else class="container"> 
       <router-view/>
    </el-container>
  </div>
</template>




<script setup>
import { localGet,pathMap } from '@/utils'
  import { reactive, toRefs } from 'vue'
  import { useRouter } from 'vue-router'
   import Header from '@/components/Header.vue'
   import Footer from '@/components/Footer.vue'
   const noMenu=['/login']
   const state=reactive({
     showMenu:true,
     defaultOpen:['1','2','3','4'],
     currentPath:'/',
   })
   const router=useRouter()
   router.beforeEach((to,from,next)=>{
      if(to.path=='/login'){
        next()
      }else{
        if (!localGet('token')) {
      // 如果没有，则跳至登录页面
      next({ path: '/login' })
    } else {
      // 否则继续执行
      next()
    }
      }
      state.showMenu=!noMenu.includes(to.path)
      state.currentPath=to.path
      document.title=pathMap[to.name]

   })
</script>



<style scoped>

.content {
    display: flex;
    flex-direction: column;
    max-height: 95vh;
    overflow: hidden;
  }
  .main {
    height: calc(100vh - 100px);
    overflow: auto;
    padding: 10px;
  }
.layout {

  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  height: 100vh;
}
.aside {
  width: 200px!important;
  background-color: #222832;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0,0%,100%,.05);
  border-bottom: 1px solid rgba(0,0,0,.2);
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>