import React from 'react';
import Country from './Country'

const Countries = ({countries, handleClick}) => {
	if (!countries.length) {
		return (
			<div>
				No such country in the distance.
			</div>
		)
	} else if (countries.length === 1) {
		return <Country country={countries[0]} />
	} else if (countries.length > 10) {
		return (
			<div>
				Too many matches. Are you sure you can visit all of them?
			</div>
		)
	}

	return (
		<ul>
			{countries.map(c =>
				<li key={c.alpha3Code}>
					{c.name}
					<button onClick={() => handleClick(c.name)}>reveal</button>
				</li>
			)}
		</ul>
	);
};

export default Countries;