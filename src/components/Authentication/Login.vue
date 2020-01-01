<template>
  <div class="md-layout md-alignment-center-center">
    <form novalidate class="md-layout md-alignment-center-center" @submit.prevent="validateAuthorizeUser">
      <md-card class="md-layout-item md-size-50">
        <md-card-header>
          <div class="md-title">Авторизация</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('username')">
            <label for="username">Имя пользователя</label>
            <md-input type="username" name="username" id="username" autocomplete="username" v-model="form.username" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.username.required">Укажите ваш логин</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Пароль</label>
            <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">Укажите ваш пароль</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-card-actions>
          <md-button class="md-icon-button" @click="showSettings = true">
            <md-icon>settings</md-icon>
          </md-button>
          <router-link to="/register"><md-button class="md-primary" :disabled="sending">Регистрация</md-button></router-link>
          &nbsp&nbsp&nbsp
          <md-button type="submit" class="md-primary md-raised" :disabled="sending">Войти</md-button>
        </md-card-actions>

      </md-card>

      <md-dialog :md-active.sync="showSettings">
      <md-dialog-title>Настройки</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="Подключение">
          <Settings 
            @closeSettings = "showSettings = false"
          />
        </md-tab>
      </md-tabs>
    </md-dialog>

      <md-snackbar :md-active.sync="showMessage" md-get-palette-color="red">{{ authMessage }}</md-snackbar> 
      
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
  } from 'vuelidate/lib/validators'
  import Authentication from '@/components/Authentication'
  import Settings from '@/components/Docker/Settings'
  export default {
    name: 'Login',
    mixins: [validationMixin], 
    components: {
        Settings
    },
    data: () => ({
      form: {
        username: null,
        password: null
      },
      user: {
        username: null,
        password: null
      },
      showMessage: false,
      sending: false,
      authMessage: null,
      showSettings: false
    }),
    validations: {
      form: {
        username: {
          required, 
        },
        password: {
          required,
        }
      },
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
        this.form.username = null
        this.form.password = null
        this.authMessage = null
      },
      authorizeUser () {
          let user = {
            username: this.form.username,
            password: this.form.password
          }
          Authentication.authenticate(this, user)
          
      },
      validateAuthorizeUser () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.authorizeUser()
        }
      }
    }
  }
</script>