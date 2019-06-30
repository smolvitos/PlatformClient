<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>VDTapok Docker App</h2>
    <img src="../assets/main_logo.jpeg" width="50%" />
    <ul>
      <li>
        <md-button class="md-icon-button" @click = "showSettings = true">
            <md-icon>settings</md-icon>
        </md-button>
      </li>
      <li>
        <router-link to="/register"><md-button class="md-dense md-primary">Зарегистрироваться</md-button></router-link>
      </li>
      <li>
        <router-link to="/login"><md-button class="md-dense md-raised md-primary">Войти</md-button></router-link>
      </li>
    </ul>

    <md-dialog :md-active.sync="showSettings">
        <md-dialog-title>Настройки</md-dialog-title>

        <md-tabs md-dynamic-height>
            <md-tab md-label="Подключение">
            <Settings 
                @closeSettings = "showSettings = false"
            />
            </md-tab>
        </md-tabs>
      </md-dialog>
  <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Settings from '@/components/Docker/Settings'

export default {
  name: 'StartPage',
  components: { Footer, Settings },
  data () {
    return {
      msg: 'Welcome to Our Vue.js Docker App!',
      showSettings: false
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
