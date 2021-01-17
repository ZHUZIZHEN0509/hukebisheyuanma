<template>
  <div id="role">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form :inline="true"  ref="user" :model="user" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="user.roleName" placeholder="角色名称"></el-input>
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
                prop="roleName"
                label="角色名称"
                width="700">
        </el-table-column>
        <el-table-column
                label="操作">
          <template v-slot:default="slotData">
            <div class="endColumn">
              <el-tooltip class="item" effect="dark" content="角色权限" placement="top">
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
            title="添加角色"
            :visible.sync="addDialogVisible"
            width="30%"
            :before-close="handleClose"
         >
      <el-form  :model="addForm"  ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addDialogBtn">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getRole,addRole,deleteRole ,updataRole,getByIdROLE} from 'network/role'

  export default {
    name: "Role",
    data(){
      return{
        user: {
          curPage: 1,
          limit: 2,
          roleName: ''
        },
        //当前页
        currentPage: 1,
        //每页几条
        pageSize: 2,
        totalCount: 0,
        userList: [],
        addDialogVisible: false,
        //添加角色
        addForm:{
           id: '',
           roleName: ''
        },
        selectIds: []
      }
    },
    created(){
      this.getRole(this.user);
    },
    methods:{
      //获取所有角色
      getRole(data){
        getRole(data).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.userList = res.data.list;
            this.totalCount = res.data.totalCount;
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      //添加角色
      addRole(data){
        addRole(data).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('添加成功!');
            this.currentPage = 1;
            this.user.curPage = 1;
            this.getRole(this.user);
            this.addDialogVisible =false;
            this.addForm.roleName = '';
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //批量删除角色
      deleteRole(data){
        deleteRole(data).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('删除成功!');
            this.user.roleName = '';
            this.getRole(this.user);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //修改角色权限
      updataRole(data){
        updataRole(data).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('修改数据成功!');
            this.getRole(this.user);
            this.addForm = { }
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //查询单个角色
      getByIdROLE(id){
        getByIdROLE(id).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.addForm.roleName = res.data.roleName;
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //多选
      handleSelectionChange(val){
        this.selectIds = [];
        console.log(val);
        for (let i = 0;i<val.length;i++){
          // console.log(val[i].id);
          if (!this.selectIds.includes(val[i].id)) {
            this.selectIds.push(val[i].id);
          }
        }
      },
      //查询
      onSubmit(){
        this.currentPage = 1;
        this.user.curPage = 1;
        this.getRole(this.user);
      },
      //清空
      onClear(){
        this.user.roleName = '';
        this.currentPage = 1;
        this.user.curPage = 1;
        this.getRole(this.user);
      },
      //每页几条
      handleSizeChange(pageSize){
        console.log(`每页 ${pageSize} 条`);
        this.pageSize = pageSize;
        this.currentPage = 1;
        this.user.curPage = 1;
        this.user.limit = pageSize;
        this.getRole(this.user);
      },
      //当前页
      handleCurrentChange(currentPage){
        console.log(`当前页: ${currentPage}`);
        this.currentPage = currentPage;
        this.user.curPage = currentPage;
        this.getRole(this.user);
      },
      //添加角色
      addUser(){
        this.addDialogVisible = true;
      },
      //确认添加角色  或修改角色
      addDialogBtn(){
        if(this.addForm.id==''){
          this.addRole(this.addForm);
        }else {
          this.updataRole(this.addForm);
          this.addDialogVisible = false;
        }

      },
      //批量删除角色
      deleteBtn(){
        this.deleteRole(this.selectIds);
      },
      //角色权限
      getBtn(id){
        this.$router.push('/permission/updatarole/'+id);
      },
      //修改角色
      changeBtn(id){
        this.addForm.id = id;
        this.getByIdROLE(id);
        this.addDialogVisible = true;
      },
      //对话框关闭之前
      handleClose(){
        this.addForm = { };
        this.addDialogVisible = false;
      }
    }
  }
</script>

<style scoped>

</style>