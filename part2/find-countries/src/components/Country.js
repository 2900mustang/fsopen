import React, {useState, useEffect} from 'react';
import Weather from './Weather'
import countryServices from '../services/countries'

const Country = ({country}) => {
	const [weather, setWeather] = useState(null)

	const hook = () => {
		countryServices
			.getWeather(country.capital)
			.then(res => {
				setWeather(res.current)
			})
	}

	useEffect(hook, [])
	
	return (
		<div>
			<h2>{country.name}</h2>

			<div>capital: {country.capital}</div>

			<div>population: {country.population}</div>

			<h3>languages</h3>

			<ul>
				{country.languages.map(language => 
					<li key={language.iso639_2}>{language.name}</li>
				)}
			</ul>

			<div>
				<img src={country.flag} alt='flag' height='100' />
			</div>

			<h3>Weather in {country.capital}</h3>

			<Weather weather={weather} />
		</div>
	);
};

export default Country;