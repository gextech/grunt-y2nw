class Wall
  constructor: (@bottles) ->

  returned: ->
    @bottles++

  fall: (n) ->
    @bottles -= n

module.exports = Wall
