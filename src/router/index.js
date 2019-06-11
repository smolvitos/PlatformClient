import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/StartPage'
import Register from '@/components/Authentication/Register'
import Login from '@/components/Authentication/Login'
import MainPageAdmin from '@/components/Docker/Admin/MainPage'
import MainPageUser from '@/components/Docker/User/MainPage'
import Auth from '@/components/Authentication'
import DockerServicesAdmin from '@/components/Docker/Admin/DockerServices'

Auth.checkAuthentication()
Vue.use(Router)

let checks = {}

checks.isLoggedIn = () => (to, from, next) => {
  Auth.user.authenticated ?
  next() : next({ path: '/login' })
}

checks.preventDoubleLogin = () => (to, from, next) => {
  Auth.user.authenticated ?
  next({ path: '/main' }) : next()
}

let routes = [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: checks.preventDoubleLogin()
    },
    {
      path: '/main',
      name: 'MainPage',
      component: Auth.user.isAdmin ? MainPageAdmin : MainPageUser,
      beforeEnter: checks.isLoggedIn()
    },
    {
      path: '/abc',
      name: 'DockerServicesAdmin',
      component: DockerServicesAdmin,
    }
  ]
//console.log(Auth.user)
const router = new Router({
  mode: 'history',
  routes
})

export default router
