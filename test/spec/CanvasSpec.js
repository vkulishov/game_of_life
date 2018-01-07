describe('Canvas', ()=> {
  let canvasContextMock;
  let canvasElementMock;

  beforeEach(()=> {
      canvasContextMock = jasmine.createSpyObj('ctx', ['fillRect', 'clearRect']);
      canvasElementMock = {
        width: 100,
        height: 100,
        getContext: jasmine.createSpy('getContext').and.returnValue(canvasContextMock),
        getBoundingClientRect: jasmine.createSpy('getBoundingClientRect'),
        addEventListener: jasmine.createSpy('addEventListener'),
      }
  });

  describe('Canvas creation tests', ()=> {
    it('should initialize Canvas properties', ()=> {
      const canvas = new Canvas(canvasElementMock, 20);

      expect(canvas.selectedCells).toBeDefined();
    });
  });

  describe('updateSelectedCells tests', ()=> {
    let canvas;

    beforeEach(()=> {
      canvas = new Canvas(canvasElementMock, 1);
    });

    it('should clear old selected cells', ()=> {
      const oldCells = [new Cell(1, 2), new Cell(3, 4)];
      canvas._selectedCells = oldCells;

      canvas.updateSelectedCells([]);

      expect(canvasContextMock.clearRect.calls.argsFor(0)).toEqual([1, 2, 1, 1]);
      expect(canvasContextMock.clearRect.calls.argsFor(1)).toEqual([3, 4, 1, 1]);
    });

    it('should draw new selected cells', ()=> {
      const oldCells = [new Cell(1, 2), new Cell(3, 4)];
      canvas._selectedCells = oldCells;

      canvas.updateSelectedCells([new Cell(2, 3), new Cell(4, 5)]);

      expect(canvasContextMock.fillRect.calls.argsFor(0)).toEqual([2, 3, 1, 1]);
      expect(canvasContextMock.fillRect.calls.argsFor(1)).toEqual([4, 5, 1, 1]);
    });

    it('should set new selected cells', ()=> {
      const oldCells = [new Cell(1, 2), new Cell(3, 4)];
      canvas._selectedCells = oldCells;

      const newCells = [new Cell(2, 3), new Cell(4, 5)]
      canvas.updateSelectedCells(newCells);

      expect(canvas._selectedCells).toEqual(newCells);
    });

  });
});
