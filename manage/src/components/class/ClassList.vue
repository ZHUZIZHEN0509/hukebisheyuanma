<template>
  <div id="classlist">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--filter-node-method，值为过滤函数。
        ref id
        data 数据
        props 取到节点和子节点名称-->
    <el-card>
      <el-row>
        <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
        </el-input>
      </el-row>
      <el-row class="elRowTree">
        <el-tree ref="elTree" :data="treeData" :props="treeProps"
                 default-expand-all
                 :filter-node-method="filterNode"
                 node-key="id"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span  style="margin-left: 200px">
             <el-button
                     type="text"
                     size="mini"
                     @click="updateBtn(data)">
            修改
          </el-button>
          <el-button
                  type="text"
                  size="mini"
                  @click="deleteBtn(data,node)">
            删除
          </el-button>
        </span>
      </span>
        </el-tree>
      </el-row>

    </el-card>

    <el-dialog
            title="修改科目"
            :visible.sync="updateDialogVisible"
            width="30%"
            :before-close="handleClose">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="课程名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="updateDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updataDialogBtn">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {classList,updataClassList,selectById,deleteClassList} from "network/class";

  export default {
    name: "ClassList",
    data() {
      return {
        treeData: [],
        treeProps: {
          children: 'children',
          label: 'title'
        },
        filterText: '',
        //对话框
        updateDialogVisible: false,
        form:{
          id: '',
          title: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入讲师名称', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ]
        },
        ids: []
      }
    },
    created() {
      this.classList();
    },
    methods: {
      classList() {
        classList().then(res => {
          console.log(res);
          this.treeData = res.data;
        }).catch(err => {
          console.log(err);
        })
      },
      //查询单个课程
      selectById(id){
        selectById(id).then(res=>{
          console.log(res)
          if(res.code == 200){
            this.form.title = res.data.title;
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //修改课程
      updataClassList(data){
        updataClassList(data).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('修改数据成功!');
            this.classList();
          }else {
            this.$message.error('修改数据失败!');
          }
        }).catch();
      },
      //删除课程
      deleteClassList(id){
        deleteClassList(id).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('删除成功!');
            this.classList();
          }else {
            this.$message.error('删除失败!');
          }
        })
      },
      // treeClick(data) {
      //   console.log(data);
      // },
      //过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      },
      //对话框关闭之前
      handleClose(){
        this.updateDialogVisible = false;
      },
      //修改节点
      updateBtn(data){
        console.log(data);
        console.log(data.id);
        this.selectById(data.id);
        this.form.id = data.id;
        this.updateDialogVisible = true;
      },
      //确认修改
      updataDialogBtn(){
         this.$refs.form.validate((valid) => {
           if (valid) {
             this.updataClassList(this.form);
             this.updateDialogVisible = false;
           } else {
             this.$message.error('请检查输入项');
             return false;
           }
         });
         // this.updataClassList(this.form);
         // this.updateDialogVisible = false;
      },
      //删除数据
      deleteBtn(data,node){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(data);
          console.log(node);
          if(node.childNodes.length!=0){
            this.ids.push(data.id);
            for(let i = 0;i<node.childNodes.length;i++){
               this.ids.push(node.childNodes[i].id);
            }
            this.deleteClassList(this.ids);
          }else {
            this.ids.push(data.id);
            this.deleteClassList(this.ids);
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    },
    watch: {
      filterText(val) {
        this.$refs.elTree.filter(val);
      }
    }
  }
</script>

<style scoped>
  .elRowTree {
    margin-top: 40px;
  }
</style>