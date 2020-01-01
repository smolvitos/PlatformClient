<template>
<div>
  <md-field id="checker-input" :class="getValidationClass('flag')">
    <label>Не забудьте про формат!</label>
    <md-input placeholder="Введите флаг" v-model="flag"></md-input>
    <span class="md-error" v-if="!($v.flag.required)">Укажите флаг!</span>
  </md-field>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-alignment-center-left md-size-5">
        <md-button class="md-accent md-raised" @click="checkFlag">Отправить</md-button>
    </div>
  </div> 
  <md-progress-bar md-mode="indeterminate" v-show="updating" />
</div>
</template>

<style>
    #checker-input {
        max-width: 50%;
    }
</style>

<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import Docker from '@/components/Docker'
  import Authentication from '@/components/Authentication'
  export default {
    name: 'FlagChecker',
    mixins: [validationMixin],
    validations: {
        flag: {
            required
        }
    },
    data: () => ({
      flag: null,
      updating: false
    }),
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
          this.flag = null
      },

      checkFlag () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.$v.$reset()
          this.sendFlag() 
        }
      },
      sendFlag() {
        let flagObj = {
            flag: this.flag
        }
        Docker.sendFlag(this, flagObj, Authentication.getAuthenticationHeader(this))
        .then((response) => {
            console.log(response.data)
            this.$emit('showMessage', response.data.message)
        })
        .catch((errorResponse) => {
            alert(errorResponse.response.data.message)
        })
      }
    }
  }

</script>