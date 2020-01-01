<template>
    <UserProfileElem 
        :userObj="userInfo"
    />
</template>
<script>
  import UserProfileElem from '@/components/Docker/User/UserProfileElem'
  import Docker from '@/components/Docker'
  import Authentication from '@/components/Authentication'
  export default {
    components: {
      UserProfileElem
    },
    name: 'UserProfile',
    beforeMount () {
      this.getUserInfo()
    },
    data () {
      return {
        userInfo: false
      }
    },
    methods: {
      getUserInfo() {
        let token = Authentication.getAuthenticationHeader(this)
        Docker.getUserInfo(token)
        .then((userInfo) => {
            this.userInfo = userInfo.data
        })
      }
    }
  }
</script>