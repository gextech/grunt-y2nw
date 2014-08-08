$NUM (\d+)

    wall = null
    Wall = require('../../src/wall')

- Given $NUM green bottles are standing on the wall
- Given another subject do the same thing?

    (number_of_bottles) ->
      wall = new Wall number_of_bottles

- when $NUM green bottle accidentally falls

    (number_of_falling_bottles) ->
      wall.fall number_of_falling_bottles

- then there are $NUM green bottles standing on the wall

    (number_of_bottles) ->
      expect(+number_of_bottles).toEqual wall.bottles
