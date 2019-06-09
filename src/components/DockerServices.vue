<template>

  <div class="md-layout" id="services">
        <DockerServicesItem
          v-for="(service, index) in services"
          :key="service.baseImage"
          :service="service"
          @listServices="listServices"
        />
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
import DockerServicesItem from '@/components/DockerServicesItem'
import Docker from '@/components/Docker'
import Authentication from '@/components/Authentication'

export default {
  components: {
    DockerServicesItem
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
        //console.log(Authentication.getAuthenticationHeader(this))
        return Docker.emptyRequest()
        .then(() => {
            console.log(Authentication.getAuthenticationHeader(this))
            return Docker.listServices(Authentication.getAuthenticationHeader(this))
            .then((services) => {
                this.services = services.data
            })
        })
    }
  },

  name: 'DockerServices'
}
</script>