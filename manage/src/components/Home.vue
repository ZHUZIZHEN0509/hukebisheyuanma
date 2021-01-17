<template>
  <div id="home">
    <el-container class="home-container">
      <!--导航栏-->
      <el-header>
        <div>
          <img src="../assets/zsky_logo.jpg" style="width: 50px;height: 50px;">
          <span>湖科教育后台管理系统</span>
        </div>
        <div>
          <el-button type="info" @click="exitBtn">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <!--侧边栏-->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <!--折叠和展开效果-->
          <div class="toggle-button" @click="toggleBtn">|||</div>
          <!---->
          <el-menu
                  background-color="#333744"
                  text-color="#fff"
                  active-text-color="#409EFF"
                  :unique-opened="true"
                  :collapse="isCollapse"
                  :collapse-transition="false"
                  :router="true"
                  :default-active="$route.path"
                  >
            <!--一级菜单-->
            <el-submenu index="1">
              <!--一级菜单的模板区-->
              <template slot="title">
                <!--图标-->
                <i class="el-icon-s-custom"></i>
                <!--文本-->
                <span>讲师管理</span>
              </template>
              <!--二级菜单-->
              <el-menu-item index="/teacher/teacherlist">
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-s-order"></i>
                  <!--文本-->
                  <span>讲师列表</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <!--一级菜单的模板区-->
              <template slot="title">
                <!--图标-->
                <i class="el-icon-menu"></i>
                <!--文本-->
                <span>课程分类管理</span>
              </template>
              <!--二级菜单-->
              <el-menu-item index="/class/classlist">
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-s-management"></i>
                  <!--文本-->
                  <span>课程分类列表</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/class/classadd">
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-menu"></i>
                  <!--文本-->
                  <span>添加课程分类</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <!--一级菜单的模板区-->
              <template slot="title">
                <!--图标-->
                <i class="el-icon-s-help"></i>
                <!--文本-->
                <span>课程管理</span>
              </template>
              <!--二级菜单-->
              <el-menu-item index="/course/classmanagelist">
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-date"></i>
                  <!--文本-->
                  <span>课程列表</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/course/classinfo">
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-circle-plus"></i>
                  <!--文本-->
                  <span>添加课程</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <!--一级菜单的模板区-->
              <template slot="title">
                <!--图标-->
                <i class="el-icon-lock"></i>
                <!--文本-->
                <span>权限管理</span>
              </template>
              <!--二级菜单-->
              <el-menu-item index="/permission/user">
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-user-solid"></i>
                  <!--文本-->
                  <span>用户管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/permission/role">
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-user"></i>
                  <!--文本-->
                  <span>角色管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/permission/menu">
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-notebook-2"></i>
                  <!--文本-->
                  <span>菜单管理</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data(){
      return{
        //是否折叠
        isCollapse: false
      }
    },
    methods:{
      exitBtn(){
        this.$router.push('/login');
        this.$cookies.remove('setLogin');
      },
      toggleBtn(){
        this.isCollapse = !this.isCollapse;
      }
    }
  }
</script>

<style scoped>
  #home{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .home-container{
    height: 100%;
  }
  .el-header{
    background-color: #373D41;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #ffff;
    font-size: 20px;
  }
  .el-header > div{
    display: flex;
    align-items: center;
  }
  .el-header > div span{
    margin-left: 20px;
  }
  .el-header > div img{
    border-radius: 50%;
    /*border: 1px solid #ffff;*/
    box-shadow: 0 0 10px #ddd;
  }
  .el-aside{
    background-color: #333744;
  }
  .el-main{
    background-color: #EAEDF1;
  }
  .el-menu{
    border-right: none;
  }
   .toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    /*线的间隙*/
    letter-spacing: 0.2em;
    /*鼠标上去出现手*/
    cursor: pointer;
  }

</style>