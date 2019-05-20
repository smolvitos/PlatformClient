import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Authentication/Register'
import Login from '@/components/Authentication/Login'
import MainPage from '@/components/MainPage'
import Auth from '@/components/Authentication'
import DockerServices from '@/components/DockerServices'

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

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
      component: MainPage,
      beforeEnter: checks.isLoggedIn()
    },
    {
      path: '/abc',
      name: 'DockerServices',
      component: DockerServices,
    }
  ]
})

export default router
