const router = require('express').Router()
const { DateTime } = require('luxon')
const buildCyaSections = require('../data/cya/build-cya-sections')

router.post('/idt-filter', (req, res) => {
  const { data } = req.session
  // As long as they have picked at least 2 documents send them to OIDV
  if (data.haveDocuments?.length > 1) {
    return res.redirect('verification-start')
  }
  return res.redirect('third-party')
})



module.exports = router
