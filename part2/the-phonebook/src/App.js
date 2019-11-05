import React, {useState, useEffect} from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import phoneService from './services/persons'
const log = console.log

const App = () => {
	const [ persons, setPersons] = useState([]) 
	const [ newName, setNewName ] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterName, setFilterName] = useState('')

	const hook = () => {
		phoneService
			.getAll()
			.then(res => {
				setPersons(res)
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
		phoneService
			.create(personObj)
			.then(res => {
				setPersons(persons.concat(personObj))
				setNewName('')
				setNewNumber('')
			})
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilterName = (event) => {
		setFilterName(event.target.value)
	}

	const deletePersonOf = id => {
		const person = persons.find(person => person.id === id)
		if (window.confirm(`delete ${person.name}?`)) {
			phoneService.remove(id)
			log('deleted')
		}
	}

	return (
	<div>
		<h2>Phonebook</h2>
		<Filter filterName={filterName} handleFilterName={handleFilterName} persons={persons} />

		<h2>add a new</h2>
		<PersonForm onSubmit={addPerson} onChange={handleNameChange} onChange2={handleNumberChange} newName={newName} newNumber={newNumber}/>

		<h2>Numbers</h2>
		<Persons persons={persons} deletePerson={(id) => deletePersonOf(id)}/>
		<p>debug: {newName}</p>
	</div>
	)
};

export default App;