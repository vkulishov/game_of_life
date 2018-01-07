/**
 * Live cell in the Game of life.
 * @param {int} x corrdinate of the cell
 * @param {int} y coordinate of the cell
 */
class Cell {
  constructor (x, y) {
    this._x = x;
    this._y = y;
    this._keyString = Cell.getKeyString(x, y);
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get keyString() {
    return this._keyString;
  }

  /**
   * Creates a key string corresponding to the provided  coordinates.
   * @param {int} x coordinate
   * @param {int} y coordinate
   * @return {string}
   */
  static getKeyString(x, y) {
    return `${x}|${y}`;
  }

/**
 * Creates an instance of Cell object from the provided key string.
 * @param {string} key to be used to extract x and y properties for a new
 *      created Coordinate. It should have format '${x}|${y}', e.g. 1|2
 * @return {!Coordinate}
 * @throws {!Error} if key has invalid format
 */
  static fromKeyString(key) {
    const parts = key.split('|');
    if (parts.length != 2) {
      throw new Error('Invalid key. It should have format \'x|y\'');
    }
    return new Cell(parseInt(parts[0], 10), parseInt(parts[1], 10));
  }

}
