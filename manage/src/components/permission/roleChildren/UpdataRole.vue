<template>
  <div id="updataRole">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色权限</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tree
              ref="tree"
              :data="list"
              :props="props"
              show-checkbox
              node-key="id"
              >
      </el-tree>
      <el-button type="primary" @click="getCheckedKeys">保存</el-button>
    </el-card>
  </div>
</template>

<script>
  import { getAllRole,setRole } from "network/role";

  export default {
    name: "updataRole",
    data(){
      return{
        list: [],
        props: {
          children: 'children',
          label: 'name'
        },
        checkKeys: [],
        //角色id
        roleId: ''
      }
    },
    created(){
      this.getAllRole();
      this.roleId = this.$route.params.id;
    },
    methods:{
      //获取所有权限
      getAllRole(){
        getAllRole().then(res=>{
          console.log(res);
          if(res.code == 200){
            this.list = res.data;
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      //添加角色权限  给角色分配权限
      setRole(id,ids){
        setRole(id,ids).then(res=>{
          console.log(res);
          if (res.code == 200){
            this.$message.success('添加角色权限成功!');

          }
        }).catch(err=>{
          console.log(err);
        })
      },
      getCheckedKeys(){
        this.checkKeys = this.$refs.tree.getCheckedKeys();
        // console.log(this.$refs.tree.getCheckedKeys())
        this.setRole(this.roleId,this.checkKeys);
        this.$router.push('/permission/role');
      }
    }
  }
</script>

<style scoped>

</style>