const repeat = require('repeat-string')

module.exports = {
  formatDate: (pYear, pMonth, pDay) => {
    if (pYear == null &&
            pMonth == null &&
            pDay == null) { throw new Error('No arguments were specified when calling function') }

    if (pMonth == null && pDay != null) { throw new Error('Invalid argument values for date formatting') }

    if (pMonth == null) { return pYear.toString() }

    var monthNum = repeat('0', 2 - String(pMonth).length) + pMonth
    if (pDay == null) { return pYear + '-' + monthNum }

    var dayNum = repeat('0', 2 - String(pDay).length) + pDay
    return pYear + '-' + monthNum + '-' + dayNum
  }
}
