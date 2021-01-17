//6 封装网络请求 抽取index中的网络请求
//封装axios
import axios from 'axios'
import VueCookies from 'vue-cookies'

import Vue from 'vue'
import router from '../router'


export function request(config) {

  //(1).创建axios的实例
  const instance = axios.create({
    baseURL: 'http://47.114.33.240:8000',
    timeout: 5000
  })

  //7. axios的拦截器 ---这里拦截实例   全局拦截：axios.interceptors
  //7.-1拦截请求    use有两个参数(请求成功，请求失败)
  instance.interceptors.request.use(config =>{
    console.log(config);
    //拦截后需要继续返回，否则拿不到信息会报错
    console.log(VueCookies.isKey('setLogin'));
    if(VueCookies.isKey('setLogin')){
      console.log(VueCookies.get('setLogin'))
       config.headers['token'] = VueCookies.get('setLogin');
    }
    return config;
  },err => {
    console.log(err);
  });
  //7.-2拦截响应  use(成功结果，失败结果)
  instance.interceptors.response.use(res =>{
    console.log(res);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log(res.data)
    if(res.data.code == '4012'){
      console.log("=================================")
      // alert('登录失效,请重新登录');
      // this.$router.push('/login');
      Vue.prototype.$message.error('登录已过期，请重新登录');
      router.replace('/login')
    }
    return res.data;//需要返回数据，否则拿不到
    //res.data 取出数据
  },err =>{
    console.log(err);
  });

  //发送真正的网络请求  instance本身返回值就是promise
  return instance(config)
}

