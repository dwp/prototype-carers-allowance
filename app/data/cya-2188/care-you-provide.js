const filters = require('../../filters')
const { row } = require('./utils')

module.exports = (data) => {
  return {
    careYouProvide: {
      rows: [
        // DP Name
        row({
          changeHref: 'dp-name',
          changeHtml: 'Change',
          key: 'Name',
          value: filters().getDpName(data)
        }),
        // DP Dare of Birth
        row({
          changeHref: 'care-you-provide-their-personal-details',
          changeHtml: 'Change',
          key: 'Date of birth',
          value: filters().getDpDateOfBirth(data)
        }),
        // Live at same address?
        row({
          changeHref: 'care-you-provide-their-personal-details',
          changeHtml: 'Change',
          key: 'Do they live at the same address as you?',
          value: data.liveAtSameAddress
        }),
        // National insurance number
        row({
          changeHref: 'dp-national-insurance-number',
          changeHtml: 'Change',
          key: 'National Insurance number',
          value: data.DpNationalInsuranceNumber
        }),
        // What QB do they get
        row({
          changeHref: 'dp-national-insurance-number',
          changeHtml: 'Change',
          key: 'What benefit do they get?',
          value: filters().getQualifyingBenefit(data)
        }),
        // Do you spend 35 hours caring?
        row({
          changeHref: 'dp-national-insurance-number',
          changeHtml: 'Change',
          key: `Do you spend 35 hours or more each week providing care for ${filters().getDpName(data)}?`,
          value: data.spend35HoursCaring
        }),
        // Do you spend 35 hours caring?
        row({
          changeHref: 'dp-national-insurance-number',
          changeHtml: 'Change',
          key: `Does anyone else spend 35 hours or more each week providing care for ${filters().getDpName(data)}?`,
          value: data.otherCarerSpend35HoursCaring
        })
      ]
    }
  }
}
