<template>

    <md-card :class="cardColor">
      <md-ripple>
        <md-card-header>
          <div class="md-title">{{ service.baseImage }}</div> <!-- Поменять местами-->
          <div class="md-subhead">{{ service.serviceName }}</div>
        </md-card-header>

        <md-card-content>
          {{ service.serviceDescription }}
        </md-card-content>

        <md-card-actions>
          <md-button @click="$emit('start', service.baseImage, service.containerName, service.state)" :disabled=buttonController.start>
            <md-icon>play_arrow</md-icon>
          </md-button>
          <md-button @click="$emit('pause', service.containerName, service.state)" :disabled=buttonController.pause>
            <md-icon>pause</md-icon>
          </md-button>
          <md-button @click="$emit('stop', service.containerName, service.state)" :disabled=buttonController.stop>
            <md-icon>stop</md-icon>
          </md-button>
          <md-button @click="$emit('delete', service.baseImage, service.containerName, service.state)" :disabled=buttonController.delete>
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-actions>
      </md-ripple>
      <md-progress-bar md-mode="indeterminate" v-if="changing" />
    </md-card>

</template>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";

  @include md-register-theme("green-card", (
    primary: md-get-palette-color(green, 500)
  ));

  @include md-register-theme("black-card", (
    primary: md-get-palette-color(black, 500)
  ));

  @include md-register-theme("purple-card", (
    primary: md-get-palette-color(purple, 500)
  ));

  @include md-register-theme("orange-card", (
    primary: md-get-palette-color(orange, 500)
  ));

  @import "~vue-material/dist/base/theme";
  @import "~vue-material/dist/components/MdCard/theme";

  .md-card {
    margin: 4px;
    display: inline-block;
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
  },
  data: () => ({
      changing: false
  }),

  computed: {
    cardColor: function () {
        return (!this.service.containerName && !this.service.state) ? '' :
            (this.service.containerName && this.service.state != 'running') ? 'md-accent' :
            (this.service.containerName && this.service.state == 'running') ? 'md-primary' :
            ''
    },
    buttonController: function() {
        return {
            start: (this.service.state == 'running') ? true : false,
            pause: (this.service.containerName && this.service.state == 'running') ? false : true,
            stop: (this.service.containerName) ? false : true,
            delete: false
        }
    }
  }
}
</script>