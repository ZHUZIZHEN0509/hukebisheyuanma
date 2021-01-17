<template>
  <div id="classadd">
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加课程分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form>
        <el-form-item label="下载模板">
          <a href='https://hk-edu.oss-cn-shanghai.aliyuncs.com/%E6%A8%A1%E6%9D%BF/%E6%A8%A1%E6%9D%BF.xlsx' >下载</a>
        </el-form-item>
        <el-form-item label="选择Excel文件">
          <!--action上传地址
              on-preview 拿到服务器返回数据
              on-remove	文件列表移除文件时的钩子
              auto-upload	是否在选取文件后立即进行上传
              file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
              before-upload	上传文件之前的钩子
              limit上传文件个数
              :on-exceed="handleExceed" 定义超出限制时的行为
              accept 文件类型上传限制-->
          <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="#"
                  :file-list="fileList"
                  :auto-upload="false"
                  :before-upload="beforeUpload"
                  accept=".xls,.xlsx"
                  :http-request="httpRequest"
                  >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" :loading="uploadValue">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
  import { classAdd } from 'network/class'

  export default {
    name: "ClassAdd",
    data(){
      return{
        fileList: [],
        uploadValue: false
      };
    },
    methods: {
      //上传文件之前
      beforeUpload(file){
        console.log(file)
             var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
             const extension = testmsg === 'xls'
             const extension2 = testmsg === 'xlsx'
             // const isLt2M = file.size / 1024 / 1024 < 10
             if(!extension && !extension2) {
                   this.$message({
                        message: '上传文件只能是 xls、xlsx格式!',
                        type: 'warning'
                 });
               }
             // if(!isLt2M) {
             //     this.$message({
             //         message: '上传文件大小不能超过 10MB!',
             //         type: 'warning'
             //     });
             // }
             // return extension || extension2 && isLt2M
             return extension || extension2;

      },
      //上传文件
      submitUpload() {
        this.uploadValue = true;
        this.$refs.upload.submit();
      },
      httpRequest(params){
        const file = params.file;
        // 根据后台需求数据格式
        const form = new FormData();
        // 文件对象
        form.append("file", file);
        // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
        form.append("clientType", 'xxx');
        classAdd(form).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.uploadValue = false;
            this.$message.success('上传成功!');
            this.$router.push('/class/classlist')
          }else {
            this.$message.error('上传失败!');
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>