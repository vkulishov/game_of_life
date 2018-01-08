describe('Canvas', ()=> {
  let canvasContextMock;
  let canvasElementMock;
  const CANVAS_WIDTH = 100;
  const CANVAS_HEIGHT = 100;

  beforeEach(()=> {
      canvasContextMock = jasmine.createSpyObj('ctx', ['fillRect', 'clearRect']);
      canvasElementMock = {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        getContext: jasmine.createSpy('getContext').and.returnValue(canvasContextMock),
        getBoundingClientRect: jasmine.createSpy('getBoundingClientRect'),
      };
  });

  describe('displayCells tests', ()=> {
    let canvas;

    beforeEach(()=> {
      canvas = new Canvas(canvasElementMock, 1);
    });

    it('should clear canvas', ()=> {
      canvas.displayCells([new Cell(1, 2), new Cell(3, 4)]);

      expect(canvasContextMock.clearRect).toHaveBeenCalledWith(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    });

    it('should draw new cells', ()=> {
      canvas.displayCells([new Cell(2, 3), new Cell(4, 5)]);

      expect(canvasContextMock.fillRect.calls.argsFor(0)).toEqual([2, 3, 1, 1]);
      expect(canvasContextMock.fillRect.calls.argsFor(1)).toEqual([4, 5, 1, 1]);
    });

  });

  describe('getCellCoordinates tests', ()=> {
    let canvas;

    beforeEach(()=> {
      const clientRectMock = {
        left: 5,
        top: 10
      };
      canvasElementMock.getBoundingClientRect.and.returnValue(clientRectMock);
      canvas = new Canvas(canvasElementMock, 50); // Canvas 2x2
    });

    it('should get coordinates of left top cell', ()=> {
      const cellCoordinate = canvas.getCellCoordinates(5, 10);

      expect(cellCoordinate.x).toEqual(0);
      expect(cellCoordinate.y).toEqual(0);
    });

    it('should get coordinates of right top cell', ()=> {
      const cellCoordinate = canvas.getCellCoordinates(CANVAS_WIDTH, 10);

      expect(cellCoordinate.x).toEqual(1);
      expect(cellCoordinate.y).toEqual(0);
    });

    it('should get coordinates of bottom left cell', ()=> {
      const cellCoordinate = canvas.getCellCoordinates(50, CANVAS_HEIGHT);

      expect(cellCoordinate.x).toEqual(0);
      expect(cellCoordinate.y).toEqual(1);
    });

    it('should get coordinates of bottom right cell', ()=> {
      const cellCoordinate = canvas.getCellCoordinates(60, CANVAS_HEIGHT);

      expect(cellCoordinate.x).toEqual(1);
      expect(cellCoordinate.y).toEqual(1);
    });
  });
});
