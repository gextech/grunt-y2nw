Page = require('./page')

class YahooSearch extends Page
  url: 'http://yahoo.com'

  searchFor: (text) ->
    @browser
      .setValue('input[type=text]', text)
      .click('#search-submit')
      .pause(1000)

  hasFound: (val) ->
    @browser.assert.containsText('#main', val)

module.exports = YahooSearch
