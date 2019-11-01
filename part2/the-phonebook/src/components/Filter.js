import React from 'react';

const Filter = (props) => {
	const filter = props.persons.filter(person => 
		person.name.toLowerCase() === props.filterName.toLowerCase()
	)
	const filtered = filter.length ? filter[0].name : ''
	
	return (
		<div>
			filter shown with <input value={props.filterName} onChange={props.handleFilterName} />
			<div>{filtered}</div>
		</div>
	);
};

export default Filter;