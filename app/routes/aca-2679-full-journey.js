const router = require('express').Router()
const { DateTime } = require('luxon')
const buildCyaSections = require('../data/cya/build-cya-sections')


router.post('/date-of-birth', (req, res, next) => {
  const { data } = req.session
  const sixteenYearsAgo = DateTime.now().minus({ years: 16, months: 3 })
  const dateOfBirth = `${data['carerDateOfBirth-day']} ${data['carerDateOfBirth-month']} ${data['carerDateOfBirth-year']}`
  const parsedDateOfBirth = DateTime.fromFormat(dateOfBirth, 'd M yyyy')
  // If they're older than 16 continue on with journey
  if (parsedDateOfBirth < sixteenYearsAgo) {
    return res.redirect('dp-name')
  }
  // If they're younger than 16 show ineligible
  return res.redirect('date-of-birth-ineligible')
})

router.post('/date-of-birth-ineligible', (req, res, next) => {
    
  // Date of birth minus three months
    const DobMinusThreeMonths = DateTime.fromFormat(carerDateOfBirth).minus({ months: 3 })

  })

router.post('/country', (req, res, next) => {
  const { data } = req.session
  if (data['elig--country'] === 'Another country') {
    return res.redirect('country-ineligible')
  }
  if (data['elig--country'] === 'Northern Ireland') {
    return res.redirect('ni')
  }
  if (data['elig--country'] === 'Scotland') {
    return res.redirect('date-of-birth')
  }
  return res.redirect('date-of-birth')
})  

router.post('/35-hours-date', (req, res, _next) => {
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
  if (dateStartedCaring < DateTime.now()) {
    return res.redirect('claimdate-1')
  }

  return res.redirect('claimdate-3')
})



router.post('/dp-national-insurance-number', (req, res, _next) => {
  const { data } = req.session
  const claimStartDate = `${data['carerClaimStart-day']} ${data['carerClaimStart-month']} ${data['carerClaimStart-year']}`
  const parsedStartDate = DateTime.fromFormat(claimStartDate, 'd M yyyy')

  if (data?.isDpPartner === 'Yes') {

    if ( parsedStartDate.startOf("day").ts === DateTime.now().startOf("day").ts) {
      return res.redirect('today/education')
    }
    if ( parsedStartDate < DateTime.now()) {
      return res.redirect('in-past/education')
    }
    return res.redirect('in-future/education')

  }

  return res.redirect('your-partner-personal-details')
})













module.exports = router
