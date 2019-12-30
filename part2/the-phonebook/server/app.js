const config = require('./utils/config')
const middleware = require('./utils/middleware')

//var cors = require('cors');
const morgan = require('morgan')
const express = require('express')
var bodyParser = require('body-parser');

var contactsRouter = require('./controllers/contacts');
var mongoose = require('mongoose');
const app = express()

//app.use(cors()) #if not using proxy in front-end package.json
app.use(morgan('dev'))
app.use(express.static('build'))
app.use(bodyParser.json())

const url = config.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })
	.then(() => console.log('successfully connected to mongodb'))
	.catch(err => console.log('error connecting to mongodb:', err.message))

app.use('/api/contacts', contactsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app