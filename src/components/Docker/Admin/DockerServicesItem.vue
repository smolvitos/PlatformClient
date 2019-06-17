<template>
    <div>
        <md-card :class="cardColor" md-with-hover> <!-- md-theme="custom-card" -->
            <md-card-header>
            <md-button :md-ripple="false" @click="showDialog = true">{{ service.serviceName }}</md-button> <!-- Поменять местами-->
            <div class="md-subhead">{{ service.baseImage }}</div>
            </md-card-header>

            <md-card-content>
            {{ service.serviceShortDescription }}
            </md-card-content>

            <md-card-actions>
            <md-button @click="startService" :disabled=buttonController.start> <!--$emit('start', service.baseImage, service.containerName, service.state)-->
                <md-icon>play_arrow</md-icon> 
                 <md-tooltip md-direction="top">Запустить сервис</md-tooltip>
            </md-button>
            <md-button @click="pauseService" :disabled=buttonController.pause> <!--//$emit('pause', service.containerName, service.state)-->
                <md-icon>pause</md-icon>
                 <md-tooltip md-direction="top">Поставить на паузу</md-tooltip>
            </md-button>
            <md-button @click="stopService" :disabled=buttonController.stop> <!--//$emit('stop', service.containerName, service.state)-->
                <md-icon>stop</md-icon>
                 <md-tooltip md-direction="top">Остановить сервис</md-tooltip>
            </md-button>
            <md-button @click="deleteService" :disabled=buttonController.delete> <!--//$emit('delete', service.baseImage, service.containerName, service.state)-->
                <md-icon>delete</md-icon>
                 <md-tooltip md-direction="top">Удалить сервис</md-tooltip>
            </md-button>
            </md-card-actions>
            
        </md-card>
        <md-progress-bar md-mode="indeterminate" v-show="changing" />
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>{{ service.serviceName }} (основан на {{ service.baseImage }})</md-dialog-title>
            <md-dialog-content>
                <span class="md-caption">Краткое описание</span>
                <span class="md-body-1">{{ service.serviceShortDescription }}</span>

                <span class="md-caption">Полное описание</span>
                <span class="md-body-1">{{ service.serviceDescription }}</span>

                <span class="md-caption">Доступ</span>
                <span class="md-body-1">{{ service.ports }}</span>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Закрыть</md-button>
            </md-dialog-actions>
        </md-dialog>

        <!-- <md-button class="md-primary md-raised" @click="showDialog = true">Show Dialog</md-button> -->
    </div>
</template>

</template>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";

  @include md-register-theme("custom-card", (
    primary: md-get-palette-color(green, 500),
    accent: md-get-palette-color(orange, 500),
    theme: dark
  ));

  @import "~vue-material/dist/base/theme";
  @import "~vue-material/dist/components/MdCard/theme";

  .md-card {
      margin: 5px;
      max-width: 400px;
  }
  
  .md-dialog {
    max-width: 768px;
  }

  span {
      display: block;
    }
</style>

<script>
import Docker from '@/components/Docker'
import Authentication from '@/components/Authentication'

export default {
  name: 'DockerServicesItemAdmin',
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data: () => ({
      changing: false,
      showMessage: false,
      serverMessage: null,
      showDialog: false
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
        Docker.startService(Authentication.getAuthenticationHeader(this), serviceItem)
        .then((response) => {
            console.log(response.data)
            this.serverMessage = response.data.status
            this.showMessage = true
            this.changing = false
            this.$emit('listServices')
        })
        .catch((errorResponse) => {
            this.changing = false
            alert(errorResponse.response.data.message)
        })
    },

    pauseService(containerName, state) {
        let service = {
            containerName: this.service.containerName,
            state: this.service.state
        }
        this.changing = true
        Docker.pauseService(Authentication.getAuthenticationHeader(this), service)
        .then((response) => {
            console.log(response.data)
            this.serverMessage = response.data.status
            this.showMessage = true
            this.changing = false
            this.$emit('listServices')
        })
        .catch((errorResponse) => {
            this.changing = false
            alert(errorResponse.response.data.message)
        })
    },

    stopService(containerName, state) {
         let service = {
            containerName: this.service.containerName,
            state: this.service.state
        }
        this.changing = true
        Docker.stopService(Authentication.getAuthenticationHeader(this), service)
        .then((response) => {
            console.log(response.data)
            this.serverMessage = response.data.status
            this.showMessage = true
            this.changing = false
            this.$emit('listServices')
        })
        .catch((errorResponse) => {
            this.changing = false
            alert(errorResponse.response.data.message)
        })
    },

    deleteService(baseImage, containerName, state) {
         let service = {
            baseImage: this.service.baseImage,
            containerName: this.service.containerName,
            state: this.service.state
        }
        this.changing = true
        Docker.deleteService(Authentication.getAuthenticationHeader(this), service)
        .then((response) => {
            console.log(response.data)
            this.serverMessage = response.data.status
            this.showMessage = true
            this.changing = false
            this.$emit('listServices')
        })
        .catch((errorResponse) => {
            this.changing = false
            alert(errorResponse.response.data.message)
        })
    }
  }
}
</script>
