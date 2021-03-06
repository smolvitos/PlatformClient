// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import VueCookie from 'vue-cookie'
import Authentication from '@/components/Authentication'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css' // This line here

Vue.use(VueCookie)
Vue.use(VueMaterial)
Vue.config.productionTip = false
Authentication.checkAuthentication()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})