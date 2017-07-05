/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')
const expect = require('chai').expect

describe('Calendar API', () => {
  var app = null

  beforeEach(() => {
    return server.start({
      port: 3000
    }).then(serv => {
      app = serv
    })
  })
  afterEach(() => {
    app.close()
    app = null
  })

  it('Should get calendar for specified year', (done) => {
    request(app)
      .get('/calendar/2000')
      .expect((res) => {
        expect(res.body.length).to.equal(12)
        expect(res.body[0].days.length).to.equal(31)
        expect(res.body[1].days.length).to.equal(29)
        expect(res.body[2].days.length).to.equal(31)
        expect(res.body[3].days.length).to.equal(30)
        expect(res.body[4].days.length).to.equal(31)
        expect(res.body[5].days.length).to.equal(30)
        expect(res.body[6].days.length).to.equal(31)
        expect(res.body[7].days.length).to.equal(31)
        expect(res.body[8].days.length).to.equal(30)
        expect(res.body[9].days.length).to.equal(31)
        expect(res.body[10].days.length).to.equal(30)
        expect(res.body[11].days.length).to.equal(31)
      })
      .expect(200, done)
  })

  it('Should restrict minimum date to 1900', (done) => {
    request(app)
      .get('/calendar/1899')
      .expect((res) => {
        expect(res.body).to.deep.equal({})
      })
      .expect(400, done)
  })

  it('Should restrict maximum date to 2200', (done) => {
    request(app)
      .get('/calendar/2201')
      .expect((res) => {
        expect(res.body).to.deep.equal({})
      })
      .expect(400, done)
  })
})
