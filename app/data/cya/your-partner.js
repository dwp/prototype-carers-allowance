const { row } = require('./utils')

module.exports = (data) => {
  return {
    yourPartner: {
      rows: [
        // Your nationality
        row({
          changeHref: 'your-partner-personal-details',
          changeHtml: 'Change',
          key: 'Have you lived with a partner at any time since your claim date?',
          value: data.hadPartnerSinceClaimDate
        })
      ]
    }
  }
}
