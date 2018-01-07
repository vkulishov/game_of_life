const WIDTH = 400;
const HEIGHT = 400;
const CELL_SIZE = 20;
const GAME_SPEED_MS = 500;

class CanvasGameRunner {
  constructor(gridCanvasElement, gameCanvasElement) {
    this._gridCanvasElement = gridCanvasElement;
    this._gridCanvasElement.width = WIDTH;
    this._gridCanvasElement.height = HEIGHT;
    this._gridCanvasElementContext = this._gridCanvasElement.getContext('2d');

    gameCanvasElement.width = WIDTH;
    gameCanvasElement.height = HEIGHT;

    this._gameCanvas = new Canvas(gameCanvasElement, CELL_SIZE);

    this._game = null;
    this._timer = null;

    this._drawGrid();
  }

  /**
   * Executes one step of a game updating game canvas with the new state.
   */
  nextGameStep() {
    if (!this._game) {
      this._game = new Game(this._gameCanvas.selectedCells);
    }
    this._game.tick();

    this._gameCanvas.updateSelectedCells(this._game.cells);
  }

  /**
   * Runs game calling tick method with predefined interval.
   */
  runGame() {
    clearInterval(this._timer);
    this._timer = setInterval( ()=> this.nextGameStep(), GAME_SPEED_MS);
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


}
