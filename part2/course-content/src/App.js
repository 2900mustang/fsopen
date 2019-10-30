import React from 'react';
import Course from './components/Course'

const App = ({courses}) => {
	const display = () => courses.map(course => 
		<Course course={course} />	
	)

	return (
		<div>
			<h1>Web Development Curriculum</h1>
			{display()}
		</div>
	);
};

export default App;