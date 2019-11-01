import React from 'react';

const Persons = ({persons}) => {
	const rows = () => persons.map(person => 
		<li key={person.name}>
			{person.name} {person.number}
		</li>	
	)

	return (
		<div>
			<ul>{rows()}</ul>
		</div>
	);
};

export default Persons;