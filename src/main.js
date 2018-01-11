// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import http from "@/util/http.js"
import configCheckbox from "./components/configCheckbox/index.js"
import checkboxGroup from "./components/checkboxGroup/index.js"

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(configCheckbox);
Vue.use(checkboxGroup);
//  axios  加入到 vue 的原型方法中
Object.defineProperty(Vue.prototype, '$http', { value: http})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  customOption:"foo",
  router,
  template: '<App/>',
  components: { App }
})
