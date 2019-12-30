var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
		unique: true
	},
	number: {
		type: String,
		minlength: [8, 'I want my eggs'],	
		required: true,
		unique: true
	},
})

contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON', {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id.toString()
		delete returnedObj._id
		delete returnedObj.__v
	}
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact