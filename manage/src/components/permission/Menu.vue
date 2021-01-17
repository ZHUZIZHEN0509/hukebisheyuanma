<template>
  <div id="menu">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
              :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              border
              default-expand-all
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
                prop="name"
                label="名称"
                sortable
                width="180">
        </el-table-column>
        <el-table-column
                prop="path"
                label="访问路径"
                sortable
                width="180">
        </el-table-column>
        <el-table-column
                prop="component"
                label="组件路径"
                sortable
                width="180">
        </el-table-column>
        <el-table-column
                prop="permissionValue"
                label="权限值"
                sortable
                width="180">
        </el-table-column>
        <el-table-column
                label="操作"
                >
          <template v-slot:default="slotData">
            <el-button type="primary" size="mini" @click="addCli(slotData.row.id)">添加</el-button>
            <el-button type="primary" size="mini" @click="updCli(slotData.row.id)">修改</el-button>
            <el-button type="primary" size="mini" @click="delCli(slotData.row.id)">删除</el-button>
          </template>

        </el-table-column>


      </el-table>
    </el-card>

    <el-dialog
            title="添加菜单"
            :visible.sync="addDialogVisible"
            width="30%"
            :before-close="DialogClose"
            >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="访问路径">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input v-model="form.component"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input v-model="form.permissionValue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeBtn">取 消</el-button>
    <el-button type="primary" @click="addDialogBtn">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
            title="修改菜单"
            :visible.sync="updDialogVisible"
            width="30%"
            :before-close="DialogClose"
    >
      <el-form ref="updForm" :model="updForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="updForm.name"></el-input>
        </el-form-item>
        <el-form-item label="访问路径">
          <el-input v-model="updForm.path"></el-input>
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input v-model="updForm.component"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input v-model="updForm.permissionValue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="updCloseBtn">取 消</el-button>
    <el-button type="primary" @click="updFormDialogBtn">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getAllMenu,addMenu,getByMenu,updateMenu, deleteMenu } from 'network/menu';

  export default {
    name: "Menu",
    data(){
      return{
        tableData: [],
        pid: '',
        addDialogVisible: false,
        form:{
          pid: '',
          name: '',
          path: '',
          component: '',
          permissionValue: ''
        },
        updDialogVisible: false,
        updForm:{
          id: '',
          name: '',
          path: '',
          component: '',
          permissionValue: ''
        }
      }
    },
    created(){
      this.getAllMenu();
    },
    methods:{
      getAllMenu(){
        getAllMenu().then(res=>{
          console.log(res);
          if(res.code == 200){
            this.tableData = res.data;
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //添加菜单
      addMenu(data){
        addMenu(data).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('添加菜单成功!');
            this.form = { };
            this.getAllMenu();
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //查找单个数据
      getByMenu(id){
        getByMenu(id).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.updForm = res.data;
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //修改数据
      updateMenu(data){
        updateMenu(data).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('修改数据成功!');
            this.getAllMenu();
          }else {
            this.$message.error('修改数据失败!');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      //删除数据
      deleteMenu(id){
        deleteMenu(id).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('删除成功!');
            this.getAllMenu();
          }else {
            this.$message.error('删除失败!');
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //添加数据
      addCli(id){
        this.form.pid = id;
        this.addDialogVisible = true;
      },
      //确认添加  或修改
      addDialogBtn(){
          this.addMenu(this.form);
          this.addDialogVisible = false;
      },
      //对话框关闭之前清空对话框
      DialogClose(){
        this.form = { };
        this.addDialogVisible = false;
      },
      //关闭对话框
      closeBtn(){
        this.form = { };
        this.addDialogVisible = false;
      },
      //修改数据
      updCli(id){
        this.updForm.id = id;
        this.getByMenu(id);
        this.updDialogVisible = true;
      },
      //修改数据对话框
      updFormDialogBtn(){
        this.updateMenu(this.updForm);
        this.updDialogVisible = false;
      },
      updCloseBtn(){
        this.updDialogVisible = false;
      },
      delCli(id){
        this.deleteMenu(id);
      }
    }
  }
</script>

<style scoped>

</style>