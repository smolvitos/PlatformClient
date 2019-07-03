<template>
<md-tabs md-centered>
	  <md-tab md-label="Виртуальный сервис" md-icon="view_quilt">
        <DockerLoader 
            @showMessage="$emit('showMessage', $event)"
        />
	  </md-tab>
	  <md-tab md-label="Виртуальная машина" md-icon="computer">
		<VmLoader
            @showMessage="$emit('showMessage', $event)"
        />
	  </md-tab>

</md-tabs>
  
</template>

<script>
  import Docker from '@/components/Docker'
  import DockerLoader from '@/components/Docker/Admin/DockerLoader'
  import VmLoader from '@/components/Docker/Admin/VmLoader'
  import Authentication from '@/components/Authentication'
  import { validationMixin } from 'vuelidate'
  import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'loadImage',
  components: {
      DockerLoader, VmLoader
  },
  mixins: [validationMixin],
  data: () => ({
    form: {
      servicename: null,
      description: null,
      shortdescription: null
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
        this.form.shortdescription = null
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