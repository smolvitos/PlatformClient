<template>

<div class="md-layout-item">

    <md-card class="md-primary">
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{ service.baseImage }}</div> <!-- Поменять местами-->
          <div class="md-subhead">{{ service.serviceName }}</div>
        </md-card-header>

        <md-card-content>
          {{ service.serviceDescription }}
        </md-card-content>

        <md-card-actions class="md-alignment-left-left">
          <md-button @click="$emit('check', service.baseImage)">
            <md-icon>play_arrow</md-icon>
          </md-button>
          <md-button @click="$emit('check', service.baseImage)">
            <md-icon>pause</md-icon>
          </md-button>
          <md-button @click="$emit('check', service.baseImage)">
            <md-icon>stop</md-icon>
          </md-button>
          <md-button @click="$emit('check', service.baseImage)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>

  </div>

</template>

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