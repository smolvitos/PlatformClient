<template>
<div>
<md-tabs md-centered>
    <md-tab md-label="Виртуальные сервисы" md-icon="view_quilt">
        <div>
        <div class="md-layout">
                <div class="md-layout-item">
                    <md-button class="md-raised md-primary" @click="listServices">
                        Обновить
                        <md-tooltip md-direction="bottom">Обновить</md-tooltip>
                    </md-button>
                </div>
        </div><br />
        <md-divider /><br />
        <div class="md-layout" id="services">
                <DockerServicesItemUser
                v-for="(service, index) in services"
                :key="service.baseImage"
                :service="service"
                @listServices="listServices"
                />
        </div>
        </div>
    </md-tab>
    <md-tab md-label="Виртуальные машины" md-icon="computer">
        <div>
            <div class="md-layout">
                    <div class="md-layout-item">
                        <md-button class="md-raised md-primary" @click="listVms">
                            Обновить
                            <md-tooltip md-direction="bottom">Обновить</md-tooltip>
                        </md-button>
                    </div>
            </div><br />
            <md-divider /><br />
        </div>
        <div class="md-layout" id="vms">
            <VmServicesItemUser
                v-for="(vm, index) in vms"
                :key="vm.vmName"
                :vm="vm"
                @listVms="listVms"
                @showMessage="$emit('showMessage', $event)"
            />
        </div>
    </md-tab>
</md-tabs>
</div>
</template>

<style>
#services, vms {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: space-around
}

#update_button {
    width: 1000px;
}
</style>

<script>
import DockerServicesItemUser from '@/components/Docker/User/DockerServicesItem'
import VmServicesItemUser from '@/components/Docker/User/VmServicesItem'
import Docker from '@/components/Docker'
import Authentication from '@/components/Authentication'

export default {
  components: {
    DockerServicesItemUser, VmServicesItemUser
  },

  data: () => ({
    services: [],
    vms: []
  }),

  beforeMount () {
      this.listServices()
      this.listVms()
  },

  methods: {
    checkForKey (imageName) {
      alert(imageName)
    },

    listServices() {
        let token = Authentication.getAuthenticationHeader(this)
        Docker.emptyRequest(token)
        .then(() => {
            return Docker.listServices(token)
        })
        .then((services) => {
            this.services = services.data
        })
    },

    listVms() {
        let token = Authentication.getAuthenticationHeader(this)
        Docker.listVms(token)
        .then((vms) => {
            console.log(vms)
            this.vms = vms.data
        })
    }
  },

  name: 'DockerServicesUser'
}
</script>