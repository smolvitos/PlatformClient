<template>
<div>
  <form class="md-layout md-alignment-center-center" id="uploadForm" name="uploadForm" enctype="multipart/form-data">

          <md-field :class="getValidationClass('servicename')">
            <label for="servicename">Название сервиса</label>
            <md-input type="text" name="servicename" id="servicename" autocomplete="servicename" v-model="form.servicename" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.servicename.required">Укажите название сервиса</span>
          </md-field>

          <md-field :class="getValidationClass('description')">
            <label for="description">Описание сервиса</label>
            <md-textarea type="text" name="description" id="description" autocomplete="description" v-model="form.description" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.description.required">Укажите описание сервиса</span>
          </md-field>

<div class="md-layout md-gutter">
  <div class="md-layout-item md-size-30">
    <md-field :class="getValidationClass('imagefile')">
        <label>Docker образ</label>
        <md-file name="imagefile" v-model="imagefile" />
        <span class="md-error" v-if="!$v.imagefile.required">Укажите tar-архив с сервисом</span>
    </md-field>
  </div>
</div>
  <md-button class="md-raised md-accent" @click="checkFile">Загрузить на сервер</md-button>
  </form>
  <md-progress-bar md-mode="indeterminate" v-if="sending" />
</div>
</template>

<script>
  import Docker from '@/components/Docker'
  import Authentication from '@/components/Authentication'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

export default {
  name: 'loadImage',
  mixins: [validationMixin],
  data: () => ({
    form: {
      servicename: null,
      description: null
    },
    imagefile: null,
    sending: false
  }),
  validations: {
      form: {
        servicename: {
          required
        },
        description: {
          required
        }
      },
      imagefile: {
        required
      }
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
    sendFile () {
      const data = new FormData(document.getElementById('uploadForm'))
      Docker.loadDockerImage(this, data, Authentication.getAuthenticationHeader(this))
    },
    clearForm () {
        this.$v.$reset()
        this.form.servicename = null
        this.form.description = null
        this.imagefile = null
    },
    checkFile () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.sendFile() 
      }
    }
  }
}
</script>