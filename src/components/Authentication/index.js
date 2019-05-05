import router from '@/router'
import api from '@/services/api'

export default {
	user: {
		authenticated: false
	},

	authenticate(context, loginData, redirect) {
		api().post('/login', loginData)
			.then((response) => {
				console.log(response)
				let { token } = response.data
				context.$cookie.set('token', token, 1)
				this.user.authenticated = true
				//console.log(this.user.authenticated)
				context.sending = true
				setTimeout(() => {
					if (redirect) {
						context.$router.push(redirect)
					}
				}, 1500)
			})
			.catch((errorResponse) => {
				context.sending = true
				setTimeout(() => {
					context.sending = false
					context.showMessage = true
					let { message } = errorResponse.response.data
					context.authMessage = message
					console.log(message)
				}, 1500)
			})
	},

	register(context, regesterData, redirect) {
		api().post('/register', regesterData)
			.then((response) => {
				console.log(response)
				let { message } = response.data
				context.sending = true

				let waitPromise = new Promise((resolve, reject) => {
					setTimeout(() => {
							context.sending = false
							context.showMessage = true
							context.registerMessage = `${message}. You will redirect to /login page`
							setTimeout(() => {
								resolve()
							}, 2000)
					}, 1500)
				})

				waitPromise
					.then(() => {
						if (redirect) {
							context.$router.push(redirect)
						}
					})
			})
			.catch((errorResponse) => {
				context.sending = true
				setTimeout(() => {
					context.sending = false
					context.showMessage = true
					let { message } = errorResponse.response.data
					context.registerMessage = message
					console.log(message)
				}, 1500)
			})
	},

	checkAuthentication() {
		const token = document.cookie

		if (token) this.user.authenticated = true
		else this.user.authenticated = false
		console.log(this.user.authenticated)
	},

	getAuthenticationHeader (context) {
    	return `Bearer ${context.$cookie.get('token')}`
  	},

	getSecret() {
		return api().get('/')
	}
}