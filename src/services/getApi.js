import axios from 'axios'

export default (token, isMultipart) => {
	let headers
	if (isMultipart) {
		headers = {
			'Authorization': token,
			'Content-type': 'multipart/form-data'
		}
	}
	return axios.create({
		baseURL: 'http://127.0.0.1:8081',
		headers
	})
}