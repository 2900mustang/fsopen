var _ = require('lodash');

const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	const getSum = (a, b) => a + b

	return blogs.length ? blogs.map(blog => blog.likes).reduce(getSum, 0) : 0
}

const favoriteBlog = blogs => {
	const getMax = (curr, next) => curr.likes < next.likes ? next : curr

	return blogs.length ? blogs.reduce(getMax).likes : 0
}

const mostBlogs = blogs => {
	let table = blogs.reduce((acc, item) => {
		acc[item.author] = acc[item.author]+1 || 1
		return acc 
	}, {})

	let _max = _.max(Object.values(table))

	let mushroom
	_.forEach(table, (val, key) => {
		if (val === _max) {
			mushroom = {
				'author': key,
				'blogs': val,				
			}
		}	
	})

	return blogs.length ? mushroom : null
}

const mostLikes = blogs => {
	let table = blogs.reduce((acc, blog) => {
		acc[blog.author] = acc[blog.author] + blog.likes || blog.likes
		return acc
	}, {})

	let _max = _.max(Object.values(table))

	let mushroom
	_.forEach(table, (val, key) => {
		if (val === _max) {
			mushroom = {
				'author': key,
				'likes': val
			}
		}
	})

	return mushroom
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}