<template>
  <div id="classinfo">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加课程</el-breadcrumb-item>
      <el-breadcrumb-item>填写课程基本信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <h2 style="text-align: center;">填写课程基本信息</h2>
        <el-steps :active="1" finish-status="success">
          <el-step title="填写课程基本信息"></el-step>
          <el-step title="创建课程大纲"></el-step>
          <el-step title="最终发布"></el-step>
        </el-steps>

        <el-form ref="course"  status-icon :model="course" :rules="rulesForm" label-width="80px">
          <el-form-item label="课程标题" prop="title">
             <el-input v-model="course.title" placeholder="示例：机器学习项目课：从基础到搭建"></el-input>
          </el-form-item>
          <el-form-item label="课程分类">
            <el-col :span="6">
              <el-form-item prop="subjectParentId">
                <el-select @change="teacherClick" v-model="course.subjectParentId" placeholder="请选择课程">
                  <el-option v-for="item in courseList" :key="item.id" :label="item.title" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="subjectId">
                <el-select  v-model="course.subjectId" placeholder="请选择科目">
                  <el-option  v-for="item in courseList2" :key="item.id" :label="item.title" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-form-item>
          <el-form-item label="课程讲师" prop="teacherId">
            <el-select v-model="course.teacherId" placeholder="请选择">
              <el-option  v-for="item in teacherList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总课时" prop="lessonNum">
            <el-input-number v-model="course.lessonNum" controls-position="right" @change="timeChange" :min="0" ></el-input-number>
          </el-form-item>
          <el-form-item label="课程简介" prop="description">
            <el-input  type="textarea" autosize v-model="course.description" ></el-input>

          </el-form-item>
          <el-form-item label="课程封面" class="elClass" prop="cover">
            <el-upload
                    class="avatar-upload"
                    action="http://47.114.33.240:8000/third/oss/avatar/upload"
                    :limit="1"
                    :on-success="getSuccess"
                    :show-file-list="false"
                    list-type="picture-card"
                  >
              <img width="100%" :src="course.cover">
            </el-upload>
          </el-form-item>
          <el-form-item label="课程价格" prop="price">
            <el-input-number v-model="course.price" controls-position="right" @change="priceChange" :min="0" ></el-input-number>元
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="btnDisabled" style="margin-top: 12px;" @click="next()">保存并下一步</el-button>
          </el-form-item>
        </el-form>

    </el-card>
  </div>
</template>


<script>
  import { addCourse,getCourseById,updataCourse } from "network/course";
  import { classList } from "network/class";
  import { getTeacherList } from "network/teacher";



  export default {
    name: "ClassInfo",
    data(){
      return{
        btnDisabled: false,
        course:{
          title: '',
          subjectParentId: '',
          subjectId: '',
          teacherId: '',
          lessonNum: '',
          description: '',
          cover: '',
          price: ''
        },
        teacherList: [],
        courseList: [],
        courseList2: [],
        uploadDialogVisible: false,
        //表单验证
        rulesForm:{
          title:[
            {required: true,message:'请输入课程标题',trigger: 'blur'}
          ],
          subjectParentId: [
            {required: true,message:'请选择课程',trigger: 'change'}
          ],
          subjectId: [
            {required: true,message:'请选择科目',trigger: 'change'}
          ],
          teacherId: [
            {required: true,message:'请选择讲师',trigger: 'change'}
          ],
          lessonNum:[
            {required: true,message:'请选择总课时',trigger: 'blur'}
          ],
          description: [
            {required: true,message:'请选择课程简介',trigger: 'blur'}
          ],
          cover: [
            {required: true,message:'请选择课程封面',trigger: 'blur'}
          ],
          price: [
            {required: true,message:'请选择课程价格',trigger: 'blur'}
          ]
        },
        //查询和修改数据id
        updateId: ''
      }
    },
    created(){
       this.classList();
       this.getTeacherList();

       if(this.$route.params && this.$route.params.id){
         this.updateId = this.$route.params.id;
         this.getCourseById(this.updateId);
       }
    },
    methods:{
      //查询所有讲师
      getTeacherList(){
        getTeacherList().then(res=>{
          console.log(res);
          this.teacherList = res.data.list;
        }).catch(err=>{
          console.log(err);
        })
      },
      //获取所有课程分类
      classList(){
        classList().then(res=>{
          console.log(res);
          this.courseList = res.data;
        }).catch(err=>{
          console.log(err);
        });
      },
      teacherClick(value){//根据一级分类id，获取二级分类
          console.log(value);
        for (let i = 0; i < this.courseList.length; i++) {
          if(this.courseList[i].id===value){
            this.courseList2 =  this.courseList[i].children;
            this.course.subjectId = '';

          }
        }
      },
      //总课时发生改变
      timeChange(value) {
        console.log(value);
      },
      //价格发生变化
      priceChange(value){
        console.log(value);
      },
      //获取服务器返回数据
      getSuccess(response){
        console.log(response);
        if(response.code == 200){
          this.$message.success('上传成功!');
          this.course.cover = response.data;
        }else {
          this.$message.error('上传失败!');
        }
      },
      next() {
        //如果有id修改
        if(this.updateId){
          this.updataCourse(this.course);
        }else {
          this.addData();
        }

      },
      //添加数据
      addData(){
        this.$refs.course.validate(async (valid) => {
          if (valid) {
            await addCourse(this.course).then(res=>{
              console.log(res);
              if (res.code == 200){
                this.$message.success('添加课程成功!');
                this.course.id =res.data;
                this.$router.push('/course/classchapter/'+this.course.id);
              } else {
                this.$message.error('添加课程失败!');
              }
            }).catch(err=>{
              console.log(err);
            });
          } else {
            this.$message.error('请检查您输入的数据项');
            return false;
          }
        });
      },
      //根据id查询数据回显
      getCourseById(id){
        getCourseById(id).then(res=>{
          console.log(res);
          this.course = res.data;
          this.classList();
          this.getCourseOne();
        }).catch(err=>{
          console.log(err);
        });
      },
      //查询一级分类解决二级分类bug,一级分类id与二级分类id相等则查找二级
      getCourseOne(){
        for(let i = 0;i<this.courseList.length;i++){
          if(this.courseList[i].id === this.course.subjectParentId){
            this.courseList2 = this.courseList[i].children;
          }
        }
      },
      //修改数据
      updataCourse(course){
        updataCourse(course).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('修改成功!');
            this.$router.push('/course/classchapter/'+this.updateId);
          }else {
            this.$message.error('修改失败!');
          }
        }).catch();
      }
    }
  }
</script>

<style scoped>

</style>