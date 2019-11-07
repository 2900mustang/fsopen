import React from 'react';

const Search = ({onChange, value}) => {
	return (
		<div>
			Search <input value={value} placeholder='a distant country' onChange={onChange}></input>
		</div>
	);
};

export default Search;