'use strict'
const server = require('./server/server')
const config = require('./config/')

console.log('--- Calendar Service ---')

process.on('uncoughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncoughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

var options = {
  port: config.serverSettings.port
}

server.start(options)
  .then(app => {
    console.log('Server started succesfully, running on port: ' + config.serverSettings.port)
  })
