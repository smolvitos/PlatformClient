<template>
    <div>
        <md-card md-with-hover> <!-- md-theme="custom-card" -->
            <md-card-header>
            <div class="md-layout md-gutter">
                <div class="md-layout md-layout-item"></div>
                <div class="md-layout md-layout-item">
                    <md-button :md-ripple="false" @click="showServiceDialog = true">{{ vm.vmName }}</md-button> <!-- Поменять местами-->
                </div>
                <div class="md-layout md-layout-item md-alignment-top-right">
                    <md-button class="md-icon-button" @click="showEditDialog = true">
                        <md-icon>edit</md-icon>
                    </md-button>
                </div>
            </div>
            <div class="md-subhead">{{ vm.vmIpHost }}</div>
            </md-card-header>

            <md-card-content>
            {{ vm.vmShortDescription }}
            </md-card-content>

            <md-card-actions>
            <md-button @click="deleteVm"> <!--//$emit('delete', service.baseImage, service.containerName, service.state)-->
                <md-icon>delete</md-icon>
                 <md-tooltip md-direction="top">Удалить ВМ</md-tooltip>
            </md-button>
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

        <md-dialog :md-active.sync="showEditDialog">
            <md-dialog-title>Редактированние ВМ</md-dialog-title>
            <md-dialog-content>
                <form class="md-layout md-alignment-center-center" id="updateFormVm" name="updateFormVm" enctype="multipart/form-data">
                    <md-field :class="getValidationClass('vmName')">
                        <label for="vmName">Название ВМ</label>
                        <md-input type="text" name="vmName" id="vmName" autocomplete="vmName" v-model="formVm.vmName" :disabled="updating" />
                        <span class="md-error" v-if="!$v.formVm.vmName.required">Укажите название ВМ</span>
                    </md-field>

                    <md-field :class="getValidationClass('vmShortDescription')">
                        <label for="vmShortDescription">Краткое описание ВМ</label>
                        <md-textarea type="text" name="vmShortDescription" id="vmShortDescription" autocomplete="vmShortDescription" v-model="formVm.vmShortDescription" :disabled="updating" />
                        <span class="md-error" v-if="!($v.formVm.vmShortDescription.maxLength)">Укажите краткое описание ВМ (не более 100 символов)</span>
                    </md-field>

                    <md-field :class="getValidationClass('vmDescription')">
                        <label for="vmDescription">Описание ВМ</label>
                        <md-textarea type="text" name="vmDescription" id="vmDescription" autocomplete="vmDescription" v-model="formVm.vmDescription" :disabled="updating" />
                        <span class="md-error" v-if="!$v.formVm.vmDescription.maxLength">Описание не должно превышать 10000 символов</span>
                    </md-field>

                    <md-field :class="getValidationClass('vmIpHost')">
                        <label for="vmIpHost">IP-адрес или hostname ВМ</label>
                        <md-input type="text" name="vmIpHost" id="vmIpHost" autocomplete="vmIpHost" v-model="formVm.vmIpHost" :disabled="updating" />
                        <span class="md-error" v-if="!$v.formVm.vmIpHost.required">Укажите IP-адрес или hostname ВМ</span>
                    </md-field>

                    <md-chips v-model="formVm.vmPorts" md-placeholder="Добавить порты"></md-chips>
                    <md-chips v-model="formVm.trueAnswers" md-placeholder="Правильные ответы"></md-chips>
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
      showMessage: false,
      apiMessage: null,
      messageDuration: 4000,
      messagePosition: 'center',
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

    updateVm() {
        let vmToUpdate = new FormData(document.getElementById('updateFormVm'))
        vmToUpdate.append('_id', this.vm._id)
        Docker.updateVm(this, vmToUpdate, Authentication.getAuthenticationHeader(this))
    },

    deleteVm() {
        let vm = {
            _id: this.vm._id,
            vmName: this.vm.vmName
        }
        this.changing = true
        Docker.deleteVm(Authentication.getAuthenticationHeader(this), vm)
        .then((response) => {
            console.log(response.data)
            this.$emit('listVms')
            this.$emit('showMessage', response.data.message)
        })
        .catch((errorResponse) => {
            this.changing = false
            alert(errorResponse.response.data.message)
        })
    },

  }
}
</script>
