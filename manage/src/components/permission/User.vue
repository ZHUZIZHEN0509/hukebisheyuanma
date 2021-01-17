<template>
  <div id="user">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true"  ref="user" :model="user" class="demo-form-inline">
        <el-form-item prop="aclUserName">
          <el-input v-model="user.aclUserName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button  @click="onClear">清空</el-button>
        </el-form-item>
      </el-form>
      <div style="padding-bottom: 10px">
        <el-button type="danger" size="medium" @click="addUser">添加</el-button>
        <el-button type="danger" size="medium" @click="deleteBtn">批量删除</el-button>
      </div>

      <el-table
              :data="userList"
              style="width: 100%"
              border
              tooltip-effect="dark"
              @selection-change="handleSelectionChange"
      >
        <el-table-column
                type="selection"
                width="55">
        </el-table-column>
        <el-table-column
                type="index"
                label="序号"
                width="50">
        </el-table-column>
        <el-table-column
                prop="username"
                label="用户名"
                width="100">
        </el-table-column>
        <el-table-column
                prop="nickName"
                label="用户昵称"
                width="100">
        </el-table-column>
        <el-table-column
                prop="createTime"
                label="创建时间"
                width="250">
        </el-table-column>
        <el-table-column
                prop="updateTime"
                label="更新时间"
                width="250">
        </el-table-column>
        <el-table-column
                label="操作">
          <template v-slot:default="slotData">
            <div class="endColumn">
              <el-tooltip class="item" effect="dark" content="分配权限" placement="top">
                <el-button @click="getBtn(slotData.row.id)" type="info" icon="el-icon-warning" size="mini"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="修改" placement="top">
                <el-button @click="changeBtn(slotData.row.id)" type="primary" icon="el-icon-edit" size="mini"></el-button>
              </el-tooltip>
              <!--<el-tooltip class="item" effect="dark" content="删除" placement="top">-->
                <!--<el-button @click="deleteBtn(slotData.row.id)" type="danger" icon="el-icon-delete" size="mini"></el-button>-->
              <!--</el-tooltip>-->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1, 2, 4, 5]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
      >
      </el-pagination>
    </el-card>

    <el-dialog
            title="修改"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
      <el-form ref="form" :model="updataForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="updataForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="updataForm.nickName"></el-input>
        </el-form-item>
        <!--<el-form-item label="用户密码">-->
          <!--<el-input v-model="updataForm.password"></el-input>-->
        <!--</el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="successBtn">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getUserList,deleteUser,getOneRole ,updataRole } from 'network/user'

  // pageSize: 10
  // totalCount: 3
  // totalPage: 1
  // createTime: "2020-12-01 19:59:04"
  // id: "1333742407340593153"
  // isDeleted: 0
  // nickName: "季风2"
  // password: "f379eaf3c831b04de153469d1bec345e"
  // updateTime: "2020-12-01 20:11:12"
  // username: "jifeng2"
  export default {
    name: "user",
    data(){
      return {
        user: {
          aclUserName: '',//搜索数据
          curPage: '1',
          limit: '5'
        },
        userList: [],
        //选中项
        selectList: [],
        //选中项id集合
        selectIds: [],
        //当前页
        currentPage: 1,
        //每页几条
        pageSize: 5,
        totalCount: 0,
        dialogVisible: false,
        updataForm:{
          id: '',
          username: '',
          nickName: ''
        }
      }
    },
    created() {
      this.getUserList(this.user);
    },
    methods:{
      //查询所有用户
      getUserList(data){
        getUserList(data).then(res=>{
          console.log(res);
          if(res.code == '200'){
            this.userList = res.data.list;
            this.totalCount = res.data.totalCount;
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //删除用户
      deleteUser(data){
        deleteUser(data).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('删除成功!');
            this.user.aclUserName = '';
            this.getUserList(this.user);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //查找单个数据
      getOneRole(id){
        getOneRole(id).then(res=>{
          console.log(res);
          if(res.code == 200){
           this.updataForm = res.data;
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //修改单个数据
      updataRole(data){
        updataRole(data).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success("修改信息成功!");
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //多选改变  存储
      handleSelectionChange(val){
        this.selectIds = [];
        console.log(val);
        for (let i = 0;i<val.length;i++){
          // console.log(val[i].id);
         if (!this.selectIds.includes(val[i].id)) {
           this.selectIds.push(val[i].id);
         }
        }
        for (let v = 0; v <this.selectIds.length ; v++) {
          console.log(this.selectIds[v]);
        }
      },
      //每页几条
      handleSizeChange(pageSize){
        console.log(`每页 ${pageSize} 条`);
        this.pageSize = pageSize;
        this.currentPage = 1;
        this.user.curPage = 1;
        this.user.limit = pageSize;
        this.getUserList(this.user);
      },
      //当前页
      handleCurrentChange(currentPage){
        console.log(`当前页: ${currentPage}`);
        this.currentPage = currentPage;
        this.user.curPage = currentPage;
        this.getUserList(this.user);
      },
      //查询
      onSubmit(){
         this.currentPage = 1;
         this.user.curPage = 1;
         this.getUserList(this.user);
      },
      //清空
      onClear(){
         this.user.aclUserName = '';
         this.currentPage = 1;
         this.user.curPage = 1;
         this.getUserList(this.user);
      },
      //添加用户
      addUser(){
        this.$router.push('/permission/adduser');
      },
      //批量删除用户
      deleteBtn(){
        this.deleteUser(this.selectIds);
      },
      //分配用户权限
      getBtn(id){
        this.$router.push('/permission/addrole/'+id);
      },
      //修改用户
      changeBtn(id){
        this.getOneRole(id);
        this.updataForm.id = id;
        this.dialogVisible = true;
      },
      successBtn(){
        this.updataRole(this.updataForm);
        this.dialogVisible = false;
      },
      //对话框关闭之前
      handleClose(){
        this.dialogVisible = false;
      }
    }
  }
</script>

<style scoped>
  .endColumn{
    display: flex;
    justify-content: center;
  }
</style>