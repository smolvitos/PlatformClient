import router from '@/router'
import Axios from 'axios'
import getApi from '@/services/getApi'

export default {
	loadDockerImage(context, dockerImage, token) {
		let api = getApi(token, true) // true для установки multipart/form-data
		context.sending = true
		api.post('/loaddocker', dockerImage)
			.then((response) => {
				console.log(response)
				context.sending = false
				context.clearFormDocker()

				let { message } = response.data
				context.$emit('showMessage', message)
			})
			.catch((errorResponse) => {
				context.sending = false
				let { message } = errorResponse.response.data
				context.$emit('showMessage', message)
			})
	},

    loadVm(context, vm, token) {
        let api = getApi(token, true) // true для установки multipart/form-data
		context.sending = true
		api.post('/loadvm', vm)
			.then((response) => {
				console.log(response)
				context.sending = false
				context.clearFormVm()

				let { message } = response.data
				context.$emit('showMessage', message)
			})
			.catch((errorResponse) => {
				context.sending = false
				let { message } = errorResponse.response.data
				context.$emit('showMessage', message)
			})
    },

    updateVm (context, vmToUpdate, token) {
        let api = getApi(token, true) // true для установки multipart/form-data
        context.updating = true
        api.post('/api/v1/vms/update', vmToUpdate)
        .then((response) => {
            let { message } = response.data
            context.showEditDialog = false
            context.updating = false
            context.$emit('listVms')
            context.$emit('showMessage', message)
        })
        .catch((errorResponse) => {
            context.updating = false
            let { message } = errorResponse.response.data
            context.$emit('showMessage', message)
        })
    },

    deleteVm (token, vm) {
        let api = getApi(token)
        return api.post('/api/v1/vms/delete', vm)
    },

    updateService(context, serviceToUpdate, token) {
        let api = getApi(token, true) // true для установки multipart/form-data
        context.updating = true
        api.post('/api/v1/services/update', serviceToUpdate)
        .then((response) => {
            let { message } = response.data
            context.showEditDialog = false
            context.updating = false
            context.$emit('listServices')
            context.$emit('showMessage', message)
        })
        .catch((errorResponse) => {
            context.updating = false
        })
    },

	listServices(token) {
		let api = getApi(token, false)
		return api.get('/api/v1/services/list')
	},

    listUsers(token) {
		let api = getApi(token, false)
		return api.get('/api/v1/users/list')
	},
    deleteUser(token, user) {
        let api = getApi(token, false)
		return api.post('/api/v1/users/delete', user)
    },
    editUser (context, userToEdit, token) {
        let api = getApi(token, true) // true для установки multipart/form-data
        context.updating = true
        api.post('/api/v1/users/edit', userToEdit)
        .then((response) => {
            let { message } = response.data
            context.showEditDialog = false
            context.updating = false
            context.$emit('listUsers')
            context.$emit('showMessage', message)
        })
        .catch((errorResponse) => {
            context.updating = false
            let { message } = errorResponse.response.data
            context.$emit('showMessage', message)
        })
    },

    getUserInfo(token) { //в данном случае нужен только токен, по нему определится username, подменить его нельзя
        let api = getApi(token, false)
		return api.get('/api/v1/users/getuserinfo')
    },

    sendFlag(context, flagToCheck, token) {
        let api = getApi(token, false) // true для установки multipart/form-data
        context.updating = true
        api.post('/api/v1/users/checkflag', flagToCheck)
        .then((response) => {
            let { message } = response.data
            context.updating = false
            context.$emit('showMessage', message)
        })
        .catch((errorResponse) => {
            context.updating = false
            let { message } = errorResponse.response.data
            context.$emit('showMessage', message)
        })
    },

    listVms(token) {
        let api = getApi(token, false)
		return api.get('/api/v1/vms/list')
    },

    startService(token, service) {
        let api = getApi(token)
        return api.post('/api/v1/services/start', service)
    },

    pauseService(token, service) {
        let api = getApi(token)
        return api.post('/api/v1/services/pause', service)
    },

    stopService(token, service) {
        let api = getApi(token)
        return api.post('/api/v1/services/stop', service)
    },

    deleteService(token, service) {
        let api = getApi(token)
        return api.post('/api/v1/services/delete', service)
    },

    emptyRequest(token) {
        let api = getApi(token)
        return api.get('/api/v1/services/list')
    }
}