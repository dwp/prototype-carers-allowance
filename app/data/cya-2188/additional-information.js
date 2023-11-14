const { row } = require('./utils')

module.exports = (data) => {
  return {
    additionalInformation: {
      rows: [
        // Want to tell us any additional?
        row({
          changeHref: 'information-additional-information',
          changeHtml: 'Change',
          key: 'Do you want to tell us any additional information about your claim?',
          value: data.additionalInformation === 'Yes' ? data.tellUs : 'No'
        }),
        // Future comms in Welsh
        row({
          changeHref: 'information-additional-information',
          changeHtml: 'Change',
          key: 'Do you want to receive future communications in Welsh?',
          value: data.futureCommunicationsInWelsh === 'Yes' ? 'Yes' : 'No'
        })
      ]
    }
  }
}
