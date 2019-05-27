import api from '@/services/api'

export default {
	login(context, loginData, redirect) {
		api().post('/login', loginData)
			.then((response) => {
				let { token } = response.data
				context.$cookie.set('token', token, '1D')
				context.sending = true
				setTimeout(() => {
					if (redirect) {
						context.$router.push(redirect)
					}
				}, 1500)
			})
			.catch((error) => {
				context.showMessage = true
				context.authMassage = 'Something wrong!'
				console.log(error)
			})
	},
	register(registerData) {
		return api().post('/register', registerData)
	},
	getSecret() {
		return api().get('/')
	}
}