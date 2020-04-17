// TODO
describe("map", function () {
  it("should iterate on each element and return a new variable with the element multiply by them self plus 1", function () {
    var array = [2, 4, 6];
    var result = [];

    result = map(array, function (element) {
      return element * element + 1;
    });
    expect(result[0]).toBe(5);
    expect(result[1]).toBe(17);
    expect(result[2]).toBe(37);
  });
  describe("map", function () {
    it("should iterate on each element and return a new variable with all the elements x 3", function () {
      var array = [2, 4, 6];
      var result = [];

      result = map(array, function (element, index) {
        return element * 3;
      });
      expect(result[0]).toBe(6);
      expect(result[1]).toBe(12);
      expect(result[2]).toBe(18);
    });
  });
});
