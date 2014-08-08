pages =
  GoogleSearch: require('./google')

module.exports = (className, browserInstance) ->
  PageClass = pages[className]
  new PageClass(browserInstance)
