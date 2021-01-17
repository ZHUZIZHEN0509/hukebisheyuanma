<template>
  <div id="publish">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加课程</el-breadcrumb-item>
      <el-breadcrumb-item>最终发布</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <h2 style="text-align: center;">最终发布</h2>
      <el-steps :active="3" finish-status="success">
        <el-step title="填写课程基本信息"></el-step>
        <el-step title="创建课程大纲"></el-step>
        <el-step title="最终发布"></el-step>
      </el-steps>

      <div class="ccInfo">
        <img :src="courseData.cover">
        <div class="main">
          <h2>{{ courseData.title }}</h2>
          <p class="gray"><span>共{{ courseData.lessonNum }}课时</span></p>
          <p><span>所属分类：{{ courseData.subjectLevelOne }} — {{ courseData.subjectLevelTwo }}</span></p>
          <p>课程讲师：{{ courseData.teacherName }}</p>
          <h3 class="red">￥{{ courseData.price }}</h3>
        </div>
      </div>

      <div>
        <el-button type="primary" :disabled="btnDisabled" style="margin-top: 12px;" @click="last">上一步</el-button>
        <el-button type="primary" @click="publishBtn">最终发布</el-button>
      </div>

    </el-card>
  </div>
</template>

<script>
  import {selectPublish}from 'network/publish'
  import {updateStatus} from 'network/publish'

  export default {
    name: "ClassPublish",
    data(){
      return{
        btnDisabled: false,
        routeId: '',
        //课程信息
        courseData: []
      }
    },
    created(){
      if(this.$route.params && this.$route.params.id){
        this.routeId = this.$route.params.id;
        this.selectPublish(this.routeId);
      }
    },
    methods:{
      //查询课程发布信息
      selectPublish(id){
        selectPublish(id).then(res=>{
          console.log(res);
          this.courseData = res.data;
        }).catch(err=>{
          console.log(err);
        });
      },
      //修改课程发布状态
      updateStatus(courseId){
        updateStatus(courseId).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('发布课程成功!');
            this.$router.push('/course/classmanagelist')
          }else {
            this.$message.error('发布课程失败!');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      last() {
        this.$router.push('/course/classchapter/'+this.routeId);
      },
      publishBtn(){
        this.updateStatus(this.routeId);
      }
    }
  }
</script>

<style scoped>
  .ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
  }
  .ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
  }
  .ccInfo .main {
    margin-left: 520px;
  }

  .ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
  }
  .ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
  }

  .ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
  }
  .ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
  }
</style>