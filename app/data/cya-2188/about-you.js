const filters = require('../../filters')

const { row } = require('./utils')

module.exports = (data) => {
  return {
    aboutYou: {
      rows: [
        // Claim date
        row({
          changeHref: 'claimdate-1',
          changeHtml: 'Change',
          key: 'Claim date',
          value: filters().getClaimStartDate(data)
        }),
        // Name
        row({
          changeHref: 'name',
          changeHtml: 'Change',
          key: 'Name',
          value: filters().getCarerName(data)
        }),
        // National Insurance Number
        row({
          changeHref: 'national-insurance-number',
          changeHtml: 'Change',
          key: 'National Insurance number',
          value: data.nationalInsuranceNumber
        }),
        // DOB
        row({
          changeHref: 'date-of-birth',
          changeHtml: 'Change',
          key: 'Date of birth',
          value: filters().getCarerDateOfBirth(data)
        }),
        // Address
        row({
          changeHref: 'about-you-address-select',
          changeHtml: 'Change',
          key: 'Address',
          valueHtml: '1 Some Street<br/>Some Road<br/>Some Town<br/>AB1 2BC'
        }),
        // Telephone
        row({
          changeHref: 'about-you-telephone',
          changeHtml: 'Change',
          key: 'Telephone number (optional)',
          value: data.applicantTelephone || 'Not given'
        }),
        // Email confirmation
        row({
          changeHref: 'about-you-email-confirmation',
          changeHtml: 'Change',
          key: 'Do you want an email to confirm we have received your application?',
          value: data.emailConfirmationWanted === 'Yes' ? `Yes - ${data.emailAddress}` : 'No'
        })
      ]
    }
  }
}
