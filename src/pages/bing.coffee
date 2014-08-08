Page = require('./page')

class BingSearch extends Page
  url: 'http://bing.com'

  searchFor: (text) ->
    @browser
      .setValue('input[type=search]', text)
      .click('input[type=submit]')
      .pause(1000)

  hasFound: (val) ->
    @browser.assert.containsText('#b_results', val)

module.exports = BingSearch
