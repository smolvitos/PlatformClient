<template>

  <div class="md-layout">
        <DockerServicesItem
          v-for="service in services"
          :key="service.baseImage"
          :service="service"
          @start="startService"
          @pause="pauseService"
          @stop="stopService"
          @delete="deleteService"
        />
  </div>
  
</template>

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
        Docker.listServices(document.cookie)
        .then((services) => {
            console.log(services.data)
            this.services = services.data
        })
    },

    startService(baseImage, containerName, state) {
        let service = {
            baseImage,
            containerName,
            state
        }
        Docker.startService('', service)
        .then((response) => {
            console.log(response.data)
        })
        .then(() => {
            setTimeout(this.listServices, 1500)
        })
        .catch((errorResponse) => {
            alert(errorResponse.response.data)
        })
    },

    pauseService(containerName, state) {
        let service = {
            containerName,
            state
        }
        Docker.pauseService('', service)
        .then((response) => {
            console.log(response.data)
        })
        .then(() => {
           setTimeout(this.listServices, 1500) 
        })
        .catch((errorResponse) => {
            alert(errorResponse.response.data)
        })
    },

    stopService(containerName, state) {
         let service = {
            containerName,
            state
        }
        Docker.stopService('', service)
        .then((response) => {
            console.log(response.data)
        })
        .then(() => {
            setTimeout(this.listServices, 1500)
        })
        .catch((errorResponse) => {
            alert(errorResponse.response.data)
        })
    },

    deleteService(baseImage, containerName, state) {
         let service = {
            baseImage,
            containerName,
            state
        }
        Docker.deleteService('', service)
        .then((response) => {
            console.log(response.data)
        })
        .then(() => {
            setTimeout(this.listServices, 1500)
        })
        .catch((errorResponse) => {
            alert(errorResponse.response.data)
        })
    }
  },

  name: 'DockerServices'
}
</script>