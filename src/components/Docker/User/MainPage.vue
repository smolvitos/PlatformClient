<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title">{{ currentTabTitle }}</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Навигация
        </md-toolbar>

        <md-list>
            <md-list-item @click="changeTab('UserProfile', 'Профиль пользователя')">
            <md-icon>account_box</md-icon>
            <span class="md-list-item-text">Профиль</span>
          </md-list-item>

          <md-list-item @click="changeTab('DockerServicesUser', 'Сервисы')">
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">Сервисы</span>
          </md-list-item>

          <md-list-item @click="changeTab('FlagChecker', 'Проверка флагов')">
            <md-icon>flag</md-icon>
            <span class="md-list-item-text">Проверка флагов</span>
          </md-list-item>

          <md-list-item @click="changeTab('Settings', 'Настройки')">
            <md-icon>settings</md-icon>
            <span class="md-list-item-text">Настройки</span>
          </md-list-item>

          <md-list-item @click="logout">
            <md-icon>logout</md-icon>
            <span class="md-list-item-text">Выход</span>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content>

        <component
          v-bind:is="currentTabComponent"
          @showMessage="showMessage"
        />
        <md-snackbar :md-duration="messageDuration" :md-position="messagePosition" :md-active.sync="isMessageShow">
            <span>{{ apiMessage }}</span>
        </md-snackbar>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    min-height: 100vh;
    border: 1px solid rgba(#000, .12);
    height: 100%;
  }

   // Demo purposes only
  .md-drawer {
    width: 250px;
    max-width: calc(100vw - 125px);
  }
</style>

<script>
  import DockerServicesUser from '@/components/Docker/User/DockerServices'
  import FlagChecker from '@/components/Docker/User/FlagChecker'
  import UserProfile from '@/components/Docker/User/UserProfile'
  import Settings from '@/components/Docker/Settings'
  import Authentication from '@/components/Authentication'
  import Docker from '@/components/Docker'
export default {
  components: {
    DockerServicesUser, Settings, FlagChecker, UserProfile
  },
  data: () => ({
    currentTabComponent: DockerServicesUser,
    currentTabTitle: 'Сервисы',
    apiMessage: null,
    isMessageShow: false,
    messageDuration: 4000,
    messagePosition: 'center'
  }),
  methods: {
    
    changeTab (component, title) {
      this.currentTabComponent = component
      this.currentTabTitle = title
    },

    showMessage(message) {
        this.apiMessage = message
        this.isMessageShow = true
    },

    logout () {
        Authentication.logout(this)
    }

  },

  name: 'MainPageUser'
}
</script>