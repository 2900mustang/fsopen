import React from 'react';
import Part from './Part'

const Content = ({parts}) => {
	const content = () => (
		parts.map(part => 
			<Part key={part.id} part={part} />	
		)
	)

	return (
		<div>
			{content()}
		</div>
	);
};

export default Content;