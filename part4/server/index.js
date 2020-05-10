var config = require('./utils/config');
var logger = require('./utils/logger');
var http = require('http');
var app = require('./app');

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})