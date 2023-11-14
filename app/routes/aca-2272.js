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
  if (data['elig--country'] === 'Northern Ireland') {
    return res.redirect('ni')
  }
  if (data['elig--country'] === 'Scotland') {
    return res.redirect('dp-name')
  }
  return res.redirect('dp-name')
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
  return res.redirect('claimdate-1')
})


router.post('/nationality-always-lived-esw', (req, res, _next) => {
  const { data } = req.session

  if (data?.applicantAlwaysLivedESW === 'Yes') {
    return res.redirect('nationality-away-52-weeks')
  }

  return res.redirect('nationality-esw-arrived')
})


router.post('/nationality-esw-arrived', (req, res, _next) => {
  const { data } = req.session

  if (data?.arrivedIn === 'lessThan3YearsAgo') {
    return res.redirect('nationality-date-arrived-esw')
  }

  return res.redirect('nationality-away-52-weeks')
})

router.post('/nationality-away-52-weeks', (req, res, _next) => {
  const { data } = req.session

  if (data?.applicantBeenAway === 'Yes') {
    return res.redirect('nationality-away-52-weeks-details')
  }

  return res.redirect('nationality-payments-from-abroad')
})


router.post('/care-you-provide-their-personal-details', (req, res, _next) => {
  const { data } = req.session

  if (data?.liveAtSameAddress === 'No') {
    return res.redirect('care-you-provide-postcode-lookup')
  }

  return res.redirect('dp-national-insurance-number')
})

router.post('/dp-national-insurance-number', (req, res, _next) => {
  const { data } = req.session

  if (data?.isDpPartner === 'Yes') {
    return res.redirect('education')
  }

  return res.redirect('your-partner-personal-details')
})




const getNextIncomeRoute = (req, res, _next) => {
  const currentWaypoint = req.path.replace('/', '')

  const valueToWaypoint = {
    StatutorySickPay: 'statutory-sick-pay',
    MaternityPaternity: 'maternity-paternity-adoption',
    Fostering: 'fostering-allowance',
    DirectPayment: 'direct-payment',
    Rental: 'rental-income',
    None: 'other-income'
  }

  const { data: { additionalIncomeTypes } } = req.session

  if (currentWaypoint === 'additional-income-types') {
    return res.redirect(valueToWaypoint[additionalIncomeTypes[0]])
  }

  const currentPageValue = Object.keys(valueToWaypoint).find(key => valueToWaypoint[key] === currentWaypoint)
  const currentPagePosition = additionalIncomeTypes.indexOf(currentPageValue)
  const positionOfNextPage = currentPagePosition + 1

  if (additionalIncomeTypes[positionOfNextPage]) {
    return res.redirect(valueToWaypoint[additionalIncomeTypes[positionOfNextPage]])
  } else {
    return res.redirect('other-income')
  }
}

router.post('/additional-income-types', getNextIncomeRoute)
router.post('/statutory-sick-pay', getNextIncomeRoute)
router.post('/maternity-paternity-adoption', getNextIncomeRoute)
router.post('/fostering-allowance', getNextIncomeRoute)
router.post('/direct-payment', getNextIncomeRoute)
router.post('/rental-income', getNextIncomeRoute)

const hasIncomeSource = (data) => {
  return data.employeeSince === 'Yes' ||
   data.selfEmployedSince === 'Yes' ||
   (data.otherIncomeSince?.length > 0 && !data.otherIncomeSince?.includes('None')) ||
   data.otherIncome === 'Yes'
}

router.post('/other-income', (req, res) => {
  const { data } = req.session
  if (data.otherIncome === 'Yes') {
    return res.redirect('other-income-details')
  }
  if (hasIncomeSource(data)) {
    return res.redirect('personal-pension')
  }
  return res.redirect('pay-details')
})

router.post('/other-income-details', (req, res) => {
  const { data } = req.session
  if (hasIncomeSource(data)) {
    return res.redirect('personal-pension')
  }
  return res.redirect('pay-details')
})

router.post('/employment', (req, res) => {
  const { data } = req.session
  if (data.employeeSince !== 'Yes') {
    return res.redirect('self-employment')
  }
  // Existing employments so redirect to summary page
  if (data.employmentStore && Object.keys(data.employmentStore).length > 0) {
    return res.redirect('employment-summary')
  }
  return res.redirect('employment-details')
})

router.post('/employment-remove-confirm', (req, res) => {
  const { data } = req.session

  if (data.selectedEmployment) {
    delete data.employmentStore[data.selectedEmployment]
  }
  return res.redirect('employment-summary')
})

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


router.post('/decision-notification', (req, res, next) => {
  const { data } = req.session
  console.log(data)
  if (data['email-confirmation'].includes('email')){
      return res.redirect('email')
  }
  if (data['email-confirmation'].includes('letter')){
      return res.redirect('confirmation')
  }
  
  
})

router.get('/check-your-answers', (req, res, next) => {
  console.log(req.session?.data)
  res.locals.sections = buildCyaSections(req.session?.data)
  next()
})

module.exports = router
