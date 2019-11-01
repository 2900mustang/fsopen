import React, {useState} from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
	const [ persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]) 
	const [ newName, setNewName ] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterName, setFilterName] = useState('')

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