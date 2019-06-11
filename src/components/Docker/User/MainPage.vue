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
          <md-list-item @click="changeTab('DockerServicesUser', 'Сервисы')">
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">Сервисы</span>
          </md-list-item>

          <md-list-item @click="listServices">
            <md-icon>update</md-icon>
            <span class="md-list-item-text">Обновить</span>
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
        />
      
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    max-height: 900px;
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
  import Authentication from '@/components/Authentication'
  import Docker from '@/components/Docker'
export default {
  components: {
    DockerServicesUser
  },
  data: () => ({
    currentTabComponent: DockerServicesUser,
    currentTabTitle: 'Сервисы'
  }),
  methods: {
    changeTab (component, title) {
      this.currentTabComponent = component
      this.currentTabTitle = title
    },

    logout () {
        Authentication.logout(this)
    },

    listServices() {
        let token = Authentication.getAuthenticationHeader(this)
        Docker.emptyRequest(token)
        .then(() => {
            return Docker.listServices(token)
        })
        .then((services) => {
            this.services = services.data
        })
    }
  },
  name: 'MainPageUser'
}
</script>