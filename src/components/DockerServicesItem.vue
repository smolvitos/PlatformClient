<template>

    <md-card class="md-accent">
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{ service.baseImage }}</div> <!-- Поменять местами-->
          <div class="md-subhead">{{ service.serviceName }}</div>
        </md-card-header>

        <md-card-content>
          {{ service.serviceDescription }}
        </md-card-content>

        <md-card-actions class="md-alignment-left-left">
          <md-button @click="$emit('start', service.baseImage, service.containerName, service.state)">
            <md-icon>play_arrow</md-icon>
          </md-button>
          <md-button @click="$emit('pause', service.containerName, service.state)">
            <md-icon>pause</md-icon>
          </md-button>
          <md-button @click="$emit('stop', service.containerName, service.state)">
            <md-icon>stop</md-icon>
          </md-button>
          <md-button @click="$emit('delete', service.baseImage, service.containerName, service.state)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>

</template>

<style lang="scss" scoped>
  .md-card {
    width: 400px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>

<script>
export default {
  name: 'DockerServicesItem',
  props: {
    service: {
      type: Object,
      required: true
    }
  }
}
</script>