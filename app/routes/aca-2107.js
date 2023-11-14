const router = require('express').Router()

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

module.exports = router
