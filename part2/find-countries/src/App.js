import React, {useEffect, useState} from 'react';
import countryServices from './services/countries'
import Search from './components/Search'
import Countries from './components/Countries'
const log = console.log

const App = () => {
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState('chez')

	const hook = () => {
		countryServices
			.getAll().then(allCountries => setCountries(allCountries))
	}

	useEffect(hook, [])

	const countriesToShow = search.length ? countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase())) : countries

	const handleChange = event => setSearch(event.target.value)

	return (
		<div>
			<div>
				<Search value={search} onChange={handleChange} />
				<Countries countries={countriesToShow} handleClick={(e) => setSearch(e)} />
			</div>
		</div>
	);
};

export default App;