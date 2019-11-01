import React, {useState, useEffect} from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'
const log = console.log

const App = () => {
	const [ persons, setPersons] = useState([]) 
	const [ newName, setNewName ] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterName, setFilterName] = useState('')

	const hook = () => {
		axios
			.get('http://localhost:3001/persons')
			.then(res => {
				setPersons(res.data)
			})
	}

	useEffect(hook, [])

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const addPerson = (event) => {
		event.preventDefault()
		for (let person of persons) {
			if (newName.trim() === person.name) {
				return alert(`${newName} is already added to phonebook`)
			}
		}
		const personObj = {
			name: newName.trim(),
			number: newNumber
		}
		setPersons(persons.concat(personObj))
		setNewName('')
		setNewNumber('')
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilterName = (event) => {
		setFilterName(event.target.value)
	}

	return (
	<div>
		<h2>Phonebook</h2>
		<Filter filterName={filterName} handleFilterName={handleFilterName} persons={persons} />

		<h2>add a new</h2>
		<PersonForm onSubmit={addPerson} onChange={handleNameChange} onChange2={handleNumberChange} newName={newName} newNumber={newNumber}/>

		<h2>Numbers</h2>
		<Persons persons={persons} />
		<p>debug: {newName}</p>
	</div>
	)
};

export default App;