<template>
  <div id="addrole">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>分配角色</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="role in roleData" :label="role.id" :key="role.id">{{role.roleName}}</el-checkbox>
        <!--id: "1193757683205607426", roleName: "课程管理员", isDeleted: 0, createTime: "2019-11-11 13:09:45", updateTime: "2019-11-18 10:25:44"-->
      </el-checkbox-group>
      <div style="margin: 15px 0;"></div>
      <el-button type="primary" @click="btn">保存</el-button>
    </el-card>
  </div>
</template>

<script>
  import { searchAllRole , gaveRole} from 'network/role'


  export default {
    name: "AddRole",
    data(){
      return{
        checkAll: false,
        checkedCities: [],
        isIndeterminate: true,
        roleData: [],
        ids: []
      }
    },
    created(){
      this.searchAllRole();

    },
    methods:{
      //查找所有角色
      searchAllRole(){
        searchAllRole().then(res=>{
          console.log(res)
          if(res.code == 200){
            this.roleData = res.data;
            for(let i = 0;i<res.data.length;i++){
              this.ids[i]=res.data[i].id;
            }
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //根据用户分配角色
      gaveRole(useId,ids){
        gaveRole(useId,ids).then(res=>{
          console.log(res);
          if(res.code == 200){
            this.$message.success('分配用户成功!');
          }else {
            this.$message.error('分配用户失败!');
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.ids : [];
        console.log(val);
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log(value);
        console.log(this.checkedCities+'------');
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.roleData.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleData.length;
      },
      btn(){
        this.gaveRole(this.$route.params.id,this.checkedCities);
        this.$router.push('/permission/user')
      }
    }
  }
</script>

<style scoped>

</style>