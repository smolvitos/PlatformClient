<template>
<div>
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-30">
            <md-field :class="getValidationClass('ipAddress')">
                <label>IP-адрес сервера с Docker-сервисами</label>
                <md-input v-model="ipAddress"></md-input>
                <span class="md-error" v-if="!($v.ipAddress.required)">Укажите правильный IP-адрес</span>
                <span class="md-helper-text">Например, 192.168.5.101</span>
            </md-field>
        </div>
        
        <div class="md-layout-item md-size-20">
            <md-field :class="getValidationClass('port')">
                <label>Порт</label>
                <md-input v-model="port"></md-input>
                <span class="md-error" v-if="!($v.port.required)">Укажите правильный порт</span>
                <span class="md-helper-text">Например, 3000</span>
            </md-field>
        </div>
    </div>
    <br />
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-alignment-center-left md-size-20">
            <md-button class="md-raised md-accent" @click="checkSettings">Сохранить</md-button>
        </div>
    </div>
    <md-dialog-alert
      :md-active.sync="isSaved"
      md-content="Параметры системы изменены"
      md-confirm-text="Ок" 
    />
</div>

</template>

<script>
  import Docker from '@/components/Docker'
  import Authentication from '@/components/Authentication'
  import baseSettings from '@/services/baseSettings'
  import { validationMixin } from 'vuelidate'
  import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'Settings',
  mixins: [validationMixin],
  data: () => ({
    ipAddress: null,
    port:  null,
    isSaved: false
  }),
  validations: {
        ipAddress: {
            required
        },
        port: {
            required
        }
  },
  beforeMount() {
      this.ipAddress = this.$cookie.get('ip') || baseSettings.ipAddress
      this.port = this.$cookie.get('port') || baseSettings.port
  },
  methods: {
    getValidationClass (fieldName) {
        const field = this.$v[fieldName]

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

    checkSettings () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveSettings() 
      }
    },

    saveSettings() {
        this.$cookie.set('ip', this.ipAddress, 1)
        this.$cookie.set('port', this.port, 1)
        this.isSaved = true
    }
  }
}
</script>