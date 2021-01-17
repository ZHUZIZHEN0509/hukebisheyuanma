import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI, {Message,Main,Aside, Button, Container, Form, Input,Dialog,Table,DatePicker,Tooltip,MessageBox,Upload,Tree,Steps,InputNumber} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//导入全局样式
import './assets/css/global.css'

//导入cookies
// import VueCookies from 'vue-cookies'
import VueCookies from 'vue-cookies'




Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Form);
Vue.use(Input);
Vue.use(Container);
Vue.use(Button);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Dialog);
Vue.use(Table);
Vue.use(DatePicker);
Vue.use(Tooltip);
Vue.use(Upload);
Vue.use(Tree);
Vue.use(Steps);
Vue.use(InputNumber);
Vue.use(VueCookies);


Vue.prototype.$cookies = VueCookies;
Vue.prototype.$message = Message;




new Vue({
  render: h => h(App),
  router
}).$mount('#app')
