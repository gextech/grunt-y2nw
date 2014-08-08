class Page
  constructor: (@browser) ->
    @browser
      .url(@url)
      .waitForElementVisible('body', 1000)

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
