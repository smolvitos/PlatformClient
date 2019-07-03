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
                <DockerServicesItemAdmin
                v-for="(service, index) in services"
                :key="service.baseImage"
                :service="service"
                @listServices="listServices"
                @showMessage="$emit('showMessage', $event)"
                />
        </div>
        </div>
      </md-tab>
      <md-tab md-label="Виртуальные машины" md-icon="computer">
      <div class="md-layout">
                <div class="md-layout-item">
                    <md-button class="md-raised md-primary" @click="listVms">
                        Обновить
                        <md-tooltip md-direction="bottom">Обновить</md-tooltip>
                    </md-button>
                </div>
      </div><br />
      <md-divider /><br />  
      <div class="md-layout" id="vms">
        <VmServicesItemAdmin
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
    align-content: space-around;
}
</style>

<script>
import DockerServicesItemAdmin from '@/components/Docker/Admin/DockerServicesItem'
import VmServicesItemAdmin from '@/components/Docker/Admin/VmServicesItem'
import Docker from '@/components/Docker'
import Authentication from '@/components/Authentication'

export default {
  components: {
    DockerServicesItemAdmin, VmServicesItemAdmin
  },

  data: () => ({
    services: [],
    vms: [],
    messageDuration: 4000,
    messagePosition: 'center',
    isMessageShow: false,
    apiMessage: 'Test'
  }),

  beforeMount () {
      this.listServices()
      this.listVms()
  },

  methods: {
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

  name: 'DockerServicesAdmin'
}
</script>