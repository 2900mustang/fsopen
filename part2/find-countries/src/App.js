import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Filter from './components/Filter'
const log = console.log

const App = () => {
	const [allCountries, setAllCountries] = useState([])
	const [displayCountries, setDisplayCountries] = useState(allCountries)
	const [query, setQuery] = useState('')

	const hook = () => {
		axios.get('https://restcountries.eu/rest/v2/all').then(res => {
			setAllCountries(res.data)
		})
		// axios.get('https://restcountries.eu/rest/v2/name/hin').then(res => {
		// 	log(res.data)
		// })
	}
	
	useEffect(hook, [])

	const filteredResult = query ? allCountries.filter(country => 
		country.name.toLowerCase().includes(query.toLowerCase())
	) : allCountries

	if (filteredResult.length !== allCountries.length) {
		if (filteredResult.length < 10) {
			setDisplayCountries(filteredResult)
		} else {
			setDisplayCountries('Too many matches, specify another filter')
		}
	}

	log(displayCountries)
	const display = () => {
		displayCountries.map(country => 
			<li>{country.name}</li>)
	}

	const handleQueryChange = (event) => {
		setQuery(event.target.value)
	}

	return (
		<div>
			<Filter query={query} onQueryChange={handleQueryChange} />
			<ul>{display()}</ul>
		</div>
	);
};

export default App;