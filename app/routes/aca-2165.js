const router = require('express').Router()
const { DateTime } = require('luxon')
const buildCyaSections = require('../data/cya/build-cya-sections')




router.post('/35hours-date', (req, res, _next) => {
  const { data } = req.session

  const dateFormat = 'd M yyyy' // e.g. 01 02 2022 or 5 11 2020

  const dateCaringDay = data['providing-care-day']
  const dateCaringMonth = data['providing-care-month']
  const dateCaringYear = data['providing-care-year']
  const dateStartedCaring = DateTime.fromFormat(`${dateCaringDay} ${dateCaringMonth} ${dateCaringYear}`, dateFormat)

  // Date three months ago
  const threeMonthsAgo = DateTime.now().minus({ months: 3 })

  // Date three months ahead
  const threeMonthsAhead = DateTime.now().plus({ months: 3 })

  // Is the date started caring before three months ago?
  if (dateStartedCaring < threeMonthsAgo) {

    return res.redirect('claimdate-2')
  }
  return res.redirect('claimdate-1')
})




module.exports = router
