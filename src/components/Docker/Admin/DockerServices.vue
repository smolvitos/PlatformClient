<template>
<div>
   <div class="md-layout">
         <div class="md-layout-item">
            <md-button class="md-raised md-primary" @click="listServices">
                Обновить
                <md-tooltip md-direction="bottom">Обновить</md-tooltip>
            </md-button>
          </div>
  </div><br />
  <md-divider /><br />
  <div class="md-layout" id="services">
        <DockerServicesItemAdmin
          v-for="(service, index) in services"
          :key="service.baseImage"
          :service="service"
          @listServices="listServices"
        />
  </div>
</div>
</template>

<style>
#services {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: space-around
}
</style>

<script>
import DockerServicesItemAdmin from '@/components/Docker/Admin/DockerServicesItem'
import Docker from '@/components/Docker'
import Authentication from '@/components/Authentication'

export default {
  components: {
    DockerServicesItemAdmin
  },

  data: () => ({
    services: []
  }),

  beforeMount () {
      this.listServices()
  },

  methods: {
    checkForKey (imageName) {
      alert(imageName)
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

  name: 'DockerServicesAdmin'
}
</script>