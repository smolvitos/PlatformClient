<template>

  <div class="md-layout">
        <DockerServicesItem
          v-for="service in services"
          :key="service.baseImage"
          :service="service"
          @check="checkForKey"
        />
  </div>
  
</template>

<style lang="scss" scoped>
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
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
    Docker.getServices(document.cookie)
    .then((services) => {
      console.log(services.data)
      this.services = services.data
    })
  },

  methods: {
    checkForKey (imageName) {
      alert(imageName)
    }
  },

  name: 'DockerServices'
}
</script>