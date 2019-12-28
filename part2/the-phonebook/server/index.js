require('dotenv').config()
var express = require('express');
//var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const app = express()

const log = console.log
const Contact = require('./models/contact')

/*
TODO:
1. use morgan to log out res data
*/

app.use(bodyParser.json())
app.use(morgan('dev'))
//app.use(cors())
//app.use(express.static('build'))

//all contacts
app.get('/api/contacts', (req, res) => {
	Contact.find({}).then(contacts => {
		res.json(contacts.map(contact => contact.toJSON()))
	})
})

//contact by id
app.get('/api/contacts/:id', (req, res, next) => {
	Contact.findById(req.params.id)
		.then(contact => {
			if (contact) {
				res.json(contact.toJSON())
			} else {
				res.status(404).end()
			}
		})
		.catch(err => next(err))
})

app.get('/api/info', (req, res, next) => {
	Contact.countDocuments({})
		.then(count => res.json({
		info: `${count} contacts in the phonebook.`
		}))
		.catch(err => next(err))
})

app.post('/api/contacts', (req, res) => {
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

	// const existingContact = Contact.find(contact => contact.name === body.name)

	// if (existingContact) {
	// 	return res.status(400).json({
	// 		error: 'name must be unique'
	// 	})
	// }

	const contact = new Contact({
		name: body.name,
		number: body.number,
	})
	
	contact.save().then(savedContact => {
		res.json(savedContact.toJSON())
	})
})

app.put('/api/contacts/:id', (req, res, next) => {
	const body = req.body

	const contact = {
		name: body.name,
		number: body.number,
	}

	Contact.findByIdAndUpdate(req.params.id, contact, {new: true})
		.then(updatedContact => res.json(updatedContact.toJSON()))
		.catch(err => next(err))
})

app.delete('/api/contacts/:id', (req, res, next) => {
	Contact.findByIdAndDelete(req.params.id)
		.then(result => res.status(204).end())
		.catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
	res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
	console.error(err.message)

	if (err.name === 'CastError' && err.kind === 'ObjectId') {
		return res.status(400).send({error: 'malformatted id'})
	}

	next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	log(`server is running on port ${PORT}`)	
})