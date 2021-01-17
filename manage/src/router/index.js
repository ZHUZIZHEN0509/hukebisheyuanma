import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'

const Login = () => import('@/components/Login');
const Home = () => import('@/components/Home');
const Welcome = () => import('@/components/Welcome');
const TeacherList = () => import('@/components/teacher/TeacherList');
const ClassList = () => import('@/components/class/ClassList');
const ClassAdd = () => import('@/components/class/ClassAdd');
const ClassManageList = () => import('@/components/classmanage/ClassManageList');
// const ClassManageAdd = () => import('@/components/classmanage/ClassManageAdd');

const ClassInfo = () => import('@/components/classmanage/course/ClassInfo');
const ClassChapter = () => import('@/components/classmanage/course/ClassChapter');
const ClassPublish = () => import('@/components/classmanage/course/ClassPublish');

const User = () => import('@/components/permission/User');
const Role = () => import('@/components/permission/Role');
const Menu = () => import('@/components/permission/Menu');


const AddUser = () => import('@/components/permission/userChildren/AddUser')
const AddRole = () => import('@/components/permission/userChildren/AddRole')

const UpdataRole = () => import('@/components/permission/roleChildren/UpdataRole')

//1.安装插件
Vue.use(VueRouter);

//2.创建router
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    component: Login,
    meta:{
      title: '登录'
    }
  },
  // {
  //   path: '/home',
  //   name: '主页',
  //   component: Home,
  //   redirect: '/welcome',
  //   children:[
  //     {path: '/welcome',name: '欢迎',component: Welcome,meta: {title: '欢迎'}},
  //     {path: '/teacherlist',name: '教师列表',component: TeacherList,meta: {title: '教师列表'}},
  //     {path: '/classlist',name:'课程分类列表',component: ClassList,meta: {title: '课程分类列表'}},
  //     {path: '/classadd',name:'添加课程分类',component: ClassAdd,meta: {title: '添加课程分类'}},
  //     {path: '/classmanagelist',name:'课程列表',component: ClassManageList,meta:{title: '课程列表'}},
  //     {path: '/classinfo',name:'添加课程',component: ClassInfo,meta:{title: '添加课程'}},
  //       //隐藏路由,添加课程步骤
  //     {path: '/classinfo/:id',name:'填写课程基本信息',component: ClassInfo,hidden: true,meta:{title: '填写课程基本信息'}},
  //     {path: '/classchapter/:id',name:'课程大纲',component: ClassChapter,hidden: true,meta:{title: '创建课程大纲'}},
  //     {path: '/classpublish/:id',name:'最终发布',component: ClassPublish,hidden: true,meta:{title: '最终发布'}}
  //
  //   ]
  // }

  {
    path: '/home',
    name: '主页',
    component: Home,
    redirect: '/home/welcome',
    children:[
      {path: 'welcome',name: '欢迎',component: Welcome,meta: {title: '欢迎'}},



    ]
  },

  {
    path: '/teacher',
    name: '主页',
    component: Home,
    redirect: '/teacher/teacherlist',
    meta: {title: '教师管理'},
    children: [
      {path: 'teacherlist',name: '教师列表',component: TeacherList,meta: {title: '教师列表'}}
    ]
  },

  {
    path: '/class',
    name: '课程分类管理',
    component: Home,
    redirect: '/class/classlist',
    children: [
      {path: 'classlist',name:'课程分类列表',component: ClassList,meta: {title: '课程分类列表'}},
      {path: 'classadd',name:'添加课程分类',component: ClassAdd,meta: {title: '添加课程分类'}}
    ]
  },

  {
    path: '/course',
    name: '课程管理',
    component: Home,
    redirect: '/course/classmanagelist',
    meta: {name: '课程管理'},
    children: [
      {path: 'classmanagelist',name:'课程列表',component: ClassManageList,meta:{title: '课程列表'}},
      {path: 'classinfo',name:'添加课程',component: ClassInfo,meta:{title: '添加课程'}},
      //隐藏路由,添加课程步骤
      {path: 'classinfo/:id',name:'填写课程基本信息',component: ClassInfo,hidden: true,meta:{title: '填写课程基本信息'}},
      {path: 'classchapter/:id',name:'课程大纲',component: ClassChapter,hidden: true,meta:{title: '创建课程大纲'}},
      {path: 'classpublish/:id',name:'最终发布',component: ClassPublish,hidden: true,meta:{title: '最终发布'}}
    ]
  },



  {
    path: '/permission',
    name: '权限管理',
    component: Home,
    redirect: '/permission/user',
    children:[
      {path: 'user',name: '用户管理',component: User,meta: {title: '用户管理'}},
      {path: 'adduser',name: '添加用户',component: AddUser,meta: {title: '添加用户'}},
      {path: 'addrole/:id',name: '分配角色',component: AddRole,meta: {title: '分配角色'}},
      {path: 'updatarole/:id',name: '角色权限',component: UpdataRole,meta: {title: '角色权限'}},

      {path: 'role',name: '角色管理',component: Role,meta: {title: '角色管理'}},
      {path: 'menu',name: '菜单管理',component: Menu,meta: {title: '菜单管理'}}

    ]
  }


];

const router = new VueRouter({
  routes
  // mode: 'history'
})

//3.4 guard简便方法：使用全局导航改变标题   在beforeEach中必须调用next（下一次）,不调用会出现问题
//即前置钩子hook    在router之前
router.beforeEach( (to,from,next)=> {
  //从from跳转到to  to是route类型
  document.title = to.meta.title;
  //拿不到第一个方法：首页有子路径 通过matched[0]
  // document.title = to.matched[0].meta.title;
  console.log("我是to："+to);
  console.log('我是前置函数+++++++++');

  // 如果用户访问的登录页，直接放行
  if(to.path === '/login'){
    return next();
  }else {
    // // 从 cookies 中获取到 保存的 token 值
    // 没有token，强制跳转到登录页
    if(!VueCookies.isKey('setLogin')){
      return next('/login');
    }else {
      // 存在token 直接放行
      next()
    }
  }
})

export default router