const router = require('express').Router()
const { DateTime } = require('luxon')
const buildCyaSections = require('../data/cya/build-cya-sections')



// router.post('/date-of-birth', (req, res, next) => {
//   const { data } = req.session
//   const sixteenYearsAgo = DateTime.now().minus({ years: 16 })
//   const dateOfBirth = `${data['carerDateOfBirth-day']} ${data['carerDateOfBirth-month']} ${data['carerDateOfBirth-year']}`
//   const parsedDateOfBirth = DateTime.fromFormat(dateOfBirth, 'd M yyyy')
//   // If they're older than 16 continue on with journey
//   if (parsedDateOfBirth < sixteenYearsAgo) {
//     return res.redirect('country')
//   }
//   // If they're younger than 16 show ineligible
//   return res.redirect('date-of-birth-ineligible')
// })

// router.post('/country', (req, res, next) => {
//   const { data } = req.session
//   if (data['elig--country'] === 'Another country') {
//     return res.redirect('country-eea')
//   }
//   return res.redirect('dp-name')
// })



router.get('/breaks-summary', (req, res, next) => {
  const { data } = req.session
  if (data.selectedBreak) {
    delete data.selectedBreak
  }
  next()
})

router.post('/break-remove-confirm', (req, res) => {
  const { data } = req.session

  if (data.selectedBreak) {
    delete data.breakStore[data.selectedBreak]
  }
  return res.redirect('breaks-summary')
})

router.post('/medical-break', (req, res) => {
  const { data } = req.session

  if (data.selectedBreak) {
    if (data.breakStore[data.selectedBreak].medicalBreak === 'Yes') {
      return res.redirect('hospital-stay')
    }
  }
  return res.redirect('breaks-summary')
})

router.get('/check-your-answers', (req, res, next) => {
  console.log(req.session?.data)
  res.locals.sections = buildCyaSections(req.session?.data)
  next()
})

module.exports = router
