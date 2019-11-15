var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const app = express()
const log = console.log

/*
TODO:
1. use morgan to log out res data
*/

morgan.token(('name', 'number'), function getInfo (req) {
	return JSON.stringify(req)
})

app.use(bodyParser.json())
app.use(morgan('dev'))

let persons = [
	{
		"name": "fat",
		"number": "647",
		"id": 17
	},
	{
		"name": "fatter",
		"number": "7578",
		"id": 19
	},
	{
		"name": "fattest",
		"number": "36",
		"id": 20
	}
]

//all persons
app.get('/api/persons', (req, res) => {
	res.json(persons)
})

//person by id
app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find(person => person.id === id)
	if (person) {
		res.json(person)
	} else {
		res.status(404).end('person not found')
	}
})

app.get('/api/info', (req, res) => {
	res.send(`
		Phonebook has info for ${persons.length} persons.
		${Date()}
	`)
})

const generateId = () => {
	const maxId = persons.length ? Math.max(...persons.map(person => person.id)) : 0
	return maxId + 1
}

app.post('/api/persons', (req, res) => {
	const body = req.body

	if (!body.name) {
		return res.status(400).json({
			error: 'name missing'
		})
	}
	if (!body.number) {
		return res.status(400).json({
			error: 'number missing'
		})
	}

	const existingPerson = persons.find(person => person.name === body.name)

	if (existingPerson) {
		return res.status(400).json({
			error: 'name must be unique'
		})
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId()
	}
	
	persons = persons.concat(person)

	res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)
	return res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	log(`server is running on port ${PORT}`)	
})