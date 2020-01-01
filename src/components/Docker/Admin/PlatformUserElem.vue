<template>
<div>
  <md-list-item md-expand :md-expanded.sync="expandNews">
    <md-icon>face</md-icon>
      <span class="md-list-item-text">{{platformUserObj.username}}</span>
      <md-list slot="md-expand">
        <md-list-item class="md-inset">
          <div class="actions">
            <md-button class="md-accent" @click="deleteUser"><md-icon>delete</md-icon></md-button>
            <md-button class="md-primary" @click="showEditDialog = true"><md-icon>edit</md-icon></md-button>
          </div>
        </md-list-item>
        <md-list-item class="md-inset">Сданные ответы: {{platformUserObj.passedFlags}}</md-list-item>
      </md-list>
  </md-list-item>
  <md-dialog :md-active.sync="showEditDialog">
    <md-dialog-title>Редактированние пользователя</md-dialog-title>
    <md-dialog-content>
        <form class="md-layout md-alignment-center-center" id="updateForm" name="updateForm" enctype="multipart/form-data">
            <md-field :class="getValidationClass('username')">
              <label for="username">Имя пользователя</label>
              <md-input type="username" name="username" id="username" autocomplete="username" v-model="form.username" :disabled="updating" />
              <span class="md-error" v-if="!$v.form.username.required">Укажите ваш логин</span>
              <span class="md-error" v-else-if="!$v.form.username.minlength">Неверный логин</span>
            </md-field>
            <md-field :class="getValidationClass('firstName')">
                <label for="firstName">Имя</label>
                <md-input name="firstName" id="firstName" autocomplete="given-name" v-model="form.firstName" :disabled="updating" />
                <span class="md-error" v-if="!$v.form.firstName.required">Укажите ваше имя</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Ошибка в указании имени</span>
            </md-field>
            <md-field :class="getValidationClass('lastName')">
                <label for="lastName">Фамилия</label>
                <md-input name="lastName" id="lastName" autocomplete="family-name" v-model="form.lastName" :disabled="updating" />
                <span class="md-error" v-if="!$v.form.lastName.required">Укажите вашу фамилию</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Ошибка в указании фамилии</span>
              </md-field>
            <md-field :class="getValidationClass('age')">
                <label for="age">Возраст</label>
                <md-input type="number" id="age" name="age" autocomplete="age" v-model="form.age" :disabled="updating" />
                <span class="md-error" v-if="!$v.form.age.required">Укажите возраст</span>
                <span class="md-error" v-else-if="!$v.form.age.maxlength">Ошибка в возрасте</span>
            </md-field>
            <md-field :class="getValidationClass('gender')">
                <label for="gender">Пол</label>
                <md-select name="gender" id="gender" v-model="form.gender" :disabled="updating">
                  <md-option value="M">М</md-option>
                  <md-option value="F">Ж</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.gender.required">>Укажите пол</span>
            </md-field>
            <md-checkbox v-model="changePass">Смена пароля</md-checkbox>
            <md-field :class="getValidationClass('password')">
                <label for="password">Новый пароль</label>
                <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password" :disabled="updating || !changePass" />
                <span class="md-error" v-if="!$v.form.password.required">Укажите новый пароль</span>
                <span class="md-error" v-else-if="!$v.form.password.minlength">Слишком короткий пароль</span>
            </md-field>
        </form>
    </md-dialog-content>

    <md-progress-bar md-mode="indeterminate" v-show="updating" />

    <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="checkUpdateForm" :disabled="updating">Сохранить</md-button>
        <md-button class="md-primary" @click="showEditDialog = false" :disabled="updating">Закрыть</md-button>
    </md-dialog-actions>
</md-dialog>
</div>        
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
    maxLength,
    requiredIf
  } from 'vuelidate/lib/validators'
  import Docker from '@/components/Docker'
  import Authentication from '@/components/Authentication'
  export default {
    mixins: [validationMixin],
    props: {
      platformUserObj: {
        type: Object,
        required: true
      }
    },
    name: 'ListOfUsers',
    data () {
      return {
        expandNews: false,
        expandSingle: false,
        updating: false,
        showEditDialog: false,
        changePass: false,
        form: {
          firstName: null,
          lastName: null,
          gender: null,
          age: null,
          username: null,
          password: null,
        },
      }
    },
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(64)
        },
        lastName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(64)
        },
        age: {
          required,
          maxLength: maxLength(2),
          maxLength: maxLength(64)
        },
        gender: {
          required
        },
        username: {
          maxLength: maxLength(2),
          maxLength: maxLength(64),
          required
        },
        password: {
          required: requiredIf(function() {return this.changePass} ), //стрелочные функции не работают
          minLength: minLength(6),
          maxLength: maxLength(64)
        } 
      }
    },
    beforeMount() {
      this.form.username = this.platformUserObj.username
      this.form.firstName = this.platformUserObj.firstName
      this.form.lastName = this.platformUserObj.lastName
      this.form.gender = this.platformUserObj.gender
      this.form.age = this.platformUserObj.age
      this.form.password = ""
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      checkUpdateForm () {
        this.$v.$reset()
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.$v.$reset() //?
          this.editUser()
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.age = null
        this.form.gender = null
        this.form.username = null
        this.form.password = null
      },
      deleteUser() {
        let user = {
            _id: this.platformUserObj._id,
            username: this.platformUserObj.username
        }
        Docker.deleteUser(Authentication.getAuthenticationHeader(this), user)
        .then((response) => {
            console.log(response.data)
            this.$emit('listUsers')
            this.$emit('showMessage', response.data.message)
        })
        .catch((errorResponse) => {
            alert(errorResponse.response.data.message)
        })
    },

      editUser() {
        let userToEdit = new FormData(document.getElementById('updateForm'))
        userToEdit.append('_id', this.platformUserObj._id)
        if (!this.changePass) userToEdit.delete("password")
        Docker.editUser(this, userToEdit, Authentication.getAuthenticationHeader(this))
      }
    }
  }
</script>

<style lang="scss" scoped>
  $list-width: 320px;

  .full-control {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
  }

  .list {
    width: $list-width;
  }
  .actions {
    display: inline;
  }
  .full-control > .md-list {
    width: $list-width;
    max-width: 100%;
    height: 400px;
    display: inline-block;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
    vertical-align: top;
  }

  .control {
    min-width: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }
</style>