import React from 'react';

const Persons = ({persons, deletePerson}) => {
	const rows = () => persons.map(person => 
		<li key={person.id}>
			{person.name} {person.number} 
			<button onClick={deletePerson(person.id)}>delete</button>
		</li>	
	)

	return (
		<div>
			<ul>{rows()}</ul>
		</div>
	);
};

export default Persons;