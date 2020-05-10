var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 5,
		unique: true
	},
	author: String,
	url: String,
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
	transform: (document, res) => {
		res.id = res._id.toString()
		delete res._id
		delete res.__v
	}
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog