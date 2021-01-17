<template>
  <div id="adduser">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="userForm" :rules="rules" :model="userForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="userForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="successClick">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  import { addUser } from 'network/user'

  export default {
    name: "AddUser",
    data(){
      return{
        userForm: {
          username: '',
          nickName: '',
          password: ''
        },
        rules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          nickName: [
            { required: true, message: '请输入用户昵称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入用户昵称', trigger: 'blur'},
            {min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      //添加用户请求
      addUser(data){
        addUser(data).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('添加用户成功!');
            this.$router.push('/permission/user')
          }else {
            this.$message.error('添加用户失败!');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      successClick(){
        this.addUser(this.userForm);

      }
    }
  }
</script>

<style scoped>

</style>