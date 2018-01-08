/**
 * Class provides implementation of Game of life.
 * It keeps current state of the game, that is represented as an array of Cells.
 * Class provides methods to update game state by adding/removing cells and
 * transition to the next state following game rules.
 * @param {!Array<!Cell>|undefined} cells initial state of the game
 */
class Game {
  constructor(cells) {
    this._cells = cells || [];
    this._cellKeys = new Set();

    this._cells.forEach((cell) => {
      this._cellKeys.add(cell.keyString);
    });
  }

  get cells() {
    return this._cells;
  }

  get cellKeys() {
    return this._cellKeys;
  }

  /**
   * Adds/removes a cell to/from the game. If cell already exists in the game,
   * then it is removed, otherwise a new Cell with the provided coordinates is created.
   * @param {number} x coordinate of a cell
   * @param {number} y coordinate of a cell
   */
  toggleCell(x, y) {
    const keyString = Cell.getKeyString(x, y);
    if (this._cellKeys.has(keyString)) {
      this._cellKeys.delete(keyString);
      const cellIndex = this._cells.findIndex((cell) => {
        return cell.keyString === keyString;
      });
      this._cells.splice(cellIndex, 1);
    } else {
      this._cellKeys.add(keyString);
      this._cells.push(Cell.fromKeyString(keyString));
    }
  }

  /**
   * Executes step in game of life transitioning game to the next state.
   * Transition happens by the rules:
   * 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
   * 2. Any live cell with two or three live neighbours lives on to the next generation.
   * 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
   * 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
   */
  tick() {
    const neighbours = new Map();
    for (let cell of this._cells) {
      for (let i = cell.x - 1; i <= cell.x + 1; i++) {
        for (let j = cell.y - 1; j <= cell.y + 1; j++) {
          if (i == cell.x && j == cell.y) {
            continue;
          }
          const cellKey = Cell.getKeyString(i, j);
          const neighbourCount = neighbours.get(cellKey);
          if (neighbourCount) {
            neighbours.set(cellKey, neighbourCount + 1);
          } else {
            neighbours.set(cellKey, 1);
          }
        }
      }
    }

    const newCells = [];
    neighbours.forEach((neighbourCount, cellKey) => {
      if (neighbourCount == 3 ||
         (neighbourCount == 2 &&  this._cellKeys.has(cellKey))) {
        newCells.push(Cell.fromKeyString(cellKey));
        this._cellKeys.add(cellKey);
      } else {
        this._cellKeys.delete(cellKey);
      }
    });
    this._cells = newCells;
  }
}
