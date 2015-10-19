Page = require('./page')

class YahooSearch extends Page
  url: 'http://yahoo.com'

  search:
    input: 'input[name=p]'
    submit: 'input[type=submit]'
    output: '#main'

module.exports = YahooSearch
