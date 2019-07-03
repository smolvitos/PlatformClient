<template>
   <div>
      <md-tabs md-centered>
         <md-tab md-label="Виртуальный сервис" md-icon="view_quilt">
            <form class="md-layout md-alignment-center-center" id="uploadFormDocker" name="uploadFormDocker" enctype="multipart/form-data">
               <md-field :class="getValidationClassDocker('servicename')">
                  <label for="servicename">Название сервиса</label>
                  <md-input type="text" name="servicename" id="servicename" autocomplete="servicename" v-model="formDocker.servicename" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.docker.servicename.required">Укажите название сервиса</span>
               </md-field>
               <md-field :class="getValidationClassDocker('shortdescription')">
                  <label for="shortdescription">Краткое описание сервиса</label>
                  <md-textarea type="text" name="shortdescription" id="shortdescription" autocomplete="shortdescription" v-model="formDocker.shortdescription" :disabled="sending" />
                  <span class="md-error" v-if="!($v.form.docker.shortdescription.required && $v.form.docker.shortdescription.maxLength)">Укажите краткое описание сервиса (не более 100 символов)</span>
               </md-field>
               <md-field :class="getValidationClassDocker('description')">
                  <label for="description">Описание сервиса</label>
                  <md-textarea type="text" name="description" id="description" autocomplete="description" v-model="formDocker.description" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.docker.description.required">Укажите описание сервиса</span>
               </md-field>
               <md-chips v-model="formDocker.trueAnswers" md-placeholder="Правильные ответы"></md-chips>
               <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-30">
                     <md-field :class="getValidationClassDocker('imagefile')">
                        <label>Docker образ</label>
                        <md-file name="imagefile" v-model="imagefile" />
                        <span class="md-error" v-if="!$v.imagefile.required">Укажите tar-архив с сервисом</span>
                     </md-field>
                  </div>
               </div>
               <md-button class="md-raised md-accent" @click="checkDocker">Загрузить на сервер</md-button>
            </form>
         </md-tab>

         <md-tab md-label="Виртуальная машина (ВМ)" md-icon="computer">
            <form class="md-layout md-alignment-center-center" id="uploadFormVm" name="uploadFormVm" enctype="multipart/form-data">
               <md-field :class="getValidationClassVm('vmName')">
                  <label for="vmName">Название ВМ</label>
                  <md-input type="text" name="vmName" id="vmName" autocomplete="vmName" v-model="formVm.vmName" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.vm.vmName.required">Укажите название ВМ</span>
               </md-field>
               <md-field :class="getValidationClassVm('vmIpHost')">
                  <label for="vmIpHost">IP-адрес или hostname ВМ</label>
                  <md-input type="text" name="vmIpHost" id="vmIpHost" autocomplete="vmIpHost" v-model="formVm.vmIpHost" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.vm.vmIpHost.required">Укажите IP или hostname ВМ</span>
               </md-field>
               <md-field :class="getValidationClassVm('vmPort')">
                  <label for="vmPort">Порт (80-65500)</label>
                  <md-input type="text" name="vmPort" id="vmPort" autocomplete="vmPort" v-model="formVm.vmPort" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.vm.vmPort.required">Укажите порт</span>
                  <span class="md-error" v-if="!($v.form.vm.vmPort.between)">Укажите порт в диапазоне 80-65500</span>
               </md-field>
               <md-field :class="getValidationClassVm('vmShortDescription')">
                  <label for="vmShortDescription">Краткое описание ВМ</label>
                  <md-textarea type="text" name="vmShortDescription" id="vmShortDescription" autocomplete="vmShortDescription" v-model="formVm.vmShortDescription" :disabled="sending" />
                  <span class="md-error" v-if="!($v.form.vm.vmShortDescription.required && $v.form.vm.vmShortDescription.maxLength)">Укажите краткое описание ВМ (не более 100 символов)</span>
               </md-field>
               <md-field :class="getValidationClassVm('vmDescription')">
                  <label for="vmDescription">Описание ВМ</label>
                  <md-textarea type="text" name="vmDescription" id="vmDescription" autocomplete="vmDescription" v-model="formVm.vmDescription" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.vm.vmDescription.required">Укажите описание ВМ</span>
               </md-field>
               <md-chips v-model="formVm.trueAnswers" md-placeholder="Правильные ответы"></md-chips>
               <md-button class="md-raised md-accent" @click="checkVm">Загрузить на сервер</md-button>
            </form>
         </md-tab>
      </md-tabs>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      <md-snackbar :md-duration="messageDuration" :md-position="messagePosition" :md-active.sync="showResponse">
         <span>{{ apiMessage }}</span>
      </md-snackbar>
   </div>
</template>

<script>
  import Docker from '@/components/Docker'
  import Authentication from '@/components/Authentication'
  import { validationMixin } from 'vuelidate'
  import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'

export default {
  name: 'loadImage',
  mixins: [validationMixin],
  data: () => ({
    formDocker: {
      servicename: null,
      description: null,
      shortdescription: null,
      trueAnswers: []
    },
    formVm: {
        vmName: null,
        vmIpHost: null,
        vmPort: null,
        vmShortDescription: null,
        vmDescription: null,
        trueAnswers: []
    },
    
    imagefile: null,
    sending: false,
    showResponse: false,
    apiMessage: null,
    messageDuration: 4000,
    messagePosition: 'center'
  }),
  validations: {
      form: {
          docker: {
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
          },
          vm: {
              vmName: {
                required
              },
              vmIpHost: {
                required
              },
              vmPort: {
                required,
                between: between(80, 65500)
              },
              vmShortDescription: {
                required,
                maxLength: maxLength(100)
              },
              vmDescription: {
                required
              }
            }
      },
      imagefile: {
        required
      }
  },
  methods: {
    getValidationClassDocker (fieldName) {
        const field = this.$v.form.docker[fieldName]
        const files = this.$v[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
    },
    getValidationClassVm (fieldName) {
        const field = this.$v.form.vm[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
    },
    sendDocker () {
      const data = new FormData(document.getElementById('uploadFormDocker'))
      data.append('trueAnswers', this.trueAnswers)
      Docker.loadDockerImage(this, data, Authentication.getAuthenticationHeader(this))
    },
    sendVm () {
      const data = new FormData(document.getElementById('uploadFormVm'))
      data.append('trueAnswers', this.trueAnswers)
      Docker.loadVm(this, data, Authentication.getAuthenticationHeader(this))
    },
    clearForm () {
        this.$v.$reset()
        this.formDocker.servicename = null
        this.formDocker.description = null
        this.formDocker.shortdescription = null
        this.formDocker.trueAnswers = []
        this.imagefile = null
        this.formVm.vmName = null
        this.formVm.vmIpHost = null
        this.formVm.vmPort = null
        this.formVm.vmShortDescription = null
        this.formVm.vmDescription = null
        this.formVm.trueAnswers = []
    },
    checkDocker () {
      this.$v.form.docker.$touch()

      if (!this.$v.form.docker.$invalid) {
        this.sendDocker(this.$v.form.docker) 
      }
    },
    checkVm () {
      this.$v.form.vm.$touch()
        console.log(this.$v.form.vm)
      if (!this.$v.form.vm.$invalid) {
        this.sendVm() 
      }
    }
  }
}
</script>