import router from '@/router'
import Axios from 'axios'
import getApi from '@/services/getApi'

export default {
	loadDockerImage(context, dockerImage, token) {
		let api = getApi(token, true) // true для установки multipart/form-data
		context.sending = true
		api.post('/load', dockerImage)
			.then((response) => {
				console.log(response)
				context.sending = false
				context.clearForm()

				let { message } = response.data
				context.showResponse = true
				context.apiMessage = message
			})
			.catch((errorResponse) => {
				context.sending = false
				let { message } = errorResponse.response.data
				context.apiMessage = message
				context.showResponse = true
			})
	},

    updateService(context, serviceToUpdate, token) {
        let api = getApi(token, true) // true для установки multipart/form-data
        context.updating = true
        api.post('/api/v1/services/update', serviceToUpdate)
        .then((response) => {
            let { status } = response.data
            context.showEditDialog = false
            context.updating = false
            context.apiMessage = status
			context.showMessage = true
            context.$emit('listServices')
        })
        .catch((errorResponse) => {
            context.updating = false
            //console.log(errorResponse)
        })
    },

	listServices(token) {
		let api = getApi(token, false)
		return api.get('/api/v1/services/list')
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