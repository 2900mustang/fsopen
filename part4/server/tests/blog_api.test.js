var mongoose = require('mongoose');
var supertest = require('supertest');
var helper = require('./test_helper');
var app = require('../app');
const api = supertest(app)
var Blog = require('../models/blog');
const log = console.log

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjs = helper.initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = blogObjs.map(blog => blog.save()
	)
	await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs returned', async () => {
	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length)
})

test('correct id format', async () => {
	const blogs = await helper.blogsInDb()
	const aBlog = blogs[0]

	expect(aBlog.id).toBeDefined()
})

test('adding a new blog', async () => {
	const newBlog = {
		title: "what a burger",
		author: "Trek",
		url: "pixar.com",
		likes: 54
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length + 1)

	const blogTitles = blogsAtEnd.map(blog => blog.title)
	expect(blogTitles).toContain('what a burger')
})

test('no likes defaults to 0', async () => {
	const newBlog = {
		title: "swamp mushroom",
		author: "Trek",
		url: "pixar.com"
	}

	const blog = new Blog(newBlog);
	let blogWithoutLikes = await blog.save()
	blogWithoutLikes = blogWithoutLikes.toJSON()

	expect(blogWithoutLikes.likes).toEqual(0)
})

test('No title or no url will return status 400.', async () => {
	let newBlog = {
		url: "bats.org",
		author: "Key"
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	newBlog = {
		title: "glass toaster",
		author: "Tahh"
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length)
})

afterAll(() => {
	mongoose.connection.close()
})