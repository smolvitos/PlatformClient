<template>
  <div class="card-expansion">
    <md-card>
      <md-card-media>
        <!--<img src="/assets/profile.jpg" alt="People">-->
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{ userObj.firstName }} {{ userObj.lastName }}</div>
        <div class="md-subhead">{{ userObj.username }}</div>
      </md-card-header>

      <md-card-expand>
        <md-card-actions md-alignment="center">

          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
              <div class="elevation-demo">
                  <md-content class="md-elevation-5"><span class="md-subheading">Пол: {{ userObj.gender }} Возраст: {{ userObj.age }}</span></md-content>
                  <md-content class="md-elevation-5"><span class="md-subheading">Сданные флаги: {{ userObj.passedFlags }}</span></md-content>
              </div>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>
  </div>
</template>

<script>
  export default {
    props: {
        userObj: {
            required: true
        }
    },
    name: 'UserProfileElem'
  }
</script>

<style lang="scss" scoped>
  .card-expansion {
    height: 480px;
  }

  .md-card {
    width: 70%;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .elevation-demo {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
  }

  .md-content {
    width: 100%;
    min-height: 100px;
    margin: 24px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>