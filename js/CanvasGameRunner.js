const WIDTH = 400;
const HEIGHT = 400;
const CELL_SIZE = 20;
const GAME_SPEED_MS = 500;

/**
 * Main class for running a Game of life.
 * It provides controls to the user inputs, i.e. start/stop game, add and remove cells.
 */
class CanvasGameRunner {
  constructor(gridCanvasElement, gameCanvasElement) {
    this._gridCanvasElement = gridCanvasElement;
    this._gridCanvasElement.width = WIDTH;
    this._gridCanvasElement.height = HEIGHT;
    this._gridCanvasElementContext = this._gridCanvasElement.getContext('2d');

    this._gameCanvasElement = gameCanvasElement;
    this._gameCanvasElement.width = WIDTH;
    this._gameCanvasElement.height = HEIGHT;

    this._gameCanvas = new Canvas(this._gameCanvasElement, CELL_SIZE);

    this._game = new Game();
    this._timer = null;

    this._gameCanvasElement.addEventListener('click', event => this._gameCanvasClickHandler(event));

    this._drawGrid();
  }

  /**
   * Executes one step of a game updating game canvas with the new state.
   */
  nextGameStep() {
    this._game.tick();
    this._gameCanvas.displayCells(this._game.cells);
  }

  /**
   * Runs game calling tick method with predefined interval.
   */
  runGame() {
    clearInterval(this._timer);
    this._timer = setInterval(()=> this.nextGameStep(), GAME_SPEED_MS);
  }

 /**
  * Stops running game.
  */
  stopGame() {
    clearInterval(this._timer);
  }

  /**
   * Draws grid of fixed size in the provided grid layer element.
   */
  _drawGrid() {
    this._gridCanvasElementContext.beginPath();
    for(let x = 0; x < WIDTH; x += CELL_SIZE) {
      this._gridCanvasElementContext.moveTo(x, 0);
      this._gridCanvasElementContext.lineTo(x, HEIGHT);

    }
    for(let y = 0; y < HEIGHT; y += CELL_SIZE) {
      this._gridCanvasElementContext.moveTo(0, y);
      this._gridCanvasElementContext.lineTo(WIDTH, y);

    }
    this._gridCanvasElementContext.stroke();
    this._gridCanvasElementContext.closePath();
  }

  /**
   * Handles click event for game canvas element.
   * If cell corresponding to the event coordinates already exist, then it
   * should be removed from the game (killed), otherwise a new cell is added into the game.
   * Changes to the game state are refleced in game canvas.
   * @param {!Event} event click event
   */
  _gameCanvasClickHandler(event) {
    const cellCoordinates = this._gameCanvas.getCellCoordinates(event.clientX, event.clientY);
    this._game.toggleCell(cellCoordinates.x, cellCoordinates.y);
    this._gameCanvas.displayCells(this._game.cells);
  }

}
