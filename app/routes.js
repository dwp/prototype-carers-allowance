const express = require('express')
const router = express.Router()
const { DateTime } = require('luxon')

const config = require('./config')

const idtE2ERoutes = require('./routes/end-to-end')
const aca2107Routes = require('./routes/aca-2107')
const aca2165Routes = require('./routes/aca-2165')
const aca2173Routes = require('./routes/aca-2173')
const aca2154Routes = require('./routes/aca-2154')
const aca21542Routes = require('./routes/aca-2154-2')
const aca2188Routes = require('./routes/aca-2188')
const aca2272Routes = require('./routes/aca-2272')
const aca2047Routes = require('./routes/aca-2047-full-journey')
const aca2403Routes = require('./routes/aca-2403')
const aca24473Routes = require('./routes/aca-2447-3')
const aca2676Routes = require('./routes/aca-2676')


//oidv


// Add your routes here - above the module.exports line
router.post('/oidv/hmrc/choose-items-routes', (req, res) => {
    const passportConsent = req.session.data['ukPassport'];
    const payslipOrP60 = req.session.data['idv-hmrc-payslip-p60'];
    const selfAssessment = req.session.data['self-assessment'];
    const voiceID = req.session.data['idv-hmrc-payslip-tax-credits'];
    const tuConsent = req.session.data['transunion'];



    // Passport and payslip §
    if (passportConsent == 'true' && payslipOrP60 == 'payslip') {
    res.redirect('/oidv/hmrc/confirm-who-you-are/your-passport-details-consent')
    }
    // Passport and P60 
    else if (passportConsent == 'true' && payslipOrP60 == 'p60') {
    res.redirect('/oidv/hmrc/confirm-who-you-are/your-passport-details-consent')
    }
    // Passport and Self Assessment 
    else if (passportConsent == 'true' && selfAssessment == 'true') {
    res.redirect('/oidv/hmrc/confirm-who-you-are/your-passport-details-consent')
    }
    // Passport and tax credits no voice id
    else if (passportConsent == 'true' && voiceID == 'voice-id-no') {
    res.redirect('/oidv/hmrc/confirm-who-you-are/your-passport-details-consent')
    }
    // Passport and tax credits voice ID
    else if (passportConsent == 'true' && voiceID == 'voice-id-yes') {
    res.redirect('/oidv/hmrc/confirm-who-you-are/your-passport-details-consent')
    }
    // Passport and Credit reference
    else if (passportConsent == 'true' && tuConsent == 'true') {
    res.redirect('/oidv/hmrc/confirm-who-you-are/your-passport-details-consent')
    }


    
    // Payslip and tax credits no voice id
    else if (payslipOrP60 == 'payslip' && voiceID == 'voice-id-no') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-payslip+noVoiceId=payslip');
    }
    // Payslip and Self Assessment 
    else if (payslipOrP60 == 'payslip' && selfAssessment == 'true') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-payslip+self-assessment=payslip')
    }
    // Payslip and tax credits voice ID
    else if (payslipOrP60 == 'payslip' && voiceID == 'voice-id-yes') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-payslip+voiceId=payslip')
    }
    // Payslip and Credit reference
    else if (payslipOrP60 == 'payslip' && tuConsent == 'true') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-payslip+crq=payslip');
    }



    // P60 and Self Assessment 
    else if (payslipOrP60 == 'p60' && selfAssessment == 'true') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-p60+self-assessment=p60-1')
    }
    // P60 and tax credits no voice id
    else if (payslipOrP60 == 'p60' && voiceID == 'voice-id-no') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-p60+noVoiceId=p60-1');
    }
    // P60 and tax credits voice ID
    else if (payslipOrP60 == 'p60' && voiceID == 'voice-id-yes') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-p60+voiceId=p60-1')
    }
    // P60 and Credit reference
    else if (payslipOrP60 == 'p60' && tuConsent == 'true') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-p60+crq=p60-1');
    }



    // Self Assessment and tax credits no voice id
    else if (selfAssessment == 'true' && voiceID == 'voice-id-no') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-self-assessment+noVoiceId=self-assessment');
    }
    // Self Assessment and tax credits voice ID
    else if (selfAssessment == 'true' && voiceID == 'voice-id-yes') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-self-assessment+voiceId=self-assessment')
    }
    // Self Assessment and Credit reference
    else if (selfAssessment == 'true' && tuConsent == 'true') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-self-assessment+crq=self-assessment');
    }



    // Tax credits no voice id and Credit reference
    else if (voiceID == 'voice-id-no' && tuConsent == 'true') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-noVoiceId+crq=noVoiceId');
    }
    // Tax credits voice ID and Credit reference
    else if (voiceID == 'voice-id-yes' && tuConsent == 'true') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-voiceId+crq=voiceId')
    }
    // Fallback
    else {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/choose-2-items-error')
    }
})

/*

('/current/idv/hmrc/confirm-who-you-are/Q-passport+payslip=passport')
('/current/idv/hmrc/confirm-who-you-are/Q-passport+p60=passport')
('/current/idv/hmrc/confirm-who-you-are/Q-passport+self-assessment=passport')
('/current/idv/hmrc/confirm-who-you-are/Q-passport+noVoiceId=passport')
('/current/idv/hmrc/confirm-who-you-are/Q-passport+voiceId=passport')
('/current/idv/hmrc/confirm-who-you-are/Q-passport+crq=passport')

*/
 router.post('/idv/hmrc/passport-routes', (req, res) => {
    const payslipOrP60 = req.session.data['idv-hmrc-payslip-p60'];
    const selfAssessment = req.session.data['self-assessment'];
    const voiceID = req.session.data['idv-hmrc-payslip-tax-credits'];
    const tuConsent = req.session.data['transunion'];

    if (payslipOrP60 == 'payslip')
   res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-passport+payslip=passport')

   else if (payslipOrP60 == 'p60')
   res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-passport+p60=passport')

   // Passport and Self Assessment 
   else if (selfAssessment == 'true') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-passport+self-assessment=passport')
    }
   // Passport and tax credits no voice id
    else if (voiceID == 'voice-id-no') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-passport+noVoiceId=passport')
    }
    // Passport and tax credits voice ID
    else if (voiceID == 'voice-id-yes') {
    res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-passport+voiceId=passport')
    }
    // Passport and Credit reference
    else if (tuConsent == 'true') {
        res.redirect('/current/idv/hmrc/confirm-who-you-are/Q-passport+crq=passport')
    }
})

// router.post('/idv/hmrc/p60-routes', (req, res) => {
//     res.redirect('/current/idv/hmrc/confirm-who-you-are/p60-1');
// })

// router.post('/idv/hmrc/self-assessment-routes', (req, res) => {
//     res.redirect('/current/idv/hmrc/confirm-who-you-are/self-assessment');
// })

// router.post('/idv/hmrc/tcKbv-routes', (req, res) => {
//     res.redirect('/current/idv/hmrc/confirm-who-you-are/tax-credits-1');
// })

// router.post('/idv/hmrc/tuKbv-routes', (req, res) => {
//     res.redirect('/current/idv/hmrc/confirm-who-you-are/credit-reference-1');
// })

// router.post('/idv/hmrc/voice-id-routes', (req, res) => {
//     res.redirect("/current/idv/hmrc/confirm-who-you-are/tax-credits-voice");
// })

// router.post('/idv/hmrc/info-does-not-match', (req, res) => {
//     res.redirect("/current/idv/hmrc/confirm-who-you-are/info-does-not-match");
// })

// router.use((req, res, next) => {
//     idvReset(req);
//     if (req.query.payslip) {
//     req.session.payslip = req.query.payslip;
//     }
//     res.locals.payslip = req.session.payslip;
//     next();
// });

// router.use((req, res, next) => {
//     idvReset(req);
//     if (req.query.p60) {
//     req.session.p60 = req.query.p60;
//     }
//     res.locals.p60 = req.session.p60;
//     next();
// });

// router.use((req, res, next) => {
//     idvReset(req);
//     if (req.query.sa) {
//     req.session.sa = req.query.sa;
//     }
//     res.locals.sa = req.session.sa;
//     next();
// });

// router.use((req, res, next) => {
//     idvReset(req);
//     if (req.query.tcKbv) {
//     req.session.tcKbv = req.query.tcKbv;
//     }
//     res.locals.tcKbv = req.session.tcKbv;
//     next();
// });

// router.use((req, res, next) => {
//     idvReset(req);
//     if (req.query.tuKbv) {
//     req.session.tuKbv = req.query.tuKbv;
//     }
//     res.locals.tuKbv = req.session.tuKbv;
//     next();
// });

// router.use((req, res, next) => {
//     idvReset(req);
//     if (req.query.payslip) {
//     req.session.payslip = req.query.payslip;
//     }
//     res.locals.payslip = req.session.payslip;
//     next();
// });

// router.use((req, res, next) => {
//     idvReset(req);
//     if (req.query.voiceId) {
//     req.session.voiceId = req.query.voiceId;
//     }
//     res.locals.voiceId = req.session.voiceId;
//     next();
// });


//end of oidv

// Route to allow radio options to route to a given next page

const radioButtonRedirect = (req, res, next) => {
  const obj = Object.keys(req.body).length ? req.body : req.query
  for (const k in obj) {
    const v = obj[k]
    if (typeof v === 'string' || v instanceof String) {
      if (v.includes('~')) {
        const parts = v.split('~')
        req.session.data[k] = parts[0]
        const href = parts[1]
        return res.redirect(href)
      }
    }
  }
  next()
}

router.use(radioButtonRedirect)

// Change service name in header based on URL path

router.get('/home', (req, res) => res.redirect('/index'))

router.get('/*', (req, _, next) => {
  req.session.data.headerTitle = config.serviceName
  next()
})

router.post('/apply/ACA-1472/qb-startdate', (req, res, next) => {
  const { data } = req.session

  const dateFormat = 'd M yyyy' // e.g. 01 02 2022 or 5 11 2020

  const dateCaringDay = data['providing-care-day']
  const dateCaringMonth = data['providing-care-month']
  const dateCaringYear = data['providing-care-year']
  const dateStartedCaring = DateTime.fromFormat(`${dateCaringDay} ${dateCaringMonth} ${dateCaringYear}`, dateFormat)

  // Qualifying benefit start date
  const qbStartDay = data['qb-start-day']
  const qbStartMonth = data['qb-start-month']
  const qbStartYear = data['qb-start-year']
  const qbStartCaring = DateTime.fromFormat(`${qbStartDay} ${qbStartMonth} ${qbStartYear}`, dateFormat)

  // Date three months ago
  const threeMonthsAgo = DateTime.now().minus({ months: 3 })

  // Is the date started caring before three months ago?
  if (dateStartedCaring < threeMonthsAgo) {
    // Has a qb start date been provided?
    if (qbStartCaring.invalid !== null) {
      // Manual entry page
      return res.redirect('/apply/ACA-1472/claimdate-3')
    }

    // Did the qb start longer than three months ago?
    if (qbStartCaring < threeMonthsAgo) {
      // Send to page to ask if benefit was awarded in last 3 months
      return res.redirect('/apply/ACA-1472/qb-3months')
    }
    // If qb started in last three months we can make confident recommendation
    return res.redirect('/apply/ACA-1472/claimdate-1')
  }

  // Date started caring must be in last three months at this point
  // Has a qb start date been provided?
  if (qbStartCaring.invalid !== null) {
    // We can make an uncertain recommendation due to care start being in the last three months
    return res.redirect('/apply/ACA-1472/claimdate-2')
  } else {
    return res.redirect('/apply/ACA-1472/claimdate-1')
  }
})

router.post('/apply/ACA-1472/qb-3months', (req, res, next) => {
  const { data } = req.session

  // Was QB awarded in the last 3 months?
  const qbAwardedLastThreeMonths = data['qb-awarded-last-three-months']

  if (qbAwardedLastThreeMonths === 'Not sure') {
    // We can make an uncertain recommendation due to care start being in the last three months
    return res.redirect('/apply/ACA-1472/claimdate-3')
  } else {
    return res.redirect('/apply/ACA-1472/claimdate-1')
  }
})

router.use('/apply/IDT-testing', idtE2ERoutes)

router.use('/apply/ACA-1974-full-journey', idtE2ERoutes)

router.use('/apply/ACA-2107', aca2107Routes)

router.use('/apply/ACA-2165', aca2165Routes)

router.use('/apply/ACA-2173', aca2173Routes)

router.use('/apply/ACA-2154', aca2154Routes)

router.use('/apply/ACA-2154-2', aca21542Routes)

router.use('/apply/ACA-2188', aca2188Routes)

router.use('/apply/ACA-2272', aca2272Routes)
 
router.use('/apply/ACA-2047-full-journey', aca2047Routes)

router.use('/apply/ACA-2403', aca2403Routes)

router.use('/changes/ACA-2447-3', aca24473Routes)

router.use('/apply/ACA-2676', aca2676Routes)


router.get('/apply/*', (req, _, next) => {
  req.session.data.headerTitle = config.applyServiceName
  next()
})

router.get('/poc/*', (req, _, next) => {
  req.session.data.headerTitle = config.applyServiceName
  next()
})

router.get('/changes/*', (req, _, next) => {
  req.session.data.headerTitle = config.changesServiceName
  next()
})

// Reset all one-time values

const resetBooleanUnlessOverwritten = (req, name) => {
  req.session.data[name] = req.body[name] || req.query[name] ? true : false
}

router.all('*', (req, _, next) => {
  resetBooleanUnlessOverwritten(req, 'error')
  resetBooleanUnlessOverwritten(req, 'show-buttons')
  resetBooleanUnlessOverwritten(req, 'fromCheck')
  req.session.data.time = new Date().getTime()
  next()
})

module.exports = router
