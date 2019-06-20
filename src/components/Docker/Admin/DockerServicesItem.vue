<template>
    <div>
        <md-card :class="cardColor" md-with-hover> <!-- md-theme="custom-card" -->
            <md-card-header>
            <div class="md-layout md-gutter">
                <div class="md-layout md-layout-item"></div>
                <div class="md-layout md-layout-item">
                    <md-button :md-ripple="false" @click="showServiceDialog = true">Имя сервиса</md-button> <!-- Поменять местами-->
                </div>
                <div class="md-layout md-layout-item md-alignment-top-right">
                    <md-button class="md-icon-button" @click="showEditDialog = true">
                        <md-icon>edit</md-icon>
                    </md-button>
                </div>
            </div>
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

        <md-dialog :md-active.sync="showServiceDialog">
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
                <md-button class="md-primary" @click="showServiceDialog = false">Закрыть</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-dialog :md-active.sync="showEditDialog">
            <md-dialog-title>Редактированние сервиса</md-dialog-title>
            <md-dialog-content>
                <form class="md-layout md-alignment-center-center" id="updateForm" name="updateForm" enctype="multipart/form-data">
                    <md-field :class="getValidationClass('servicename')">
                        <label for="servicename">Название сервиса</label>
                        <md-input type="text" name="servicename" id="servicename" autocomplete="servicename" v-model="form.servicename" :disabled="updating" />
                        <span class="md-error" v-if="!$v.form.servicename.required">Укажите название сервиса</span>
                    </md-field>
                    <md-field :class="getValidationClass('shortdescription')">
                        <label for="shortdescription">Краткое описание сервиса</label>
                        <md-textarea type="text" name="shortdescription" id="shortdescription" autocomplete="shortdescription" v-model="form.shortdescription" :disabled="updating" />
                        <span class="md-error" v-if="!($v.form.shortdescription.required && $v.form.shortdescription.maxLength)">Укажите краткое описание сервиса (не более 100 символов)</span>
                    </md-field>
                    <md-field :class="getValidationClass('description')">
                        <label for="description">Описание сервиса</label>
                        <md-textarea type="text" name="description" id="description" autocomplete="description" v-model="form.description" :disabled="updating" />
                        <span class="md-error" v-if="!$v.form.description.required">Укажите описание сервиса</span>
                    </md-field>
                </form>
            </md-dialog-content>

            <md-progress-bar md-mode="indeterminate" v-show="updating" />

            <md-dialog-actions>
                <md-button class="md-raised md-primary" @click="checkUpdateForm" :disabled="updating">Сохранить</md-button>
                <md-button class="md-primary" @click="showEditDialog = false" :disabled="updating">Закрыть</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- <md-button class="md-primary md-raised" @click="showServiceDialog = true">Show Dialog</md-button> -->
        <md-snackbar :md-duration="messageDuration" :md-position="messagePosition" :md-active.sync="showMessage">
        <span>{{ apiMessage }}</span>
        </md-snackbar>
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
    min-width: 900px;
    max-width: 1000px;
  }

  span {
      display: block;
    }
</style>

<script>
import Docker from '@/components/Docker'
import Authentication from '@/components/Authentication'
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'DockerServicesItemAdmin',
  mixins: [validationMixin],
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  data: () => ({
      changing: false,
      updating: false,
      showMessage: false,
      apiMessage: null,
      messageDuration: 4000,
      messagePosition: 'center',
      showServiceDialog: false,
      showEditDialog: false,
      form: {
        servicename: null,
        description: null,
        shortdescription: null
      }
  }),

  validations: {
      form: {
        servicename: {
          required
        },
        description: {
          required
        },
        shortdescription: {
            required,
            maxLength: maxLength(100)
        }
      }
  },

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

  beforeMount() {
    this.form.servicename = this.service.serviceName
    this.form.description = this.service.serviceDescription
    this.form.shortdescription = this.service.serviceShortDescription
  },

  methods: {
    getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        const files = this.$v[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
    },

    clearForm () {
        this.$v.$reset()
        this.form.servicename = null
        this.form.description = null
        this.form.shortdescription = null
        this.imagefile = null
    },

    checkUpdateForm () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.updateService()
      }
    },

    updateService() {
        let serviceToUpdate = new FormData(document.getElementById('updateForm'))
        serviceToUpdate.append('_id', this.service._id)
        //console.log(serviceToUpdate)
        Docker.updateService(this, serviceToUpdate, Authentication.getAuthenticationHeader(this))
    },

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
            this.apiMessage = response.data.status
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
            this.apiMessage = response.data.status
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
            this.apiMessage = response.data.status
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
            this.apiMessage = response.data.status
            this.showMessage = true
            this.changing = false
            this.$emit('listServices')
        })
        .catch((errorResponse) => {
            this.changing = false
            alert(errorResponse.response.data.message)
        })
    },

  }
}
</script>
