Page = require('./page')

class GoogleSearch extends Page
  url: 'http://google.com'

  searchFor: (text) ->
    @browser
      .setValue('input[type=text]', text)
      .click('button[name=btnG]')
      .pause(1000)

  hasFound: (val) ->
    @browser.assert.containsText('#ires', val)

module.exports = GoogleSearch
