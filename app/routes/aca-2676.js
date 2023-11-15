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
    return res.redirect('35-hours-someone')
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
    return res.redirect('about-you-postcode-lookup')
  }
  return res.redirect('date-of-birth')
})  


router.post('/idt-filter', (req, res) => {
  const { data } = req.session
  // As long as they have picked at least 2 documents send them to OIDV
  if (data.haveDocuments?.length > 1) {
    return res.redirect('verification-start')
  }
  return res.redirect('end-1')
})


module.exports = router
