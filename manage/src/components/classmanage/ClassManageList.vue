<template>
  <div id="classmanagelist">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="elDiv">
        <div>
          <el-form ref="course"  :inline="true" :model="course" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="course.title" placeholder="课程名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="course.status" >
                  <el-option label="已发布" value="Normal" key="Normal"></el-option>
                  <el-option label="未发布" value="Draft" key="Draft"></el-option>
                </el-select>
              </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSelect"  icon="el-icon-search">查询</el-button>
                <el-button type="primary" @click="resetForm"  icon="el-icon-delete">清空</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-table
                  :data="classList"
                  style="width: 100%"
                  border>
            <el-table-column
                    type="index"
                    label="序号"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="课程名称"
                    width="80">
            </el-table-column>
            <el-table-column
                    label="课程状态"
                    width="80">
              <template v-slot:default="slotProps">
                {{ slotProps.row.status === 'Draft' ? '未发布' : '已发布'}}
              </template>

            </el-table-column>
            <el-table-column
                    prop="lessonNum"
                    label="课时数"
                    width="430">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="添加时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="viewCount"
                    label="浏览数量"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="操作">
              <template v-slot:default="slotData">
                <div class="endColumn">
                  <el-tooltip class="item" effect="dark" content="编辑课程基本信息" placement="top">
                  <el-button @click="editorCourseBtn(slotData.row.id)" type="primary" icon="el-icon-edit" size="mini"></el-button>
                </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="编辑课程大纲信息" placement="top">
                    <el-button @click="changeBtn(slotData.row.id)" type="primary" icon="el-icon-edit" size="mini"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除" placement="top">
                    <el-button @click="deleteBtn(slotData.row.id)" type="danger" icon="el-icon-delete" size="mini"></el-button>
                  </el-tooltip>
                </div>
               </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="course.currPage"
                  :page-sizes="[1, 3, 5, 10]"
                  :page-size="course.limit"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getAllCourse,deleteCourse} from 'network/classmanagelist'


  export default {
    name: "ClassManageList",
    data(){
      return{
        course:{
          currPage: 1,
          limit: 5,
          title: '',
          status: ''
        },
        totalCount: 0,
        // currentPage: 1,
        // pageSize: 5,
        // querySelect:{
        //     currPage: 1,
        //     limit: 5,
        //     name: '',
        //     status: ''
        // },
        classList: []

      }
    },
    created(){
      this.getAllCourse(this.course);
    },
    methods:{
      //查询所有
      getAllCourse(courseData){
        getAllCourse(courseData).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.classList = res.data.list;
            this.totalCount = res.data.totalCount;
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      //删除数据
      deleteCourse(id){
        deleteCourse(id).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('删除成功!');
            this.getAllCourse(this.course);
          }else {
            this.$message.error('删除失败!');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        // this.pageSize = val;
        // this.currentPage = 1;
        this.course.currPage = 1;
        this.course.limit = val;
        this.getAllCourse(this.course);
        // this.getAllCourse(this.querySelect);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        // this.currentPage = val;
        this.course.currPage = val;
        this.getAllCourse(this.course);
        // this.getAllCourse(this.querySelect);
      },
      //编辑课程基本信息
      editorCourseBtn(courseId){
        this.$router.push('/course/classinfo/'+courseId);
      },
      //删除课程
      deleteBtn(courseId){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteCourse(courseId);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //编辑课程大纲
      changeBtn(value){
        this.$router.push('/course/classchapter/'+value);
      },
      //搜索
      onSelect(){
        this.classList = [];
        this.course.currPage = 1;
        // this.currentPage = 1;
        this.getAllCourse(this.course);
      },
      //清空
      resetForm(){
         this.course.title = '';
         this.course.status = '';
         this.course.currPage = 1;
         this.getAllCourse(this.course);
      }
    }
  }
</script>

<style scoped>
  .elDiv{
    display: flex;
    flex-direction: column;
  }

  .chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .chanpterList li{
    position: relative;
  }
  .chanpterList p{
    float: left;
    font-size: 20px;
    margin: 10px 0;
    padding: 10px;
    height: 70px;
    line-height: 50px;
    width: 100%;
    border: 1px solid #DDD;
  }
  .chanpterList .acts {
    float: right;
    font-size: 14px;
  }

  .videoList{
    padding-left: 50px;
  }
  .videoList p{
    float: left;
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    width: 100%;
    border: 1px dotted #DDD;
  }
</style>