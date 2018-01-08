/**
 * Canvas for displaying a game state.
 * @param {!Element} canvasElement to be used to dsiplay game
 * @param {number} cellSize size of cell
 */
class Canvas {
  constructor(canvasElement, cellSize) {
    this._canvasElement = canvasElement;
    this._cellSize = cellSize;
    this._canvasContext = this._canvasElement.getContext('2d');

    this._canvasRect = this._canvasElement.getBoundingClientRect();
  }

  /**
   * Gets Cell coordinates corresponding to the provided window coordinates.
   * @param {number} clickX x coordinate of click event
   * @param {number} clickY y coordinate of click event
   * @return {!{x: {number}, y: {number}}} object containing Cell coordinates in the canvas
   */
  getCellCoordinates(clickX, clickY) {
    const canvasX = clickX - this._canvasRect.left;
    const canvasY = clickY - this._canvasRect.top;
    return {
      x: Math.floor(canvasX / this._cellSize),
      y: Math.floor(canvasY / this._cellSize)
    }
  }

  /**
   * Clears previous state of canvas element and draws the provided cells.
   * @param {!Array<Cell>} cells to be displayed
   */
  displayCells(cells) {
    this._canvasContext.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height);
    cells.forEach((cell) => {
      this._drawCell(cell);
    });
  }

  /**
   * Draws a provided cell as a rectangle.
   * @param {!Cell} cell to be drawn
   */
  _drawCell(cell) {
    this._canvasContext.fillRect(
      cell.x * this._cellSize,
      cell.y * this._cellSize,
      this._cellSize,
      this._cellSize);
  }

}
