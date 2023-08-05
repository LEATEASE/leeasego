import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
Vue.config.productionTip = false
//注册全局组件
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
import store from '@/store'
import '@/mock/mockServer'
import 'swiper/css/swiper.css'
import ElementUI from 'element-ui'
import {MessageBox} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
//注册全局组件
// Vue.component(Button.name,Button)
// Vue.component(Form.name,Form)
// Vue.component(FormItem.name,FormItem)
// Vue.component(Input.name,Input)
//elementui注册组件的另一种写法，挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//尝试不使用vuex中的actions发axios请求
//先在main文件中引入api
//然后将api绑定在vue原型上
import * as API from '@/api'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  loading:require('./assets/images/42.jpg')
})
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this;
    //在vue原型上绑定一个$API方法
    Vue.prototype.$API=API;
  },
  router,
  store
}).$mount('#app')
