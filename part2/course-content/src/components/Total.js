import React from 'react';

const Total = ({parts}) => {
	const total = parts.reduce((a, b) => a+b.exercises, 0)
	return (
		<div>
			<b>Total of {total}</b>
		</div>
	);
};

export default Total;