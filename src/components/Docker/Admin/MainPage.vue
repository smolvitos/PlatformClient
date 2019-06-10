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

          <md-list-item @click="changeTab('LoadImage', 'Загрузка образов')">
            <md-icon>play_for_work</md-icon>
            <span class="md-list-item-text">Импорт</span>
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
  import LoadImage from '@/components/Docker/Admin/LoadImage'
  import DockerServicesAdmin from '@/components/Docker/Admin/DockerServices'
  import Authentication from '@/components/Authentication'
export default {
  components: {
    LoadImage, DockerServicesAdmin
  },
  data: () => ({
    currentTabComponent: DockerServicesAdmin,
    currentTabTitle: 'Сервисы'
  }),
  methods: {
    changeTab (component, title) {
      this.currentTabComponent = component
      this.currentTabTitle = title
    },

    logout () {
        Authentication.logout(this)
    }
  },
  name: 'MainPageAdmin'
}
</script>