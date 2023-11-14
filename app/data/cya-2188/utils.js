const row = ({ changeHref, changeHtml, key, value, valueHtml }) => ({
  key: {
    text: key
  },
  value: {
    [valueHtml ? 'html' : 'text']: valueHtml || value
  },
  actions: !changeHref ? {} : {
    items: [{
      html: changeHtml,
      classes: 'govuk-link--no-visited-state'
    }]
  }
})

module.exports = {
  row
}
