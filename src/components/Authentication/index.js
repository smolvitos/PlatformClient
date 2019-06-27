import getApi from '@/services/getApi'
import VueCookie from 'vue-cookie'

export default {
	user: {
		authenticated: false,
        isAdmin: false
	},

	authenticate(context, loginData) {
		//console.log(context.$cookie)
		let api = getApi()
		api.post('/login', loginData)
			.then((response) => {
				console.log(response)
				let { token, isAdmin } = response.data
				context.$cookie.set('token', token, 1)
                context.$cookie.set('isAdmin', isAdmin, 1)
				this.user.authenticated = true
                this.user.isAdmin = isAdmin
				context.sending = true
				setTimeout(() => {
					if (isAdmin) {
						context.$router.push({ path: '/mainpageadmin' })
					} else {
                        context.$router.push({ path: '/mainpageuser' })
                    }
				}, 1500)
			})
			.catch((errorResponse) => {
				context.sending = true
				setTimeout(() => {
					context.sending = false
					context.showMessage = true
					let { message } = errorResponse
					context.authMessage = message
					console.log(message)
				}, 1500)
			})
	},

	register(context, regesterData, redirect) {
		let api = getApi()
		api.post('/register', regesterData)
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
        const token = VueCookie.get('token')
        const isAdmin = VueCookie.get('isAdmin')
		token ? this.user.authenticated = true : this.user.authenticated = false
        isAdmin === 'true' ? this.user.isAdmin = true : this.user.isAdmin = false
        console.log(this.user)
	},

	getAuthenticationHeader (context) {
    	return `Bearer ${context.$cookie.get('token')}`
  	},

    logout (context) {
        context.$cookie.delete('token')
        context.$cookie.delete('isAdmin')
        context.$cookie.delete('ip')
        context.$cookie.delete('port')
        this.user.authenticated = false
        this.user.isAdmin = false
        window.location = window.location.origin
    },

	getSecret() {
		let api = getApi()
		return api.get('/')
	}
}