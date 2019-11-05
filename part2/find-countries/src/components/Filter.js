import React from 'react';

const Filter = ({query, onQueryChange}) => {
	return (
		<div>
			<p>find countries</p> <input value={query} onChange={onQueryChange} />
		</div>
	);
};

export default Filter;