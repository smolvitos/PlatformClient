<template>

  <div class="md-layout">
        <DockerServicesItem
          v-for="service in services"
          :key="service.imageName"
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
export default {
  components: {
    DockerServicesItem
  },
  data: () => ({
    services: [
      {
        imageName: 'linode/lamp',
        name: 'Apache PHP server',
        description: 'Default LAMP server. Just try it!'
      },
      {
        imageName: 'nginx',
        name: 'nginx server',
        description: 'Server for static files. Maybe it is vulnerable??'
      },
      {
        imageName: 'ubuntu',
        name: 'Bash CRLF',
        description: 'Try to hack bourne again shell!'
      },
      {
        imageName: 'nodejs',
        name: 'Node.js server',
        description: 'Node.js server with insecure file upload'
      }
    ],
    vertical: "left",
    horizontal: "left"
  }),
  methods: {
    checkForKey (imageName) {
      alert(imageName)
    }
  },
  name: 'DockerServices'
}
</script>