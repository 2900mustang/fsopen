import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => (
	<button onClick={onClick}>
		{text}
	</button>
)

const Statistic = ({text, value}) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
)

const Statistics = ({good, bad, neutral, all, average, positive}) => {
	const stats = good || bad || neutral ? (
		<table>
			<Statistic text='good' value={good} />
			<Statistic text='neutral' value={neutral} />
			<Statistic text='bad' value={bad} />
			<Statistic text='all' value={all} />
			<Statistic text='average' value={average} />
			<Statistic text='positive' value={positive} />
		</table>
	) : <div>No feedback given</div>
	return stats
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [all, setAll] = useState(0)

	const handleGood = () => {
		setAll(all+1)
		setGood(good+1)
	}

	const handleNeutral = () => {
		setAll(all+1)
		setNeutral(neutral+1)
	}

	const handleBad = () => {
		setAll(all+1)
		setBad(bad+1)
	}

	return (
		<div>
			<h2>Give feedback</h2>
			<Button onClick={handleGood} text='good' />
			<Button onClick={handleNeutral} text='neutral' />
			<Button onClick={handleBad} text='bad' />
			<h2>Statistics</h2>
			<Statistics good={good} bad={bad} neutral={neutral} all={all} average={all ? (good-bad)/all : 0} positive={all ? (good*100)/all + "%" : 0} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
