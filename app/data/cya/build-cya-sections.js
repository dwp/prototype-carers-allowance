const aboutYou = require('./about-you')
const nationality = require('./nationality')
const yourPartner = require('./your-partner')
const careYouProvide = require('./care-you-provide')
const breaksInCare = require('./breaks-in-care')
const education = require('./education')
// const income = require('./income');
const payDetails = require('./pay-details')
const additionalInformation = require('./additional-information')

module.exports = (data) => ({
  ...aboutYou(data),
  ...nationality(data),
  ...yourPartner(data),
  ...careYouProvide(data),
  ...breaksInCare(data),
  ...education(data),
  // ...income(t, journeyContext, cyaUrl),
  ...payDetails(data),
  ...additionalInformation(data)
})
