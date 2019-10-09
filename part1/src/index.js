import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	)
}

const Part = (props) => {
	const part = props.part

	return (
		<div>
			<p>{part.name} {part.exercises}</p>
		</div>
	)
}

const Content = (props) => {
	const parts = props.parts

	return (
		<div>
			<Part part={parts[0]} />
			<Part part={parts[1]} />
			<Part part={parts[2]} />
		</div>
	)
}

const Total = (props) => {
	const parts = props.parts

	return (
		<div>
			<p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
		</div>
	)
}

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
			  name: 'Fundamentals of React',
			  exercises: 10
			},
			{
			  name: 'Using props to pass data',
			  exercises: 7
			},
			{
			  name: 'State of a component',
			  exercises: 14
			}
		]
	}

	const [counter, setCounter] = useState(0)

	setTimeout(
		() => setCounter(counter + 1),
		1000
	)

	console.log('rendering....', counter)

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
			<div>{counter}</div>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
