describe('CanvasGameRunner', ()=> {
  let runner;
  let gridCanvasElementMock;
  let gameCanvasElementMock;
  let canvasContextMock;
  let gameMock;
  let gameCanvasMock;

  beforeEach(()=> {
    canvasContextMock = jasmine.createSpyObj('ctx',
        ['beginPath', 'moveTo', 'lineTo', 'stroke', 'closePath']);
    gridCanvasElementMock = {
      getContext: jasmine.createSpy('getContext').and.returnValue(canvasContextMock),
    };
    gameCanvasElementMock = {
      getContext: jasmine.createSpy('getContext').and.returnValue(canvasContextMock),
      addEventListener : jasmine.createSpy('addEventListener'),
      getBoundingClientRect: jasmine.createSpy('getBoundingClientRect'),
    };
    gameMock = jasmine.createSpyObj('game', ['tick']);
    gameCanvasMock = jasmine.createSpyObj('gameCanvas', ['displayCells']);

    runner = new CanvasGameRunner(gridCanvasElementMock, gameCanvasElementMock);

    runner._game = gameMock;
    runner._gameCanvas = gameCanvasMock;
  });

  describe('nextGameStep tests', ()=> {
    it('should call tick in game', ()=> {
      runner.nextGameStep();

      expect(gameMock.tick).toHaveBeenCalled();
    });

    it('should call displayCells in gameCanvas', ()=> {
      runner.nextGameStep();

      expect(gameCanvasMock.displayCells).toHaveBeenCalled();
    })
  });

  describe('runGame tests', ()=> {
    beforeEach(()=> {
      spyOn(window, 'clearInterval');
      spyOn(window, 'setInterval');
    });

    it('should call clearInterval', ()=> {
      runner._timer = 'timerId';
      runner.runGame();

      expect(window.clearInterval).toHaveBeenCalled();
    });

    it('should call setInterval', ()=> {
      runner._timer = 'timerId';
      runner.runGame();

      expect(window.clearInterval).toHaveBeenCalled();
      expect(window.setInterval).toHaveBeenCalled();
    });

    it('should set new timerId', ()=> {
      window.setInterval.and.returnValue('newTimerId');
      runner._timer = 'timerId';
      runner.runGame();

      expect(runner._timer).toEqual('newTimerId');
    });
  });

  describe('stopGame tests', ()=> {
    it('should call clearInerval', ()=> {
      spyOn(window, 'clearInterval');

      runner.stopGame();

      expect(window.clearInterval).toHaveBeenCalled();
    });
  });
});
