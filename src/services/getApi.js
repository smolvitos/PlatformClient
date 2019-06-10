import axios from 'axios'

export default (token, isMultipart) => {
	var headers = {}

	if (isMultipart) {
		headers['Content-type'] = 'multipart/form-data'
    }
    if (token) { 
        headers['Authorization'] = token
    }
    //console.log(headers)
	return axios.create({
		baseURL: 'http://vps686120.ovh.net:8081',
		headers
	})
}