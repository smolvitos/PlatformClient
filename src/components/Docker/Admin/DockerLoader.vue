<template>
<div>
<form class="md-layout md-alignment-center-center" id="uploadFormDocker" name="uploadFormDockerDocker" enctype="multipart/form-data">
   <md-field :class="getValidationClass('servicename')">
      <label for="servicename">Название сервиса</label>
      <md-input type="text" name="servicename" id="servicename" autocomplete="servicename" v-model="formDocker.servicename" :disabled="sending" />
      <span class="md-error" v-if="!$v.formDocker.servicename.required">Укажите название сервиса</span>
   </md-field>
   <md-field :class="getValidationClass('shortdescription')">
      <label for="shortdescription">Краткое описание сервиса</label>
      <md-textarea type="text" name="shortdescription" id="shortdescription" autocomplete="shortdescription" v-model="formDocker.shortdescription" :disabled="sending" />
      <span class="md-error" v-if="!($v.formDocker.shortdescription.required && $v.formDocker.shortdescription.maxLength)">Укажите краткое описание сервиса (не более 100 символов)</span>
   </md-field>
   <md-field :class="getValidationClass('description')">
      <label for="description">Описание сервиса</label>
      <md-textarea type="text" name="description" id="description" autocomplete="description" v-model="formDocker.description" :disabled="sending" />
      <span class="md-error" v-if="!$v.formDocker.description.required">Укажите описание сервиса</span>
   </md-field>
   <md-chips v-model="formDocker.trueAnswers" md-placeholder="Правильные ответы"></md-chips>
   <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-30">
         <md-field :class="getValidationClass('imagefile')">
            <label>Docker образ</label>
            <md-file name="imagefile" v-model="imagefile" />
            <span class="md-error" v-if="!$v.imagefile.required">Укажите tar-архив с сервисом</span>
         </md-field>
      </div>
   </div>
   <md-button class="md-raised md-accent" @click="checkFormDocker">Загрузить на сервер</md-button>
</form>
<md-progress-bar md-mode="indeterminate" v-if="sending" />
</div>
</template>

<script>
  import Docker from '@/components/Docker'
  import Authentication from '@/components/Authentication'
  import { validationMixin } from 'vuelidate'
  import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'DockerLoader',
  mixins: [validationMixin],
  data: () => ({
    formDocker: {
      servicename: null,
      description: null,
      shortdescription: null,
      trueAnswers: []
    },
    imagefile: null,
    sending: false
  }),
  validations: {
      formDocker: {
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
      imagefile: {
        required
      }
  },
  methods: {
    getValidationClass (fieldName) {
        const field = this.$v.formDocker[fieldName]
        const files = this.$v[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
    },
    sendFormDocker () {
      const data = new FormData(document.getElementById('uploadFormDocker'))
      data.append('trueAnswers', this.formDocker.trueAnswers)
      Docker.loadDockerImage(this, data, Authentication.getAuthenticationHeader(this))
    },
    clearFormDocker () {
        this.$v.$reset()
        this.formDocker.servicename = null
        this.formDocker.description = null
        this.formDocker.shortdescription = null
        this.formDocker.trueAnswers = []
        this.imagefile = null
    },
    checkFormDocker () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sendFormDocker() 
      }
    }
  }
}
</script>