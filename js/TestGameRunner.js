/**
 * Test runner of Game of Life.
 */
class TestGameRunner {
  /**
   * Tests the provided implementation of Game of Life.
   * @param {?Array|undefined} seed is a 2d array of integers.
   *       Where 0 means dead cell, and 1 means live.
   * @param {number} num_of_iterations is an integer, and this will be the number
   *       of times the world moves to the next state.
   * @param {?Array|undefined} expected_state is similar to seed. And this is
   *       the expected state of the world after um_of_iterations state transitions.
   * @return {boolean} True if the expected_state matches the seed after
   *       num_of_iterations state transitions. False otherwise or if the input is not valid.
   */
  test_game(seed, num_of_iterations, expected_state) {
    if (!this._isValidInput(seed, num_of_iterations, expected_state)) {
      console.warn('Invalid input: ', seed, num_of_iterations, expected_state);
      return false;
    }

    const game = this._createGame(seed);
    for (let i = 1; i <= num_of_iterations; i++) {
      game.tick();
    }
    const gameState = this._gameToArray(
        game, expected_state.length, expected_state[0].length);

    return this._equalStates(expected_state, gameState);
  }

  /**
   * Creates an instance of Game from the provided  2D array.
   * @param {!Array<!Array<number>>} seed 2D array consisting of '0' and '1'
   * @return {!Game}
   */
  _createGame(seed) {
    let cells = [];
    for (let i = 0; i < seed.length; i++) {
      for (let j = 0; j < seed[i].length; j++){
          if (seed[i][j] == 1) {
            cells.push(new Cell(i, j));
          }
      }
    }
    return new Game(cells);
  }

  /**
   * Compares provided 2D arrays.
   * @param {!Array<!Array<number>>} expected
   * @param {!Array<!Array<number>>} actual
   * @return {boolean} True if arrays are equal, false otherwise
   */
  _equalStates(expected, actual) {
    for (let i = 0; i < expected.length; i++) {
      for (let j = 0; j < expected[i].length; j++) {
        if (expected[i][j] != actual[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Converts provided Game instance into 2D array consisting of '0' and '1'.
   * @param {!Game} game instance to be converted
   * @param {number} rowsNumber in the result array
   * @param {number} columnsNumber in the result array
   * @return {!Array<!Array<number>>}
   */
  _gameToArray(game, rowsNumber, columnsNumber) {
    const result = [];
    for (let i = 0; i < rowsNumber; i++) {
      let columns = [];
      for (let j = 0; j < columnsNumber; j++) {
        columns.push(0);
      }
      result.push(columns);
    }
    game.cells.forEach((cell) => {
      if (this._isCellInBoundaries(cell, 0, columnsNumber, 0, rowsNumber)) {
        result[cell.x][cell.y] = 1;
      }
    });
    return result;
  };

/**
 * Checks if the provided cell in the given boundaries.
 * @param {!Cell} cell
 * @param {number} minX minimal avollwed value of x coordinate (including)
 * @param {number} maxX maximum avollwed value of x coordinate (excluding)
 * @param {number} minY minimal avollwed value of y coordinate (including)
 * @param {number} maxY maximum avollwed value of y coordinate (excluding)
 * @return {boolean}
 */
  _isCellInBoundaries(cell, minX, maxX, minY, maxY) {
    return cell.x >= minX
        && cell.x < maxX
        && cell.y >= minY
        && cell.y < maxY;
  }

  /**
   * Checks if the provided input of test_game function is valid.
   * @param {?Array|undefined} seed
   * @param {number} num_of_iterations
   * @param {?Array|undefined} expected_state
   * @return {boolean}
   * @private
   */
  _isValidInput(seed, num_of_iterations, expected_state) {
    return this._is2DArray(seed)
        && this._is2DArray(expected_state)
        && this._isSameSizeArrays(seed, expected_state)
        && num_of_iterations >= 0;
  };

  /**
   * Checks if the provided array is a 2-dimensional array object.
   * @param {?Array|undefined} array to be checked
   * @return {boolean}
   * @private
   */
  _is2DArray(array) {
    return array && Array.isArray(array) && array.every((element) => {
      return Array.isArray(element);
    });
  };

  /**
   * Checks if the provided 2D arrays have same size, i.e. have same number of
   * rows and corresponding rows have the same length.
   * @param {!Array} array1
   * @param {!Array} array2
   * @return {boolean}
   * @private
   */
  _isSameSizeArrays(array1, array2) {
    return array1.length == array2.length && array1.every((element, index) => {
        return element.length == array2[index].length;
    });
  };
}
