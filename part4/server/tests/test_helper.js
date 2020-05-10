var blog = require('../models/blog');

const initialBlogs = [
	{
		title: "short-boat",
		author: "Orwell",
		url: "pixar.com",
		likes: 500
	},
	{
		title: "sharp pencil",
		author: "Ogre",
		url: "pixar.com",
		likes: 50
	},
	{
		title: "dimensional herd",
		author: "Trek",
		url: "pixar.com",
		likes: 5
	},
	{
		title: "aligator eats a rabbit",
		author: "Shakr",
		url: "pixar.com",
		likes: 501
	}
]

const blogsInDb = async () => {
	const blogs = await blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs, blogsInDb
}