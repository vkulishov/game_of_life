describe('Cell', () => {
  describe('Cell creation tests', ()=> {
    it('should set coordinates for new cell', ()=> {
      const cell = new Cell(1, 2);

      expect(cell.x).toEqual(1);
      expect(cell.y).toEqual(2);
    });

    it('should set keyString for new cell', ()=> {
      const cell = new Cell(1, 2);

      expect(cell.keyString).toEqual('1|2');
    });
  });

  describe('fromKeyString tests', ()=> {
    it('should create Coordinate from valid key', ()=> {
      const coordinate = Cell.fromKeyString('-1|2');

      expect(coordinate.x).toEqual(-1);
      expect(coordinate.y).toEqual(2);
    });

    it('should throw Error for empty key', ()=> {
      expect(()=> {Cell.fromKeyString('')})
          .toThrowError(Error, 'Invalid key. It should have format \'x|y\'');
    });

    it('should throw Error for invalid key', ()=> {
      expect(()=> {Cell.fromKeyString('12')})
          .toThrowError(Error, 'Invalid key. It should have format \'x|y\'');
    });
  });
});
