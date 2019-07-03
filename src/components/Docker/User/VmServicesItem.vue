<template>
    <div>
        <md-card md-with-hover> <!-- md-theme="custom-card" -->
            <md-card-header>
                <md-button :md-ripple="false" @click="showServiceDialog = true">{{ vm.vmName }}</md-button>
            <div class="md-subhead">{{ vm.vmIpHost }}</div>
            </md-card-header>

            <md-card-content>
            {{ vm.vmShortDescription }}
            </md-card-content>
            <md-button class="md-fab md-mini md-primary" @click="showServiceDialog = true">
                <md-tooltip md-direction="top">Информация</md-tooltip>
            <md-icon>info</md-icon>
            </md-button>

            <md-card-actions>
            </md-card-actions>
            
        </md-card>

        <md-progress-bar md-mode="indeterminate" v-show="changing" />

        <md-dialog :md-active.sync="showServiceDialog">
            <md-dialog-title>{{ vm.vmName }}</md-dialog-title>
            <md-dialog-content>
                <span class="md-caption">Краткое описание</span>
                <span class="md-body-1">{{ vm.vmShortDescription }}</span>

                <span class="md-caption">Полное описание</span>
                <span class="md-body-1">{{ vm.vmDescription }}</span>

                <span class="md-caption">Доступ</span>
                <span class="md-body-1">{{ vm.vmIpHost }} {{ vm.vmPorts }}</span>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="showServiceDialog = false">Закрыть</md-button>
            </md-dialog-actions>
        </md-dialog>
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
      min-width: 350px;
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
  name: 'VmServicesItemAdmin',
  mixins: [validationMixin],
  props: {
    vm: {
      type: Object,
      required: true
    }
  },
  data: () => ({
      changing: false,
      updating: false,
      showServiceDialog: false,
      showEditDialog: false,
      formVm: {
        vmName: null,
        vmIpHost: null,
        vmPorts: [],
        trueAnswers: [],
        vmShortDescription: null,
        vmDescription: null
      },
  }),

  validations: {
      formVm: {
        vmName: {
          required
        },
        vmDescription: {
          maxLength: maxLength(10000)
        },
        vmShortDescription: {
            maxLength: maxLength(100)
        },
        vmIpHost: {
            required
        }
      }
  },

  beforeMount() {
    this.formVm.vmName = this.vm.vmName
    this.formVm.vmDescription = this.vm.vmDescription
    this.formVm.vmShortDescription = this.vm.vmShortDescription
    this.formVm.vmIpHost = this.vm.vmIpHost
    this.formVm.vmPorts = this.vm.vmPorts
    this.formVm.trueAnswers = this.vm.trueAnswers
  },

  methods: {
    getValidationClass (fieldName) {
        const field = this.$v.formVm[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
    },

    clearForm () {
        this.$v.$reset()
        this.formVm.vmName = null
        this.formVm.vmDescription = null
        this.formVm.vmShortDescription = null
        this.formVm.vmIpHost = null
        this.formVm.vmPorts = []
    },

    checkUpdateForm () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.updateVm()
      }
    },
  }
}
</script>
