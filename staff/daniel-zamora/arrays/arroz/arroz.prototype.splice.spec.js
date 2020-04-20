describe('Arroz.prototype.splice', function () {
  it('should return a new arroz with number 2', function () {
      var arroy = new Arroz(1, 2, 3, 4, 5, 6);
      var newElements = [];

      newElements = array.splice(1, 1);

      expect(newElements).toEqual([2]);
  });
});