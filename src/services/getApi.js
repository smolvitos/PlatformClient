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
		baseURL: 'http://vps686120.ovh.net:8081',
		headers
	})
}