class Canvas {
  constructor(canvasElement, cellSize) {
    this._canvasElement = canvasElement;
    this._cellSize = cellSize;
    this._canvasContext = this._canvasElement.getContext('2d');
    this._rowLength = this._canvasElement.width / this._cellSize;
    this._columnLength = this._canvasElement.height / this._cellSize;

    this._selectedCells = [];

    this._canvasRect = this._canvasElement.getBoundingClientRect();
    this._canvasElement.addEventListener('click', event => this._canvasClickHandler(event));
  }

  get selectedCells() {
    return this._selectedCells;
  }

  updateSelectedCells(selectedCells) {
    this._selectedCells.forEach((cell) => {
      this._clearCell(cell.x, cell.y);
    });

    this._selectedCells = selectedCells;
    this._selectedCells.forEach((cell) => {
      this._drawCell(cell.x, cell.y);
    });

  }

  _canvasClickHandler(event) {
    const canvasCoordinate =  {
      x: event.clientX - this._canvasRect.left * (this._canvasElement.width  / this._canvasRect.width),
      y: event.clientY - this._canvasRect.top  * (this._canvasElement.height / this._canvasRect.height)
    };
    this._toggleCell(canvasCoordinate);
  }

  _toggleCell(canvasCoordinate) {
    const x = Math.floor(canvasCoordinate.x / this._rowLength);
    const y = Math.floor(canvasCoordinate.y / this._columnLength);
    const selectedCellIndex = this._selectedCells.findIndex(cell => cell.x === x && cell.y === y);
    if (selectedCellIndex == -1) {
      this._drawCell(x, y);
      this._selectedCells.push(new Cell(x, y));
    } else {
      this._clearCell(x, y);
      this._selectedCells.splice(selectedCellIndex, 1);
    }

  }

  _drawCell(x, y) {
    this._canvasContext.fillRect(x * this._cellSize, y * this._cellSize, this._cellSize, this._cellSize);
  }

  _clearCell(x, y) {
    this._canvasContext.clearRect(x * this._cellSize, y * this._cellSize, this._cellSize, this._cellSize);
  }
}
