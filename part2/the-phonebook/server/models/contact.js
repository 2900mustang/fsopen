var mongoose = require('mongoose');

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })
	.then(res => console.log('successfully connected to mongodb'))
	.catch(err => console.log('error connecting to mongodb:', err.message))

const contactSchema = new mongoose.Schema({
	name: String,
	number: Number,
})

contactSchema.set('toJSON', {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id.toString()
		delete returnedObj._id
		delete returnedObj.__v
	}
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact