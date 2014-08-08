class Page
  constructor: (@browser) ->
    @browser
      .url(@url)
      .waitForElementVisible('body', 1000)

module.exports = Page
