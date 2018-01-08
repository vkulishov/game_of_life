# Conway's Game of Life

[The Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

### Prerequisites

This is a JS implementation of the Game, based on canvas html element, therefore to run it you need a browser that supports JS and canvas element.

## Running the game

In order to run the game open file 'index.html'. There will be a 20x20 world rendered. Dead cells are in white; alive cells are in black.
Click on a cell to change its state.

'Next' button executes one step of the game.
'Start' button starts infinite run of the game switching it to the next state every 0.5 second.
'Stop' button stops running game.

## Test run of the game

As per requirements a separate function for running tests manually is provided.
Method test_game(seed, num_of_iterations, expected_state) is defined in class TestGameRunner.js
To run the test create instance of the class and call it's method.
Example:
```
  var data = {
    seed: [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    num_of_iterations: 5,
    expected_state: [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ]
  };
  var test = new TestGameRunner();
  test.test_game(data.seed, data.num_of_iterations, data.expected_state);
```
File 'test_index.html' contains a few examples of usage of TestGameRunner.

## Unit tests

This code has been tested with Jasmine 2.
Specs are placed in "test/spec".
To run specs open "test/SpecRunner.html".
