<template>
  <div class="md-layout md-alignment-center-center">
    <form novalidate class="md-layout md-alignment-center-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50">
        <md-card-header>
          <div class="md-title">Регистрация</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">Имя</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">Укажите ваше имя</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Ошибка в указании имени</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Фамилия</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">Укажите вашу фамилию</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Ошибка в указании фамилии</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('gender')">
                <label for="gender">Пол</label>
                <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
                  <md-option></md-option>
                  <md-option value="M">М</md-option>
                  <md-option value="F">Ж</md-option>
                </md-select>
                <span class="md-error">Укажите пол</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('age')">
                <label for="age">Возраст</label>
                <md-input type="number" id="age" name="age" autocomplete="age" v-model="form.age" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.age.required">Укажите возраст</span>
                <span class="md-error" v-else-if="!$v.form.age.maxlength">Ошибка в указании возраста</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('username')">
            <label for="username">Имя пользователя</label>
            <md-input type="username" name="username" id="username" autocomplete="username" v-model="form.username" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.username.required">Укажите ваш логин</span>
            <span class="md-error" v-else-if="!$v.form.username.minlength">Неверный логин</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Пароль</label>
            <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">Укажите ваш пароль</span>
            <span class="md-error" v-else-if="!$v.form.password.minlength">Слишком короткий пароль</span>
          </md-field>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <router-link to="/login"><md-button class="md-primary" :disabled="sending" href="/login">Авторизоваться</md-button></router-link>
          &nbsp&nbsp&nbsp
          <md-button type="submit" class="md-primary md-raised" :disabled="sending">Создать пользователя</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="showMessage" md-duration="10000">{{ registerMessage }}</md-snackbar>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
  import Authentication from '@/components/Authentication'

  export default {
    name: 'Register',
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstName: null,
        lastName: null,
        gender: null,
        age: null,
        username: null,
        password: null,
      },
      showMessage: false,
      sending: false,
      registerMessage: null,
      message: null
    }),
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        age: {
          required,
          maxLength: maxLength(3)
        },
        gender: {
          required
        },
        username: {
          required
        },
        password: {
          required,
          maxLength: minLength(5)
        }
      }
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
      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.age = null
        this.form.gender = null
        this.form.username = null
        this.form.password = null
      },
      async saveUser () {
        this.sending = true

        let user = {
          username: this.form.username,
          password: this.form.password,
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          age: this.form.age,
          gender: this.form.gender
        }
        
        Authentication.register(this, user, '/login')
        
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>