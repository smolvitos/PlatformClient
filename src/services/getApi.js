import axios from 'axios'
import VueCookie from 'vue-cookie'
import baseSettings from '@/services/baseSettings'

export default (token, isMultipart) => {
	var headers = {}
    let baseIP = VueCookie.get('ip') || baseSettings.ipAddress
    let basePort = VueCookie.get('port') || baseSettings.port

	if (isMultipart) {
		headers['Content-type'] = 'multipart/form-data'
    }
    if (token) { 
        headers['Authorization'] = token
    }
    
	return axios.create({
		baseURL: `http://${baseIP}:${basePort}`,
		headers
	})
}