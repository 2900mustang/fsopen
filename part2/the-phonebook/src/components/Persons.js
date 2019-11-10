import React from 'react';

const Persons = ({filter, persons, deletePersonOf}) => {
	const newPersons = filter.length ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

	return (
		<ul>
			{newPersons.map(person => 
				<li key={person.name}>
					{person.name} {person.number} 
					<button onClick={() => deletePersonOf(person.id)}>delete</button>
				</li>	
			)}
			{/* {rows()} */}
		</ul>
	);
};

export default Persons;