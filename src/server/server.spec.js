/* eslint-env mocha */
const server = require('./server')
const chai = require('chai')
const expect = chai.expect
const chaiPromised = require('chai-as-promised')

chai.use(chaiPromised)

describe('Server', () => {
  it('Should require a port to start', () => {
    return expect(server.start({})).be.rejectedWith(/port/)
  })
})
