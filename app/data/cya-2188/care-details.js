const filters = require('../../filters')

const { row } = require('./utils')

module.exports = (data) => {
  return {
    careDetails: {
      rows: [
        // 35 hours yes or no
        row({
          changeHref: '35-hours',
          changeHtml: 'Change',
          key: `Do you spend 35 hours or more each week providing care for ${filters().getDpName(data)}?`,
          value: data.thirtyFiveHoursCaring === 'Yes' ? 'Yes' : 'No'
        }),
        // 35 hours date
        row({
          changeHref: '35-hours-date',
          changeHtml: 'Change',
          key: 'When did you start providing 35 hours of care?',
          value: filters().getProvidingCare(data)
        }),
        // Claim date
        row({
          changeHref: 'claimdate-1',
          changeHtml: 'Change',
          key: 'Claim date',
          value: filters().getClaimStartDate(data)

        })
      ]
    }
  }
}
