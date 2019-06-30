import axios from 'axios'
import VueCookie from 'vue-cookie'

export default (token, isMultipart) => {
	var headers = {}
    var baseSettings = {}
    
    baseSettings.hostname = VueCookie.get('hostname') || baseSettings.ipAddress
    baseSettings.port = VueCookie.get('port') || baseSettings.port

	if (isMultipart) {
		headers['Content-type'] = 'multipart/form-data'
    }
    if (token) { 
        headers['Authorization'] = token
    }
    
	return axios.create({
		baseURL: `http://${baseSettings.hostname}:${baseSettings.port}`,
		headers
	})
}