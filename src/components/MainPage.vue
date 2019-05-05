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
          <md-list-item @click="changeTab('dockerContainers', 'Сервисы')">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Контейнеры</span>
          </md-list-item>

          <md-list-item @click="changeTab('loadImage', 'Загрузка образов')">
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Импорт</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
       <component
        v-bind:is="currentTabComponent"
        ></component>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    max-height: 900px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 250px;
    max-width: calc(100vw - 125px);
  }
</style>

<script>
  import loadImage from '@/components/loadImage'
  import dockerContainers from '@/components/dockerContainers'
export default {
  components: {
    loadImage, dockerContainers
  },
  data: () => ({
    currentTabComponent: null,
    currentTabTitle: null
  }),
  methods: {
    changeTab (component, title) {
      this.currentTabComponent = component
      this.currentTabTitle = title
    }
  },
  name: 'MainPage'
}
</script>