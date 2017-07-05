/* eslint-env mocha */
const chai = require('chai')
const expect = chai.expect
const helper = require('./date-formatting-helper')

describe('DateFormattingHelper', () => {
  it('Should throw exception if no parameters are specified', () => {
    expect(helper.formatDate).to.throw(Error, 'No arguments were specified when calling function')
  })

  it('Should format year-only (yyyy)', () => {
    var actual = helper.formatDate(1999)
    expect(actual).to.equal('1999')
  })

  it('Should format year and month date (yyyy-MM)', () => {
    var actual = helper.formatDate(1999, 5)
    expect(actual).to.equal('1999-05')
  })

  it('Should format full date into yyyy-MM-dd format', () => {
    var actual = helper.formatDate(1999, 5, 2)
    expect(actual).to.equal('1999-05-02')
  })

  it('Should throw exception if month is not specified but the day is', () => {
    var actual = () => {
      helper.formatDate(1999, null, 2)
    }
    expect(actual).to.throw(Error, 'Invalid argument values for date formatting')
  })
})
