const { row } = require('./utils')

module.exports = (data) => {
  return {
    nationality: {
      rows: [
        // Your nationality
        row({
          changeHref: 'nationality-where-you-live',
          changeHtml: 'Change',
          key: 'Your nationality',
          value: data.nationality
        }),
        // Always lived in England...
        row({
          changeHref: 'nationality-where-you-live',
          changeHtml: 'Change',
          key: 'Have you always lived in England, Scotland or Wales?',
          value: data['applicant-always-lived-esw']
        }),
        // Live in UK now (only show if user answered no to always living in UK
        data['applicant-always-lived-esw'] === 'No' &&
        row({
          changeHref: 'nationality-where-you-live',
          changeHtml: 'Change',
          key: 'Do you live in England, Scotland or Wales now?',
          value: data['applicant-live-in-esw']
        }),
        // When did you arrive in UK
        data['applicant-always-lived-esw'] === 'No' &&
        data['applicant-live-in-esw'] === 'Yes' &&
        row({
          changeHref: 'nationality-where-you-live',
          changeHtml: 'Change',
          key: 'Have you been away from England, Scotland or Wales for more than 52 weeks in the 3 years before your claim date?',
          value: data.arrivedIn === 'lessThan3YearsAgo' ? 'Less than 3 years ago' : 'More than 3 years ago'
        }),
        // Been away for more than 52 weeks
        row({
          changeHref: 'nationality-where-you-live',
          changeHtml: 'Change',
          key: 'When did you arrive in England, Scotland or Wales?',
          value: data['applicant-been-away']
        }),
        // Worked abroad
        row({
          changeHref: 'nationality-payments-from-abroad',
          changeHtml: 'Change',
          key: 'Have you or any of your close family worked abroad or been paid benefits from outside the United Kingdom since your claim date?',
          value: data.payFromAbroad
        }),
      ]
    }
  }
}
