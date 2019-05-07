<template>

<div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">

    <md-card class="md-primary">
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{ service.imageName }}</div>
          <div class="md-subhead">{{ service.name }}</div>
        </md-card-header>

        <md-card-content>
          {{ service.description }}
        </md-card-content>

        <md-card-actions>
          <md-button @click="$emit('check', service.imageName)">Запуск</md-button>
          <md-button>Пауза</md-button>
          <md-button>Стоп</md-button>
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