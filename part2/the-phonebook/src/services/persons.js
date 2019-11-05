import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'

const getAll = () => {
	const req = axios.get(baseUrl)
	return req.then(res => res.data)
}

const create = newObj => {
	const req = axios.post(baseUrl, newObj)
	return req.then(res => res.data)
}

const remove = id => {
	const req = axios.put(`${baseUrl}/${id}`)
	return
}

export default { getAll, create, remove }