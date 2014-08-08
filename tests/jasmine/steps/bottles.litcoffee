$NUM (\d+)

    wall = null
    Wall = require('../helpers/wall')

Given $NUM green bottles are standing on the wall

    (number_of_bottles) ->
      wall = new Wall number_of_bottles

When $NUM green bottle accidentally falls

    (number_of_falling_bottles) ->
      wall.fall number_of_falling_bottles

Then there are $NUM green bottles standing on the wall

    (number_of_bottles) ->
      expect(+number_of_bottles).toEqual wall.bottles
