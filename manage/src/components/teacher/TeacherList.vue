<template>
  <div id="teacherlist">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>讲师管理</el-breadcrumb-item>
      <el-breadcrumb-item>讲师列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>

      <el-row>
        <el-form ref="teacherListForm"  :inline="true" :model="requestData" class="demo-form-inline">
          <el-col :span="3">
            <el-form-item>
              <el-input v-model="requestData.name" placeholder="姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-select v-model="requestData.level" placeholder="讲师头衔">
                <el-option label="高级讲师" value="1"></el-option>
                <el-option label="首席讲师" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-form-item label="添加时间">
            <el-date-picker
                    v-model="requestData.createTime"
                    type="date"
                    placeholder="选择开始时间"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
                    v-model="requestData.endTime"
                    type="date"
                    placeholder="选择结束时间"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>


          <el-form-item>
            <el-tooltip class="item" effect="dark" content="搜索" placement="top">
              <el-button type="primary" @click="onSubmit"  icon="el-icon-search"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="清空" placement="top">
              <el-button type="primary" @click="clearBtn"  icon="el-icon-delete"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="添加" placement="top">
              <el-button @click="addBtn" type="primary" icon="el-icon-circle-plus" ></el-button>
            </el-tooltip>
          </el-form-item>
        </el-form>
      </el-row>


        <el-table
                :data="teacherList"
                style="width: 100%"
                border>
          <el-table-column
                  type="index"
                  label="序号"
                  width="50">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="名称"
                  width="80">
          </el-table-column>
          <el-table-column
                  label="头衔"
                  width="80">
            <template v-slot:default="slotProps">
              {{ slotProps.row.level === 1 ? '高级讲师' : '首席讲师'}}
            </template>

          </el-table-column>
          <el-table-column
                  prop="intro"
                  label="资历"
                  width="430">
          </el-table-column>
          <el-table-column
                  prop="createTime"
                  label="添加时间"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="sort"
                  label="排序"
                  width="50">
          </el-table-column>
          <el-table-column
                  label="操作">
            <template v-slot:default="slotData">
            <div class="endColumn">
              <el-tooltip class="item" effect="dark" content="修改" placement="top">
                <el-button @click="changeBtn(slotData.row)" type="primary" icon="el-icon-edit" size="mini"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button @click="deleteBtn(slotData.row.id)" type="danger" icon="el-icon-delete" size="mini"></el-button>
              </el-tooltip>
            </div>
            </template>
          </el-table-column>
        </el-table>
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="requestData.currPage"
              :page-sizes="[1, 2, 3, 10]"
              :page-size="requestData.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
              >
      </el-pagination>

    </el-card>

    <el-dialog
            :title="dialogTitle"
            :visible.sync="addDialogVisible"
            width="50%"
    >
      <el-form ref="teacherChangeForm" :rules="rules" :model="teacherChange" label-width="80px">
        <el-form-item label="讲师名称" prop="name">
          <el-input v-model="teacherChange.name"></el-input>
        </el-form-item>
        <el-form-item label="讲师排序" prop="sort">
          <el-input-number v-model="teacherChange.sort" controls-position="right"  :min="0" :max="1"></el-input-number>
        </el-form-item>
        <el-form-item label="讲师头衔" prop="level">
          <el-select v-model="teacherChange.level" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="讲师资历" prop="career">
          <el-input v-model="teacherChange.career"></el-input>
        </el-form-item>
        <el-form-item label="讲师简介" prop="intro" >
          <el-input type="textarea" v-model="teacherChange.intro"></el-input>
        </el-form-item>
        <el-form-item label="讲师头像" prop="avatar">
           <!--头像缩略图-->
           <pan-thumb :image="teacherChange.avatar"/>
           <!--文件上传按钮-->
           <el-button type="primary" icon="el-icon-upload" @click="imageShow = true">更换头像</el-button>
           <!--v-show是否显示上传组件
               ：key 类似于id,如果一个页面上传多个图片控件，可以做区分
               ：url 后台上传的url地址
               @close： 关闭上传组件
               @crop-upload-success: 上传成功后的回调-->
           <image-cropper
               v-show="imageShow"
               :width="300"
               :height="300"
               :key="imageKey"
               :url="BASE_URL"
               field="file"
               @close="uploadClose"
               @crop-upload-success="uploadSuccess"

               />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDialogBtn">确 定</el-button>
  </span>
    </el-dialog>

    <!--<el-dialog-->
            <!--title="修改讲师信息"-->
            <!--:visible.sync="changeDialogVisible"-->
            <!--width="50%"-->
           <!--&gt;-->
      <!--<el-form ref="teacherChangeForm" :model="teacherChange" label-width="80px">-->
        <!--<el-form-item label="讲师名称">-->
          <!--<el-input v-model="teacherChange.name"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="讲师排序">-->
          <!--<el-input-number v-model="teacherChange.sort" controls-position="right"  :min="0" :max="1"></el-input-number>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="讲师头衔">-->
          <!--<el-select v-model="teacherChange.level" placeholder="请选择">-->
            <!--<el-option-->
                    <!--v-for="item in options"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="讲师资历">-->
          <!--<el-input v-model="teacherChange.career"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="讲师简介" >-->
          <!--<el-input type="textarea" v-model="teacherChange.intro"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="讲师头像">-->
          <!--&lt;!&ndash;头像缩略图&ndash;&gt;-->
          <!--<pan-thumb :image="teacherChange.avatar"/>-->
          <!--&lt;!&ndash;文件上传按钮&ndash;&gt;-->
          <!--<el-button type="primary" icon="el-icon-upload" @click="imageShow = true">更换头像</el-button>-->
          <!--&lt;!&ndash;v-show是否显示上传组件-->
              <!--：key 类似于id,如果一个页面上传多个图片控件，可以做区分-->
              <!--：url 后台上传的url地址-->
              <!--@close： 关闭上传组件-->
              <!--@crop-upload-success: 上传成功后的回调&ndash;&gt;-->
          <!--<image-cropper-->
                  <!--v-show="imageShow"-->
                  <!--:width="300"-->
                  <!--:height="300"-->
                  <!--:key="imageKey"-->
                  <!--:url="BASE_URL"-->
                  <!--field="file"-->
                  <!--@close="uploadClose"-->
                  <!--@crop-upload-success="uploadSuccess"-->

          <!--/>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="changeDialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="changeDialogBtn">确 定</el-button>-->
  <!--</span>-->
    <!--</el-dialog>-->

  </div>
</template>

<script>
  import { getTeacherList,deleteTeacher,addTeacher,changeTeacher } from "network/teacher";
  //文件上传组件
  import ImageCropper from 'common/ImageCropper'
  import PanThumb from  'common/PanThumb'

  export default {
    name: "TeacherList",
    components: {ImageCropper,PanThumb},
    data(){
      return{
        requestData: {
          currPage: 1,
          limit: 3,
          name: '',
          level: '',
          createTime: '',
          endTime: ''
        },

        // currentPage: 1,
        // pageSize: 2,
        totalCount: 0,
        totalPage: 0,
        teacherList: [],
        // querySelect:{
        //   currPage: 1,
        //   limit: 3,
        //   name: '',
        //   level: '',
        //   createTime: '',
        //   endTime: ''
        // },
        changeDialogVisible: false,
        teacherChange:{
          id: '',
          name: '',
          sort: '',
          level: '',
          career: '',
          intro: '',
          avatar: 'assets/logo.png'
        },
        //表单验证规则
        rules:{
          name: [
            { required: true, message: '请输入讲师名称', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '请输入讲师排序', trigger: 'blur' }
          ],
          level: [
            { required: true, message: '请输入讲师头衔', trigger: 'change' }
          ],
          career: [
            { required: true, message: '请输入讲师简介', trigger: 'blur' }
          ],
          intro: [
            { required: true, message: '请输入讲师简介', trigger: 'blur' }
          ],
          avatar: [
            { required: true, message: '请选择讲师头像', trigger: 'blur' }
          ]
        },
        options:[
          {
            value: 1,
            label: '高级讲师'
          },
          {
            value: 2,
            label: '首席讲师'
          }
        ],
        addDialogVisible: false,
        imageShow: false,
        imageKey: 0,//上传组件图片key
        BASE_URL: 'http://47.114.33.240:8000/third/oss/avatar/upload' ,//获取基础路径,
        dialogTitle: ''//表单标题

      }
    },
    created() {
       // this.getTeacherList(this.currentPage,this.pageSize);
       this.getTeacherList(this.requestData);
    },
    methods:{
      // getTeacherList(currentPage,limit,name,level,createTime,endTime){
      //   getTeacherList(currentPage,limit,name,level,createTime,endTime).then(res=>{
      //     console.log(res);
      //     this.teacherList = res.data.list;
      //     this.totalCount = res.data.totalCount;
      //     console.log(this.teacherList);
      //   }).catch(err=>{
      //     console.log(err)
      //   });
      // },
      getTeacherList(data){
        getTeacherList(data).then(res=>{
          console.log(res);
          if(res.code == 200){
                this.teacherList = res.data.list;
                this.totalCount = res.data.totalCount;
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      deleteTeacher(ids){
        deleteTeacher(ids).then(res=>{
          console.log(res);
             if (res.code == 200){
               this.$message.success('删除成功!');
               this.requestData.currPage = 1;
               this.getTeacherList(this.requestData);
             } else {
               this.$message.error('删除失败!');
             }
        }).catch(err=>{
            console.log(err);
        })
      },
      addTeacher(data){
        addTeacher(data).then(res=>{
          if (res.code == 200){
            this.requestData.currPage = 1;
            this.getTeacherList(this.requestData);
            this.$message.success('添加成功!');

          } else {
            this.$message.error('添加失败!');
          }
        }).catch(err=>{
              console.log(err);
            }
        );
      },
      changeTeacher(data){
        changeTeacher(data).then(res=>{
             if(res.code == 200){
               this.$message.success('修改成功!');
               this.requestData.currPage = 1;
               this.getTeacherList(this.requestData);

             }else {
               this.$message.error('修改失败!');
             }
        }).catch(err=>{
             console.log(err);
            }
        );
      },
      handleSizeChange(pageSize){
         this.requestData.currPage = 1;
         this.requestData.limit = pageSize;
         this.getTeacherList(this.requestData);
        // this.getTeacherList(this.currentPage,this.pageSize,this.querySelect.name,this.querySelect.level,this.querySelect.createTime,this.querySelect.endTime);
      },
      handleCurrentChange(currentPage){
         this.requestData.currPage = currentPage;
         this.getTeacherList(this.requestData);
        // this.getTeacherList(this.currentPage,this.pageSize,this.querySelect.name,this.querySelect.level,this.querySelect.createTime,this.querySelect.endTime);
      },
      onSubmit(){
         this.requestData.currPage=1;
         this.getTeacherList(this.requestData);
      },
      clearBtn(){
        this.requestData = {
          currPage: 1,
          limit: 3,
          name: '',
          level: '',
          createTime: '',
          endTime: ''
        };
        this.requestData.currPage = 1;
        this.getTeacherList(this.requestData);
      },
      deleteBtn(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteTeacher(id);
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      addBtn(){
        this.teacherChange = {
          id: '',
          name: '',
          sort: '',
          level: '',
          career: '',
          intro: '',
          avatar: 'assets/logo.png'
        };
        this.dialogTitle = '添加讲师信息';
        this.addDialogVisible = true;
      },
      addDialogBtn(){
        this.$refs.teacherChangeForm.validate((valid) => {
          if (valid) {
            if(this.teacherChange.id==''){
              this.addTeacher(this.teacherChange);
              this.addDialogVisible = false;
            }else {
              this.changeTeacher(this.teacherChange);
              this.addDialogVisible = false;
            }
          } else {
            this.$message.error('请检查输入项!');
            return false;
          }
        });


      },
      changeBtn(list){
        console.log(list.id);
        this.teacherChange.id = list.id;
        this.teacherChange.name = list.name;
        this.teacherChange.sort = list.sort;
        this.teacherChange.level = list.level;
        this.teacherChange.career = list.career;
        this.teacherChange.intro = list.intro;
        console.log(this.teacherChange)
        this.dialogTitle = '修改讲师信息';
        this.addDialogVisible = true;
      },
      // changeDialogBtn(){
      //   this.changeTeacher(this.teacherChange);
      //   this.changeDialogVisible = false;
      //
      //   // this.currentPage = 1;
      //   // this.getTeacherList(this.currentPage,this.pageSize);
      // },
      uploadClose(){//关闭上传弹框方法
         this.imageShow = false;
         //加一让id不一样
         this.imageKey = this.imageKey + 1;
      },
      //上传成功后方法,data上传成功返回的地址
      uploadSuccess(data){
       console.log('上传成功')
        console.log(data);
        this.teacherChange.avatar = data;
        this.imageKey = this.imageKey + 1;


      }
    }
  }
</script>

<style scoped>
  .elTable{
    display: flex;
    text-align: center;
  }
  .endColumn{
    display: flex;
    justify-content: center;
  }


</style>