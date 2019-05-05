import router from '@/router'
import Axios from 'axios'

export default {
	loadDockerImage(context, dockerImage, token) {
		let axios = Axios.create({
			baseURL: 'http://192.168.1.3:8081',
			headers: {
        		'Authorization': token,
        		'Content-type': 'multipart/form-data'
    		}
		})
		context.sending = true
		axios.post('/load', dockerImage)
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
	}
}