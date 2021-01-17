<template>
  <div id="classchapter">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加课程</el-breadcrumb-item>
      <el-breadcrumb-item>创建课程大纲</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <h2 style="text-align: center;">创建课程大纲</h2>
      <el-steps :active="2" finish-status="success">
        <el-step title="填写课程基本信息"></el-step>
        <el-step title="创建课程大纲"></el-step>
        <el-step title="最终发布"></el-step>
      </el-steps>
      <el-row>
        <el-button type="text" @click="addCha">添加章节</el-button>
      </el-row>
      <el-row>
        <!--<ul>-->
          <!--<div class="elRowUl">-->
            <!--<li v-for="item in chapterList" :key="item.id" style="list-style: none;border: 1px solid black;">-->
              <!--<div class="elRowUlDiv" >-->
                <!--<div>-->
                  <!--{{item.id}}-->
                  <!--{{item.title}}-->
                <!--</div>-->
                <!--<div style="margin-right: 15px;">-->
                  <!--<el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addVideoBtn(item.id)">添加小节</el-button>-->
                  <!--<el-button type="primary" icon="el-icon-edit" size="mini" @click="updateBtn(item.id)">编辑</el-button>-->
                  <!--<el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteBtn(item.id)">删除</el-button>-->
                <!--</div>-->
              <!--</div>-->

              <!--<div >-->
                <!--<ul style="list-style: none;"class="elRowUl2">-->
                  <!--<li v-for="itemVideo in  item.children" :key="itemVideo.id" style="border: 1px solid black;margin-top: 15px">-->
                    <!--{{itemVideo.title}}-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</div>-->
            <!--</li>-->
          <!--</div>-->


        <!--</ul>-->

        <!-- 章节 -->
        <ul class="chanpterList">
          <li
                  v-for="item in chapterList"
                  :key="item.id">
            <p>
              {{ item.title }}

              <span class="acts">
                 <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="addVideoBtn(item.id)">添加小节</el-button>
                 <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateBtn(item.id)">编辑</el-button>
                 <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteBtn(item.id)">删除</el-button>
                </span>
            </p>

            <!-- 视频 -->
            <ul class="chanpterList videoList" >
              <li
                      v-for="itemVideo in  item.children"
                      :key="itemVideo.id">
                <p>{{ itemVideo.title }}

                  <span class="acts">
                     <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateVideoBtn(itemVideo.id)">编辑</el-button>
                     <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteVideoBtn(itemVideo.id)">删除</el-button>
                </span>
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </el-row>
      <el-row>
        <el-button type="primary" style="margin-top: 12px" @click="last">上一步</el-button>
        <el-button type="primary" :disabled="btnDisabled" style="margin-top: 12px;" @click="next">下一步</el-button>
      </el-row>

    </el-card>

    <el-dialog
            title="添加章节"
            :visible.sync="addDialogVisible"
            width="30%"
            >
      <el-form ref="addForm" :model="addForm" label-width="80px">
        <el-form-item label="章节标题">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="addForm.sort" controls-position="right" :min="1" :max="10"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDialogBtn">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
            title="添加小节"
            :visible.sync="videoDialogVisible"
            width="30%"
            >
      <el-form ref="videoForm" :model="videoForm" label-width="80px">
        <el-form-item label="课时标题">
          <el-input v-model="videoForm.title"></el-input>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="videoForm.sort" controls-position="right" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="videoForm.isFree">
            <el-radio label="1" >免费</el-radio>
            <el-radio label="0" >收费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
                  class="upload-demo"
                  action="http://47.114.33.240:8000/third/vod/video/upload"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :file-list="fileList"
                  :on-success="uploadSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过1G</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="videoDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="videoDialogBtn">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {addChapter,selectAllChapter,selectById,updateChapter,deleteChapter} from 'network/course'
  import {addVideo,deleteVideo,updateVideo,selectVideo,deleteUpload} from "network/video";

  export default {
    name: "ClassChapter",
    data(){
      return{
        btnDisabled: false,
        addDialogVisible: false,
        addForm:{
          id: '',//章节id
          courseId: '',//课程id
          title: '',
          sort: ''
        },
        chapterList: [],
        //小节对话框
        videoDialogVisible: false,
        //添加小节对话框数据
        videoForm:{
          id: '',//小节id
          chapterId: '',//章节id
          courseId: '',//课程id
          title: '',
          sort: '',
          isFree: '',
          videoSourceId: '',
          videoOriginalName: ''
        },
        //视频数据
        fileList: []
      }
    },
    created(){
      if(this.$route.params && this.$route.params.id){
        this.addForm.courseId = this.$route.params.id;
        this.selectAllChapter(this.addForm.courseId);
      }
    },
    methods:{
      //添加章节
      addChapter(chapter){
        addChapter(chapter).then(res=>{
           console.log(res);
           if (res.code == 200){
             this.$message.success('添加章节成功!');
             this.selectAllChapter(this.addForm.courseId);
             this.addForm.title = '';
             this.addForm.sort = '';
             this.addDialogVisible = false;
           } else {
             this.$message.error('添加章节失败!');
           }
        }).catch(err=>{
          console.log(err);
        });
      },
      //查询所有章节
      selectAllChapter(id){
        selectAllChapter(id).then(res=>{
          console.log(res);
          this.chapterList=[];
          this.chapterList.push(...res.data);
          console.log(this.chapterList)
        }).catch(err=>{
          console.log(err);
        });
      },
      //查询单个章节
      selectById(id){
        selectById(id).then(res=>{
          console.log(res);
          this.addForm = res.data;
        }).catch(err=>{
          console.log(err);
        });
      },
      //修改章节
      updateChapter(data){
        updateChapter(data).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('修改数据成功!');
            //清空数据
            this.addForm.id = '';
            this.selectAllChapter(this.$route.params.id);

          }else {
            this.$message.error('修改数据失败!');
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //删除章节
      deleteChapter(id){
        deleteChapter(id).then(res=>{
          if(res.code==200){
            this.$message.success('删除成功!');
            this.selectAllChapter(this.addForm.courseId);
          }else {
            this.$message.error('删除失败!');
          }
        }).catch(err=>{
          console.log(err)
        });
      },
      //添加小节
      addVideo(video){
        addVideo(video).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('添加小节成功!');
            this.selectAllChapter(this.$route.params.id);
            this.videoForm.title = '';
            this.videoForm.sort = '';
            this.videoForm.isFree = '';
            this.videoForm.videoSourceId = '';
            this.videoForm.videoOriginalName = '';
            this.videoDialogVisible = false;
          }else {
            this.$message.error('添加小节失败!');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      //删除小节
      deleteVideo(id){
        deleteVideo(id).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('删除成功!');
            this.selectAllChapter(this.$route.params.id);
          }else {
            this.$message.error('删除失败!');
          }
        }).catch(err=>{
          console.log(err);
            }
        );
      },
      //修改小节
      updateVideo(video){
        updateVideo(video).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('修改成功!');
            this.videoForm.id = '';
            this.videoForm.title = '';
            this.videoForm.sort = '';
            this.videoForm.isFree = '';
            this.videoForm.videoSourceId = '';
            this.videoForm.videoOriginalName = '';
            this.selectAllChapter(this.addForm.courseId);
            this.videoDialogVisible = false;
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      //查找小节
      selectVideo(id){
        selectVideo(id).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.videoForm = res.data;
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      addCha(){
        this.addDialogVisible = true;
        this.addForm.title = '';
        this.addForm.sort = 0;
      },
      addDialogBtn(){
        //没有id添加,有id修改
        if(this.addForm.id==''){
          this.addChapter(this.addForm);
          this.addDialogVisible = false;
          console.log(this.addForm.courseId);
        }else {
          this.updateChapter(this.addForm);
          this.addDialogVisible = false;
        }
      },
      //修改章节
      updateBtn(classId){
        this.selectById(classId);
        this.addDialogVisible = true;
      },
      //删除章节
      deleteBtn(chapterId){
        this.$confirm('此操作将永久删除该章节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteChapter(chapterId);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //添加小节   需要课程id和章节id
      addVideoBtn(chapterId){
         this.videoForm.chapterId = chapterId;
         this.videoForm.courseId = this.$route.params.id;
         this.videoDialogVisible = true;
      },
      //确认添加小节
      videoDialogBtn(){
        //没有小节id添加，否则修改
        if(this.videoForm.id==''){
          this.addVideo(this.videoForm);
        }else {
          this.updateVideo(this.videoForm);
        }
      },
      //修改小节
      updateVideoBtn(itemVideoId){
        this.selectVideo(itemVideoId);
        this.videoDialogVisible = true;
      },
      //删除小节
      deleteVideoBtn(itemVideoId){
        this.$confirm('此操作将永久删除该小节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteVideo(itemVideoId);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //上传视频得到返回数据
      uploadSuccess(res){
         console.log(res);
         if(res.code == 200){
           this.videoForm.videoSourceId = res.data.videoId;
           this.videoForm.videoOriginalName = res.data.name;
           this.$message.success('上传成功!');
         }else {
           this.$message.error('上传失败!');
         }
      },
      //移除视频之前
      beforeRemove(){
         deleteUpload(this.videoForm.videoSourceId).then(res=>{
            console.log(res);
            if(res.code == 200){
              this.$message.success('移除视频成功!');
            }else {
              this.$message.error('移除视频失败!');
            }
         }).catch(err=>{
           console.log(err);
         });
      },
      last(){
        if(this.$route.params && this.$route.params.id){
          this.$router.push('/course/classinfo/'+this.$route.params.id);
        }

      },
      next() {
        if (this.$route.params && this.$route.params.id){
          this.$router.push('/course/classpublish/'+this.$route.params.id);
        }
      }
    }
  }
</script>

<style scoped>
  .elRowUl{
    display: flex;
    flex-direction: column;
  }
  .elRowUlDiv{
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
  .ulli{
    position: absolute;
    left: 0;
    right: 0;
  }
  .elRowUl2{

    /*border: 1px solid black;*/
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