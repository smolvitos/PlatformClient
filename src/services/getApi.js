import axios from 'axios'

export default (token, isMultipart) => {
	var headers = {
        'Content-type': null,
        Authorization: null
    }
	if (isMultipart) {
		headers['Content-type'] = 'multipart/form-data'
    }
    console.log(token + 'HUI')
    if (token) { 
        headers['Authorization'] = token
    }
    console.log(headers)
	return axios.create({
		baseURL: 'http://vps686120.ovh.net:8081',
		headers
	})
}