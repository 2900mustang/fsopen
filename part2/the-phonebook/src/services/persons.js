import axios from 'axios'
const baseUrl = '/api/contacts'

const getAll = () => {
	const req = axios.get(baseUrl)
	return req.then(res => res.data)
}

const create = newObj => {
	const req = axios.post(baseUrl, newObj)
	return req.then(res => res.data)
}

const remove = id => {
	const req = axios.delete(`${baseUrl}/${id}`)
	return req.then(res => res.data)
}

const replace = (person) => {
	const req = axios.put(`${baseUrl}/${person.id}`, person)
	return req.then(res => {
		return res.data
	})
}

export default { getAll, create, remove, replace }