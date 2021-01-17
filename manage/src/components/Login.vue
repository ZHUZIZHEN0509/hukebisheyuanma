<template>
  <div id="login">
    <div class="container">
      <div class="login-input">
        <div class="login-head">
          <img src="../assets/zsky_logo.jpg" alt="">
        </div>
        <div class="login-form">
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username"  placeholder="请输入用户名" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password"  placeholder="请输入密码" prefix-icon="el-icon-s-cooperation" show-password></el-input>
            </el-form-item>
            <el-form-item class="el-item-btn">
              <el-button type="primary" @click="loginBtn">登录</el-button>
              <el-button @click="resetBtn">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import { getLogin } from "network/login";

  export default {
    name: "Login",
    data(){
       return {
         loginForm: {
           username: '',
           password: ''
         },
         loginFormRules:{
           username:[
             {required: true,message: '请输入管理员名称',trigger: 'blur'},
             { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
           ],
           password:[
             {required: true,message: '请输入管理员密码',trigger: 'blur'},
             { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
           ]
         },
         registerDialogVisible: false
       }
    },
    methods:{
      //登录请求
      getLogin(data){
        getLogin(data).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$cookies.set('setLogin',res.data.token);
            console.log(this.$cookies.get('setLogin'))
            this.$message.success('登录成功!');
            this.$router.push('/home');
          }else {
            this.$message.error('用户名或密码错误!');
          }
        }).catch(err=>{
          console.log(err);
        });
      },
      loginBtn(){
        //登录预验证
        this.$refs.loginFormRef.validate(async valid => {
           if (!valid) return;
           //发送登录请求
            this.getLogin(this.loginForm);

          // this.$router.push('/home');
          // this.$message.success('登录成功');
        })


      },
      resetBtn(){
        this.$refs.loginFormRef.resetFields();
      }
    }
  }
</script>

<style scoped>
  #login{
    position: relative;
    height: 100%;
  }
  #login > .container{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #2b4b6b;
  }
  .login-input{
    width: 450px;
    height: 300px;
    border-radius: 3px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .login-head{
    height: 130px;
    width: 130px;
    /*border: 1px solid #eee;*/
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    /*background-color: #f4f4f5;*/
    padding: 10px;
    /*box-shadow: 0 0 10px #ddd;*/
  }
  .login-head img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
  .login-form{
    position: absolute;
    top: 30%;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  .el-item-btn{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .el-span{
    color: white;
    text-align: center;
    cursor: pointer;
  }


</style>