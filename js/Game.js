/**
 *
 */
class Game {

  constructor(cells) {
    this._cells = cells;
    this._liveCellKeys = new Set();

    this._cells.forEach((cell) => {
      this._liveCellKeys.add(cell.keyString);
    });
  }

  get cells() {
    return this._cells;
  }

  get liveCellCoordinates() {
    return this._liveCellKeys;
  }

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
         (neighbourCount == 2 &&  this._liveCellKeys.has(cellKey))) {
        newCells.push(Cell.fromKeyString(cellKey));
        this._liveCellKeys.add(cellKey);
      } else {
        this._liveCellKeys.delete(cellKey);
      }
    });
    this._cells = newCells;
  }
}
