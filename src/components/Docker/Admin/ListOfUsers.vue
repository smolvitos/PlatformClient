<template>
  <div class="full-control">
    <div class="list">
      <PlatformUserElem
        v-for="(user, index) in users"
        :key="user.id"
        :platformUserObj="user"
        @listUsers="listUsers"
        @showMessage="$emit('showMessage', $event)"
      />
    </div>
  </div>
</template>

<script>
  import PlatformUserElem from '@/components/Docker/Admin/PlatformUserElem'
  import Docker from '@/components/Docker'
  import Authentication from '@/components/Authentication'
  export default {
    components: {
      PlatformUserElem
    },
    name: 'ListOfUsers',

    beforeMount () {
      this.listUsers()
    },
    data () {
      return {
        expandNews: false,
        expandSingle: false,
        users: []
      }
    },
    methods: {
      listUsers() {
        let token = Authentication.getAuthenticationHeader(this)
        Docker.listUsers(token)
        .then((users) => {
            this.users = users.data
        })
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
    width: 100%;
    list-style-type: none;
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
    min-width: 250px;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }
</style>