const log = console.log

var config = require('./utils/config');
var app = require('./app');
var http = require('http');

const server = http.createServer(app)

server.listen(config.PORT, () => log(`Server running on ${config.PORT}.`))