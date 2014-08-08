pages =
  BingSearch: require('./bing')
  YahooSearch: require('./yahoo')
  GoogleSearch: require('./google')

module.exports = (className, browserInstance) ->
  PageClass = pages[className]
  new PageClass(browserInstance)
