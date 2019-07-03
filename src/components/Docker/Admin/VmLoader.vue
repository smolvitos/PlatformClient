<template>
<div>
<form class="md-layout md-alignment-center-center" id="uploadFormVm" name="uploadFormVm" enctype="multipart/form-data">
   <md-field :class="getValidationClass('vmName')">
      <label for="vmName">Название ВМ</label>
      <md-input type="text" name="vmName" id="vmName" autocomplete="vmName" v-model="formVm.vmName" :disabled="sending" />
      <span class="md-error" v-if="!$v.formVm.vmName.required">Укажите название ВМ</span>
   </md-field>

   <md-field :class="getValidationClass('vmShortDescription')">
      <label for="vmShortDescription">Краткое описание ВМ</label>
      <md-textarea type="text" name="vmShortDescription" id="vmShortDescription" autocomplete="vmShortDescription" v-model="formVm.vmShortDescription" :disabled="sending" />
   </md-field>

   <md-field :class="getValidationClass('vmDescription')">
      <label for="vmDescription">Описание ВМ</label>
      <md-textarea type="text" name="vmDescription" id="vmDescription" autocomplete="vmDescription" v-model="formVm.vmDescription" :disabled="sending" />
   </md-field>

   <md-field :class="getValidationClass('vmIpHost')">
      <label for="vmIpHost">IP-адрес или hostname ВМ</label>
      <md-input type="text" name="vmIpHost" id="vmIpHost" autocomplete="vmIpHost" v-model="formVm.vmIpHost" :disabled="sending" />
      <span class="md-error" v-if="!$v.formVm.vmIpHost.required">Укажите IP-адрес или hostname ВМ</span>
   </md-field>

   <md-chips v-model="formVm.vmPorts" md-placeholder="Добавить порты"></md-chips>
   <md-chips v-model="formVm.trueAnswers" md-placeholder="Правильные ответы"></md-chips>
   
   <md-button class="md-raised md-accent" @click="checkFormVm">Загрузить на сервер</md-button>
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
  name: 'VmLoader',
  mixins: [validationMixin],
  data: () => ({
    formVm: {
      vmName: null,
      vmIpHost: null,
      vmPorts: [],
      trueAnswers: [],
      vmShortDescription: null,
      vmDescription: null
    },
    sending: false
  }),
  validations: {
      formVm: {
        vmName: {
          required
        },
        vmIpHost: {
            required
        }
      }
  },
  methods: {
    getValidationClass (fieldName) {
        const field = this.$v.formVm[fieldName]
        const files = this.$v[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
    },
    sendFormVm () {
      const data = new FormData(document.getElementById('uploadFormVm'))
      data.append('trueAnswers', this.formVm.trueAnswers)
      data.append('vmPorts', this.formVm.vmPorts)
      Docker.loadVm(this, data, Authentication.getAuthenticationHeader(this))
    },
    clearFormVm () {
        this.$v.$reset()
        this.formVm.vmName = null
        this.formVm.vmIpHost = null
        this.formVm.vmPorts = []
        this.formVm.trueAnswers = []
        this.formVm.vmShortDescription = null
        this.formVm.vmDescription = null
    },
    checkFormVm () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sendFormVm() 
      }
    }
  }
}
</script>