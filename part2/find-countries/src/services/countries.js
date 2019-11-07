import axios from 'axios'
const countryUrl = 'https://restcountries.eu/rest/v2/all'
const weatherUrl = 'http://api.weatherstack.com/current?access_key=7055d74b74e1c2ac05cfe312ca955cd5'

const getAll = () => {
	const req = axios.get(countryUrl)
	return req.then(res => res.data)
}

const getWeather = capital => {
	const req = axios.get(`${weatherUrl}&query=${capital}`)
	return req.then(res => res.data)
}

export default { getAll, getWeather }