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

	getServices(token) {
		let api = getApi(token)
		return api.get('/api/v1/services/list')
	}
}