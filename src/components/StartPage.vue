<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>VDTapok Docker App</h2>
    <img src="../assets/main_logo.jpeg" width="50%" />
    <ul>
      <li>
        <router-link to="/register"><md-button class="md-dense md-primary">Зарегистрироваться</md-button></router-link>
      </li>
      <li>
        <router-link to="/login"><md-button class="md-dense md-raised md-primary">Войти</md-button></router-link>
      </li>
    </ul>
  <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
export default {
  name: 'StartPage',
  components: { Footer },
  data () {
    return {
      msg: 'Welcome to Our Vue.js Docker App!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
