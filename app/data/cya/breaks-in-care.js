const filters = require('../../filters')
const { row } = require('./utils')

module.exports = (data) => {
  return {
    breaksInCare: {
      rows: [
        // Any breaks
        row({
          changeHref: 'your-partner-personal-details',
          changeHtml: 'Change',
          key: `Since ${filters().getBackdatedClaimDate(data)} have there been any breaks in care?`,
          value: data.breakStore?.length > 0 ? 'Yes - details provided' : 'No'
        })
      ]
    }
  }
}
