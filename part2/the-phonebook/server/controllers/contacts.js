const contactsRouter = require('express').Router()
const Contact = require('../models/contact')

contactsRouter.get('/', (req, res) => {
	Contact.find({})
		.then(contacts => res.json(contacts.map(contact => contact.toJSON())))
})

contactsRouter.get('/:id', (req, res, next) => {
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

contactsRouter.get('/info', (req, res, next) => {
	Contact.countDocuments({})
		.then(count => res.json({
			info: `${count} contacts in the phonebook.`
		}))
		.catch(err => next(err))
})

contactsRouter.post('/', (req, res, next) => {
	const body = req.body

	const contact = new Contact({
		name: body.name,
		number: body.number
	})

	contact.save()
		.then(savedContact => savedContact.toJSON())
		.then(savedAndFormattedContact => res.json(savedAndFormattedContact))
		.catch(err => next(err))
})

contactsRouter.put('/:id', (req, res, next) => {
	const body = req.body

	const contact = {
		name: body.name,
		number: body.number
	}

	Contact.findByIdAndUpdate(req.params.id, contact, { new: true, runValidators: true, context: 'query'})
		.then(updatedNote => res.json(updatedNote.toJSON()))
		.catch(err => next(err))
})

contactsRouter.delete('/:id', (req, res, next) => {
	Contact.findByIdAndRemove(req.params.id)
		.then(() => res.status(204).end())
		.catch(err => next(err))
})

module.exports = contactsRouter