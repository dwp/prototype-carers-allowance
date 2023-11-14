const { row } = require('./utils')

module.exports = (data) => {
  return {
    payDetails: {
      rows: [
        // Any bank details provided?
        row({
          changeHref: 'pay-details',
          changeHtml: 'Change',
          key: 'Bank or building society account details',
          value: data.accountHolderName ? 'Details provided' : 'Not provided - this may delay any payments you are entitled to'
        }),
        // How often to pay CA
        row({
          changeHref: 'pay-frequency',
          changeHtml: 'Change',
          key: 'How often should we pay your Carer\'s Allowance?',
          value: data.howOftenPaid === 'EveryWeek' ? 'Every week' : 'Every 4 weeks'
        })
      ]
    }
  }
}
