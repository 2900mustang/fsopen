import React, {useState, useEffect} from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
	const [ persons, setPersons] = useState([]) 
	const [ newName, setNewName ] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterName, setFilterName] = useState('')
	const [ notification, setNotification ] = useState({message: null})

	const hook = () => {
		personService
			.getAll()
			.then(res => {
				setPersons(res)
			})
	}

	useEffect(hook, [])

	const notify = (message, type='ok') => {
		setNotification({message, type})
		setTimeout(() => setNotification({ message: null }), 3500)
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const addPerson = (event) => {
		event.preventDefault()

		const existingPerson = persons.find(person => person.name === newName)

		if (existingPerson) {
			if (window.confirm(`Replace ${newName}'s number with a new number?`)) {
				personService
					.replace({
						...existingPerson,
						number: newNumber
					})
					.then(replacedPerson => {
						setPersons(persons.map(person => person.name === existingPerson.name ? replacedPerson : person))
						setNewName('')
						setNewNumber('')
						notify(`${newName}'s number has been changed.`)
					})
					.catch(err => {
						setPersons(persons.filter(person => person.name !== existingPerson.name))
						notify(`${existingPerson.name} has already been deleted, ${err}`)
					})
			}
			return 
		}
		
		const personObj = {
			name: newName.trim(),
			number: newNumber
		}

		personService
			.create(personObj)
			.then(newPerson => {
				setPersons(persons.concat(newPerson))
				setNewName('')
				setNewNumber('')
				notify(`new contact created ${newPerson.name}`)
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
			personService
				.remove(id)
				.then(() => {
					setPersons(persons.filter(p => p.id !== id))
				})
			notify(`deleted ${person.name}`)
		}
	}

	return (
	<div>
		<h2>Phonebook</h2>

		<Notification notification={notification} />

		<Filter filterName={filterName} handleFilterName={handleFilterName} persons={persons} />

		<h2>add a new contact</h2>
		<PersonForm onSubmit={addPerson} onChange={handleNameChange} onChange2={handleNumberChange} newName={newName} newNumber={newNumber} />

		<h2>Numbers</h2>
		<Persons filter={filterName} persons={persons} deletePersonOf={deletePersonOf} />
	</div>
	)
};

export default App;