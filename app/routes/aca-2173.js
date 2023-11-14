const router = require('express').Router()
const { DateTime } = require('luxon')
const buildCyaSections = require('../data/cya/build-cya-sections')


router.post('/date-of-birth', (req, res, next) => {
  const { data } = req.session
  const sixteenYearsAgo = DateTime.now().minus({ years: 16 })
  const dateOfBirth = `${data['carerDateOfBirth-day']} ${data['carerDateOfBirth-month']} ${data['carerDateOfBirth-year']}`
  const parsedDateOfBirth = DateTime.fromFormat(dateOfBirth, 'd M yyyy')
  // If they're older than 16 continue on with journey
  if (parsedDateOfBirth < sixteenYearsAgo) {
    return res.redirect('country')
  }
  // If they're younger than 16 show ineligible
  return res.redirect('date-of-birth-ineligible')
})

router.post('/country', (req, res, next) => {
  const { data } = req.session
  if (data['elig--country'] === 'Another country') {
    return res.redirect('country-ineligible')
  }
  if (data['elig--country'] === 'England') {
    return res.redirect('claim-date')
  }
  if (data['elig--country'] === 'Wales') {
    return res.redirect('claim-date')
  }

if (data['elig--country'] === 'Northern Ireland') {
  return res.redirect('ni')
}
  if (data['elig--country'] === 'Scotland') {
    return res.redirect('about-you-postcode-lookup')
  }
 
})


module.exports = router
