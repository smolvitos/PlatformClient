<template>
<div>
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-80">
            <md-field :class="getValidationClass('hostname')"> 
                <label>IP-адрес сервера</label>
                <md-input v-model="hostname"></md-input>
                <span class="md-error" v-if="!($v.hostname.required)">Укажите правильный IP-адрес</span>
                <span class="md-helper-text">Например, 192.168.5.101</span>
            </md-field>
        </div>
        
        <div class="md-layout-item md-size-60">
            <md-field :class="getValidationClass('port')">
                <label>Порт</label>
                <md-input v-model="port"></md-input>
                <span class="md-error" v-if="!($v.port.required)">Укажите правильный порт</span>
                <span class="md-error" v-if="!($v.port.between)">Укажите порт в диапазоне 80-65500</span>
                <span class="md-helper-text">Например, 3000</span>
            </md-field>
        </div>
    </div>
    <br />

    <div class="md-layout md-gutter">
        <div class="md-layout-item md-alignment-center-left md-size-15">
            <md-button class="md-raised md-accent" @click="checkSettings">Сохранить</md-button>
        </div>
    </div> 
</div>

</template>
<script>
  import Docker from '@/components/Docker'
  import Authentication from '@/components/Authentication'
  import baseSettings from '@/services/baseSettings'
  import { validationMixin } from 'vuelidate'
  import { required, minLength, maxLength, between, ipAddress} from 'vuelidate/lib/validators'

export default {
  name: 'Settings',
  mixins: [validationMixin],
  data: () => ({
    hostname: null,
    port:  null
  }),
  validations: {
        hostname: {
            required,
        },
        port: {
            required,
            between: between(80, 65500)
        }
  },
  beforeMount() {
      this.hostname = this.$cookie.get('hostname') || window.location.hostname
      this.port = this.$cookie.get('port') || window.location.port
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
        this.$cookie.set('hostname', this.hostname, 1)
        this.$cookie.set('port', this.port, 1)
        this.$emit('closeSettings')
        this.$emit('showMessage', `Адрес API-сервера изменен на ${this.$cookie.get('hostname')}:${this.$cookie.get('port')}`)
    }
  }
}
</script>