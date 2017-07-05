'use strict'
const status = require('http-status')
const months = require('months')
const month = require('month')
const days = require('days')
const calendar = require('node-calendar')
const formatter = require('../helpers/date-formatting-helper')
var getDay = (pYear, pMonth, pDay) => {
  var date = new Date(pYear, pMonth - 1, pDay) // Month argument in Date constructor is zero-based
  var dayId = formatter.formatDate(date.getFullYear(), pMonth, date.getDate())
  var dayTitle = days[date.getDay()]
  var dayIsWeekend = (date.getDay() === 0 || date.getDay() === 6)
  return {
    id: dayId,
    day: pDay,
    title: dayTitle,
    isWeekend: dayIsWeekend
  }
}
var getMonthDays = (pYear, pMonth) => {
  var cal = new calendar.Calendar().monthdayscalendar(pYear, (pMonth))
  var days = []
  for (var k = 0; k < cal.length; k++) {
    for (var ki = 0; ki < cal[k].length; ki++) {
      if (cal[k][ki] !== 0) {
        var day = getDay(pYear, pMonth, cal[k][ki])
        days.push(day)
      }
    }
  }
  return days
}
var getMonths = (pYear) => {
  var yearMonths = []
  for (var i = 0; i < months.length; i++) {
    var monthNum = month(months[i])
    var monthRange = calendar.monthrange(pYear, monthNum)
    var startMonth = new Date(Date.UTC(pYear, i, 1, 0, 0, 0))
    var endMonth = new Date(Date.UTC(pYear, i, monthRange[1], 23, 59, 59, 999))
    var monthDays = getMonthDays(pYear, monthNum)
    var monthId = formatter.formatDate(pYear, monthNum)
    yearMonths.push({
      id: monthId,
      year: pYear,
      month: monthNum,
      title: month(monthNum),
      from: startMonth,
      until: endMonth,
      lastDay: monthRange[1],
      days: monthDays
    })
  }
  return yearMonths
}
module.exports = (app, options) => {
  app.get('/calendar/:year', (req, res, next) => {
    if (req.params.year < 1900 || req.params.year > 2200) {
      res.status(status.BAD_REQUEST).end()
      return
    }
    var result = getMonths(req.params.year)
    res.status(status.OK).json(result)
  })
}
