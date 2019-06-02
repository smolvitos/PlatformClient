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
          <md-button @click="startService" :disabled=buttonController.start> <!--$emit('start', service.baseImage, service.containerName, service.state)-->
            <md-icon>play_arrow</md-icon>
          </md-button>
          <md-button @click="pauseService" :disabled=buttonController.pause> <!--//$emit('pause', service.containerName, service.state)-->
            <md-icon>pause</md-icon>
          </md-button>
          <md-button @click="stopService" :disabled=buttonController.stop> <!--//$emit('stop', service.containerName, service.state)-->
            <md-icon>stop</md-icon>
          </md-button>
          <md-button @click="deleteService" :disabled=buttonController.delete> <!--//$emit('delete', service.baseImage, service.containerName, service.state)-->
            <md-icon>delete</md-icon>
          </md-button>
        </md-card-actions>
        <md-progress-bar md-mode="indeterminate" v-show="changing" />
      </md-ripple>
      <md-snackbar :md-active.sync="showMessage" md-duration="2000">{{ serverMessage }}</md-snackbar>
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
      margin: 5px;
  }

</style>

<script>
import Docker from '@/components/Docker'

export default {
  name: 'DockerServicesItem',
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data: () => ({
      changing: false,
      showMessage: false,
      serverMessage: null
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
  },

  methods: {
    startService() { 
        let baseImage = this.service.baseImage
        let containerName = this.service.containerName
        let state = this.service.state  
        let serviceItem = {
                baseImage,
                containerName,
                state
        }
        this.changing = true
        Docker.startService('', serviceItem)
        .then((response) => {
            console.log(response.data)
            this.serverMessage = response.data.status
        })
        .then(() => {
            setTimeout(() => {
                this.showMessage = true
                this.changing = false
                this.$emit('listServices')
            }, 2000)
        })
        .catch((errorResponse) => {
            this.changing = false
            alert(errorResponse.response.data)
        })
    },

    pauseService(containerName, state) {
        let service = {
            containerName: this.service.containerName,
            state: this.service.state
        }
        this.changing = true
        Docker.pauseService('', service)
        .then((response) => {
            console.log(response.data)
            this.serverMessage = response.data.status
        })
        .then(() => {
            setTimeout(() => {
                this.showMessage = true
                this.changing = false
                this.$emit('listServices')
            }, 2000)
        })
        .catch((errorResponse) => {
            this.changing = false
            alert(errorResponse.response.data)
        })
    },

    stopService(containerName, state) {
         let service = {
            containerName: this.service.containerName,
            state: this.service.state
        }
        this.changing = true
        Docker.stopService('', service)
        .then((response) => {
            console.log(response.data)
            this.serverMessage = response.data.status
        })
        .then(() => {
            setTimeout(() => {
                this.showMessage = true
                this.$emit('listServices')
                this.changing = false
            }, 2000)
        })
        .catch((errorResponse) => {
            this.changing = false
            alert(errorResponse.response.data)
        })
    },

    deleteService(baseImage, containerName, state) {
         let service = {
            baseImage: this.service.baseImage,
            containerName: this.service.containerName,
            state: this.service.state
        }
        this.changing = true
        Docker.deleteService('', service)
        .then((response) => {
            console.log(response.data)
            this.serverMessage = response.data.status
        })
        .then(() => {
            setTimeout(() => {
                this.showMessage = true
                this.changing = false
                this.$emit('listServices')
            }, 2000)
        })
        .catch((error) => {
            alert(error)
        })
    }
  }
}
</script>
