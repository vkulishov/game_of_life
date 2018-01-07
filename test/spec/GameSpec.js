describe('Game', () => {
  describe('Game creation tests', ()=> {
    const cells = [new Cell(0, 0), new Cell(0, 1)];
    let game;
    beforeEach(()=> {
      game = new Game(cells);
    });

    it('should set Game cells', ()=> {
      expect(game.cells).toEqual(cells);
    });

    it('should set liveCellCoordinates', ()=> {
      expect(game.liveCellCoordinates.size).toEqual(2);
      expect(game.liveCellCoordinates).toContain('0|0');
      expect(game.liveCellCoordinates).toContain('0|1');
    });
  });

  describe('tick tests', ()=> {
    describe('tests for rule #1: Any live cell with fewer than two live neighbours dies, as if caused by under-population.', ()=> {
      it('should check that no cell without neighbours survived', ()=> {
        const cells = [new Cell(0, 0), new Cell(0, 3), new Cell(3, 0)];
        const game = new Game(cells);

        game.tick();

        expect(game.cells.length).toEqual(0);
      });

      it('should check that no cells with 1 neighbour survived', ()=> {
        const cells = [new Cell(0, 0), new Cell(0, 1)];
        const game = new Game(cells);

        game.tick();

        expect(game.cells.length).toEqual(0);
      });
    });

    describe('tests for rule #2: Any live cell with two or three live neighbours lives on to the next generation.', ()=> {
      it('should check that cell with 2 live neighbours survived', ()=> {
        const cells = [
          new Cell(0, 0),
          new Cell(1, 1), // Cell has 2 neighbours.
          new Cell(2, 2)];
        const game = new Game(cells);

        game.tick();

        expect(game.liveCellCoordinates).toContain('1|1');
      });

      it('should check that cell with 3 live neighbours survived', ()=> {
        const cells = [
          new Cell(0, 0),
          new Cell(1, 1), // Cell has 3 neighbours.
          new Cell(2, 2),
          new Cell(1, 2)
        ];
        const game = new Game(cells);

        game.tick();

        expect(game.liveCellCoordinates).toContain('1|1');
      });
    });

    describe('tests for rule #3: Any live cell with more than three live neighbours dies, as if by over-population.', ()=> {
      it('should check that cell with 4 live neighbours dies', ()=> {
        const cells = [
          new Cell(0, 1),
          new Cell(1, 0),
          new Cell(1, 1), // Cell has 4 neighbours.
          new Cell(1, 2),
          new Cell(2, 1),
        ];
        const game = new Game(cells);

        game.tick();

        expect(game.liveCellCoordinates).not.toContain('1|1');
      })
    });

    describe('tests for rule #4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', ()=> {
      it('should check that dead cell with 3 live neighbours becomes alive', ()=> {
        const cells = [
          new Cell(0, 0),
          new Cell(1, 0),
          new Cell(0, 1)
        ];
        const game = new Game(cells);

        game.tick();

        expect(game.liveCellCoordinates).toContain('1|1');
      });
    });

  });
});
