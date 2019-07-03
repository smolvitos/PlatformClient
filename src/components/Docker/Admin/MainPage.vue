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
          <md-list-item @click="changeTab('DockerServicesAdmin', 'Сервисы')">
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">Сервисы</span>
          </md-list-item>

          <md-list-item @click="changeTab('LoadService', 'Загрузка сервисов')">
            <md-icon>play_for_work</md-icon>
            <span class="md-list-item-text">Импорт</span>
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
    min-height: 700px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 250px;
    max-width: calc(100vw - 125px);
  }
</style>

<script>
  import LoadService from '@/components/Docker/Admin/LoadService'
  import Settings from '@/components/Docker/Settings'
  import DockerServicesAdmin from '@/components/Docker/Admin/DockerServices'
  import Authentication from '@/components/Authentication'
export default {
  components: {
    LoadService, DockerServicesAdmin, Settings
  },
  data: () => ({
    currentTabComponent: DockerServicesAdmin,
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
  name: 'MainPageAdmin'
}
</script>